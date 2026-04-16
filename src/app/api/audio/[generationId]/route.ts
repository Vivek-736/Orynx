import { prisma } from "@/lib/db";
import { getSignedAudioUrl } from "@/lib/r2";
import { auth } from "@clerk/nextjs/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ generationId: string }> },
) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { generationId } = await params;

    const generation = await prisma.generation.findUnique({
        where: { id: generationId, orgId },
    });

    if (!generation) {
        return new Response("Not found", { status: 404 });
    }

    if (!generation.r2ObjectKey) {
        return new Response("Audio is not available yet", { status: 409 });
    }

    const signedUrl = await getSignedAudioUrl(generation.r2ObjectKey);
    console.log("Fetching audio from R2:", signedUrl);

    try {
        const audioResponse = await fetch(signedUrl);

        if (!audioResponse.ok) {
            console.error("R2 fetch failed:", audioResponse.status, audioResponse.statusText);
            return new Response("Failed to fetch audio from storage", { status: 502 });
        }

        const audioBuffer = await audioResponse.arrayBuffer();

        return new Response(audioBuffer, {
            headers: {
                "Content-Type": "audio/wav",
                "Content-Length": audioBuffer.byteLength.toString(),
                "Cache-Control": "private, max-age=3600",
            },
        });
    } catch (err) {
        console.error("Audio proxy error:", err);
        return new Response("Failed to stream audio", { status: 500 });
    }
};
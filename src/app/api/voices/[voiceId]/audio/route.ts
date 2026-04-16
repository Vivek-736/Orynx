import { prisma } from "@/lib/db";
import { getSignedAudioUrl } from "@/lib/r2";
import { auth } from "@clerk/nextjs/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ voiceId: string }> },
) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { voiceId } = await params;

    const voice = await prisma.voice.findUnique({
        where: { 
            id: voiceId,
            OR: [
                { variant: "SYSTEM" },
                { variant: "CUSTOM", orgId }
            ]
        },
    });

    if (!voice) {
        return new Response("Not found", { status: 404 });
    }

    if (!voice.r2ObjectKey) {
        return new Response("Voice sample not available", { status: 404 });
    }

    const signedUrl = await getSignedAudioUrl(voice.r2ObjectKey);

    try {
        const audioResponse = await fetch(signedUrl);

        if (!audioResponse.ok) {
            return new Response("Failed to fetch voice sample from storage", { status: 502 });
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
        console.error("Voice sample proxy error:", err);

        return new Response("Failed to stream voice sample", 
            { 
                status: 500 
            }
        );
    }
}
"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { 
    AudioLines, 
    AudioWaveform, 
    Clock, 
    Play, 
    Pause, 
    ChevronRight 
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { VoiceAvatar } from "@/components/voices/voice-avatar";
import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function SettingsPanelHistory() {
    const trpc = useTRPC();
    const { data: generations } = useSuspenseQuery(trpc.generations.getAll.queryOptions());
    const params = useParams();
    const currentGenerationId = params.generationId as string;

    if (generations.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-8">
                <div className="relative flex w-25 items-center justify-center">
                    <div className="absolute left-0 -rotate-30 rounded-full bg-muted p-3">
                        <AudioLines className="size-4 text-muted-foreground" />
                    </div>
                    <div className="relative z-10 rounded-full bg-foreground p-3">
                        <AudioWaveform className="size-4 text-background" />
                    </div>
                    <div className="absolute right-0 rotate-30 rounded-full bg-muted p-3">
                        <Clock className="size-4 text-muted-foreground" />
                    </div>
                </div>

                <p className="font-semibold tracking-tight text-foreground">
                    No generations yet
                </p>
                <p className="max-w-48 text-center text-xs text-muted-foreground">
                    Generate some audio and it will appear here
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-0 flex-1">
            <div className="divide-y">
                {generations.map((gen) => (
                    <HistoryItem 
                        key={gen.id} 
                        generation={gen} 
                        isActive={gen.id === currentGenerationId}
                    />
                ))}
            </div>
        </div>
    );
}

export function HistoryItem({ 
    generation, 
    isActive,
    className
}: { 
    generation: any; 
    isActive?: boolean;
    className?: string;
}) {
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlayPause = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => setIsPlaying(false);

        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);
            audio.removeEventListener("ended", onEnded);
        };
    }, []);

    const audioUrl = `/api/audio/${generation.id}`;

    return (
        <div 
            className={cn(
                "group relative flex items-center gap-3 p-4 transition-colors cursor-pointer hover:bg-muted/50",
                isActive && "bg-muted"
            )}
            onClick={() => router.push(`/text-to-speech/${generation.id}`)}
        >
            <audio ref={audioRef} src={audioUrl} />
            
            <div className="relative shrink-0">
                <VoiceAvatar 
                    seed={generation.voiceId} 
                    name={generation.voiceName} 
                    className="size-10"
                />
                <button
                    onClick={handlePlayPause}
                    className={cn(
                        "absolute inset-0 flex items-center justify-center bg-black/40 rounded-full text-white opacity-0 transition-opacity group-hover:opacity-100",
                        isPlaying && "opacity-100"
                    )}
                >
                    {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
                </button>
            </div>

            <div className="min-w-0 flex-1 flex flex-col gap-0.5">
                <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-foreground">
                        {generation.voiceName}
                    </p>
                    <span className="shrink-0 text-[10px] text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(generation.createdAt), { addSuffix: true })}
                    </span>
                </div>
                <p className="truncate text-xs text-muted-foreground line-clamp-1">
                    {generation.text}
                </p>
            </div>

            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="size-4 text-muted-foreground" />
            </div>
        </div>
    );
}
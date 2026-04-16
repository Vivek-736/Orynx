"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { useAudio } from "@/contexts/audio-context";
import { useWaveSurfer } from "@/hooks/use-wavesurfer";
import { Button } from "@/components/ui/button";
import { 
    Undo, 
    Redo, 
    Pause, 
    Play, 
    ChevronRight, 
    AudioLines, 
    AudioWaveform, 
    Clock 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VoiceAvatar } from "../voice-avatar";

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
    const { playingId, play, pause } = useAudio();
    
    const isPlayingThis = playingId === generation.id;
    const audioUrl = `/api/audio/${generation.id}`;

    const {
        containerRef,
        isPlaying: wsPlaying,
        isReady,
        togglePlayPause,
        seekBackward,
        seekForward,
    } = useWaveSurfer({
        url: isPlayingThis ? audioUrl : undefined,
        autoplay: true,
    });

    const handlePlayPause = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPlayingThis) {
            togglePlayPause();
        } else {
            play(generation.id);
        }
    };

    return (
        <div 
            className={cn(
                "group relative flex flex-col gap-0 p-4 transition-colors cursor-pointer hover:bg-muted/50",
                isActive && "bg-muted",
                isPlayingThis && "bg-muted/30",
                className
            )}
            onClick={() => router.push(`/text-to-speech/${generation.id}`)}
        >
            <div className="flex items-center gap-3">
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
                            isPlayingThis && wsPlaying && "opacity-100"
                        )}
                    >
                        {isPlayingThis && wsPlaying ? (
                            <Pause className="size-4 fill-current" />
                        ) : (
                            <Play className="size-4 fill-current" />
                        )}
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

            {isPlayingThis && (
                <div 
                    className="mt-3 flex flex-col gap-2 rounded-lg bg-background/50 p-2 border animate-in fade-in slide-in-from-top-1" 
                    onClick={(e) => e.stopPropagation()}
                >
                    <div 
                        ref={containerRef} 
                        className="w-full h-8 cursor-pointer"
                    />
                    
                    <div className="flex items-center justify-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={(e) => { e.stopPropagation(); seekBackward(5); }}
                            disabled={!isReady}
                        >
                            <Undo className="size-3" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
                            className="rounded-full"
                        >
                            {wsPlaying ? (
                                <Pause className="size-3 fill-current" />
                            ) : (
                                <Play className="size-3 fill-current" />
                            )}
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={(e) => { e.stopPropagation(); seekForward(5); }}
                            disabled={!isReady}
                        >
                            <Redo className="size-3" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
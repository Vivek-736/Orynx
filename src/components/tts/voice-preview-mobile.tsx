"use client";

import { useEffect } from "react";
import { Pause, Play, Download, Undo, Redo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceAvatar } from "@/components/voice-avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAudio } from "@/contexts/audio-context";
import { useWaveSurfer } from "@/hooks/use-wavesurfer";

type VoicePreviewMobileVoice = {
    id?: string;
    name: string;
};

export function VoicePreviewMobile({
    audioUrl,
    voice,
    text,
}: {
    audioUrl: string;
    voice: VoicePreviewMobileVoice | null;
    text: string;
}) {
    const isMobile = useIsMobile();
    const { playingId, play, pause } = useAudio();
    
    const PREVIEW_ID = "main-preview-mobile";

    const {
        containerRef,
        isPlaying: wsPlaying,
        isReady,
        togglePlayPause,
        seekBackward,
        seekForward,
    } = useWaveSurfer({
        url: audioUrl,
        autoplay: false,
    });

    useEffect(() => {
        if (playingId !== PREVIEW_ID && wsPlaying) {
            togglePlayPause();
        }
    }, [playingId, wsPlaying, togglePlayPause]);

    const handlePlayPause = () => {
        if (wsPlaying) {
            pause();
        } else {
            play(PREVIEW_ID);
        }
        togglePlayPause();
    };

    const handleDownload = () => {
        const safeName =
            text
                .slice(0, 50)
                .trim()
                .replace(/[^a-zA-Z0-9]+/g, "-")
                .replace(/^-|-$/g, "")
                .toLowerCase() || "speech";

        const link = document.createElement("a");
        link.href = audioUrl;
        link.download = `${safeName}.wav`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!audioUrl || !isMobile) return null;

    return (
        <div className="border-t lg:hidden p-4 bg-muted/20">
            <div className="mb-4">
                <div ref={containerRef} className="w-full h-8 cursor-pointer" />
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{text}</p>
                    {voice?.name && (
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <VoiceAvatar
                                seed={voice.id ?? voice.name}
                                name={voice.name}
                                className="shrink-0"
                            />
                            <span className="truncate">{voice.name}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => seekBackward(5)} disabled={!isReady}>
                        <Undo className="size-4" />
                    </Button>
                    
                    <Button
                        variant="default"
                        size="icon"
                        className="rounded-full shrink-0"
                        onClick={handlePlayPause}
                    >
                        {wsPlaying ? (
                            <Pause className="fill-background" />
                        ) : (
                            <Play className="fill-background" />
                        )}
                    </Button>

                    <Button variant="ghost" size="icon-sm" onClick={() => seekForward(5)} disabled={!isReady}>
                        <Redo className="size-4" />
                    </Button>

                    <Button variant="ghost" size="icon-sm" onClick={handleDownload}>
                        <Download className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
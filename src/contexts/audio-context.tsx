"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface AudioContextType {
    playingId: string | null;
    play: (id: string) => void;
    pause: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [playingId, setPlayingId] = useState<string | null>(null);

    const play = useCallback((id: string) => {
        setPlayingId(id);
    }, []);

    const pause = useCallback(() => {
        setPlayingId(null);
    }, []);

    return (
        <AudioContext.Provider value={{ playingId, play, pause }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);

    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }

    return context;
}
"use client";

import { useStore } from "@tanstack/react-form";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { ttsFormOptions } from "./text-to-speech-form";
import { useTTSVoices } from "@/contexts/tts-voices-context";
import { VoicePreviewPanel } from "./voice-preview-panel";
import { VoicePreviewPlaceholder } from "./voice-preview-placeholder";

export function VoicePreviewManager() {
    const form = useTypedAppFormContext(ttsFormOptions);
    const voiceId = useStore(form.store, (s) => s.values.voiceId);
    const isSubmitting = useStore(form.store, (s) => s.isSubmitting);
    const { allVoices } = useTTSVoices();

    const selectedVoice = allVoices.find((v) => v.id === voiceId);

    if (!selectedVoice || isSubmitting) {
        return <VoicePreviewPlaceholder isSubmitting={isSubmitting} />;
    }

    return (
        <VoicePreviewPanel
            key={selectedVoice.id}
            audioUrl={`/api/voices/${selectedVoice.id}/audio`}
            voice={selectedVoice}
            text={`Sample audio for ${selectedVoice.name}`}
        />
    );
}
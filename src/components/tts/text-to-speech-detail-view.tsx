"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQueries } from "@tanstack/react-query";
import { TextInputPanel } from "@/components/tts/text-input-panel";
import { SettingsPanel } from "@/components/tts/settings-panel";
import {
    TextToSpeechForm,
    type TTSFormValues
} from "@/components/tts/text-to-speech-form";
import { TTSVoicesProvider } from "@/contexts/tts-voices-context";
import { VoicePreviewMobile } from "@/components/tts/voice-preview-mobile";
import { AudioProvider } from "@/contexts/audio-context";
import { VoicePreviewPanel } from "@/components/tts/voice-preview-panel";

export function TextToSpeechDetailView({
    generationId,
}: {
    generationId: string;
}) {
    const trpc = useTRPC();
    const [
        generationQuery,
        voicesQuery,
    ] = useSuspenseQueries({
        queries: [
            trpc.generations.getById.queryOptions({ id: generationId }),
            trpc.voices.getAll.queryOptions()
        ],
    });
    const data = generationQuery.data;
    const { custom: customVoices, system: systemVoices } = voicesQuery.data;
    const allVoices = [...customVoices, ...systemVoices];
    const fallbackVoiceId = allVoices[0]?.id ?? "";

    const resolvedVoiceId =
        data?.voiceId &&
            allVoices.some((v) => v.id === data.voiceId)
            ? data.voiceId
            : fallbackVoiceId;

    const defaultValues: TTSFormValues = {
        text: data.text,
        voiceId: resolvedVoiceId,
        temperature: data.temperature,
        topP: data.topP,
        topK: data.topK,
        repetitionPenalty: data.repetitionPenalty,
    };

    const generationVoice = {
        id: data.voiceId ?? undefined,
        name: data.voiceName,
    };

    return (
        <AudioProvider>
            <TTSVoicesProvider
                value={{ customVoices, systemVoices, allVoices }}
            >
                <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
                    <div className="flex min-h-0 flex-1 overflow-hidden">
                        <div className="flex min-h-0 flex-1 flex-col">
                            <TextInputPanel />
                            <VoicePreviewMobile
                                audioUrl={data.audioUrl}
                                voice={generationVoice}
                                text={data.text}
                            />
                            <VoicePreviewPanel
                                audioUrl={data.audioUrl}
                                voice={generationVoice}
                                text={data.text}
                            />
                        </div>
                        <SettingsPanel />
                    </div>
                </TextToSpeechForm>
            </TTSVoicesProvider>
        </AudioProvider>
    );
};
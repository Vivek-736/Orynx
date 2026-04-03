"use client";

import { SettingsPanel } from "./settings-panel";
import { defaultTTSValues, TextToSpeechForm } from "./text-to-speech-form";
import { VoicePreviewPlaceholder } from "./voice-preview-placeholder";
import { TextInputPanel } from "./text-input-panel";

export function TextToSpeechView() {
    return (
        <TextToSpeechForm defaultValues={defaultTTSValues}>
            <div className="flex min-h-0 flex-1 overflow-hidden">
                <div className="flex min-h-0 flex-1 flex-col">
                    <TextInputPanel />
                    <VoicePreviewPlaceholder />
                </div>
                <SettingsPanel />
            </div>
        </TextToSpeechForm>
    );
};
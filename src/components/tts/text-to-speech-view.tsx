import { SettingsPanel } from "./settings-panel";
import { VoicePreviewPlaceholder } from "./voice-preview-placeholder";
import { TextInputPanel } from "./text-input-panel";

export function TextToSpeechView() {
    return (
        <div className="flex min-h-0 flex-1 overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col">
                <TextInputPanel />
                <VoicePreviewPlaceholder />
            </div>
            <SettingsPanel />
        </div>
    )
}
import Link from "next/link";
import { 
    Volume2,
    BookOpen, 
    AudioLines, 
    Sparkles,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VoicePreviewPlaceholder({ isSubmitting }: { isSubmitting?: boolean }) {
    return (
        <div className="hidden flex-1 lg:flex h-full flex-col items-center justify-center gap-8 border-t bg-muted/5">
            <div className="flex flex-col items-center gap-4">
                <div className="relative flex w-32 items-center justify-center">
                    <div className={cn(
                        "absolute left-0 -rotate-12 rounded-full bg-muted/20 p-4 transition-all duration-700",
                        isSubmitting ? "opacity-20 scale-90 blur-sm" : "opacity-100"
                    )}>
                        <Volume2 className="size-5 text-muted-foreground/50" />
                    </div>

                    <div className={cn(
                        "absolute right-0 rotate-12 rounded-full bg-muted/20 p-4 transition-all duration-700",
                        isSubmitting ? "opacity-20 scale-90 blur-sm" : "opacity-100"
                    )}>
                        <AudioLines className="size-5 text-muted-foreground/50" />
                    </div>

                    <div className={cn(
                        "relative z-10 flex size-16 items-center justify-center rounded-full bg-foreground shadow-2xl transition-all duration-500",
                        isSubmitting && "animate-pulse scale-110 bg-primary"
                    )}>
                        {isSubmitting ? (
                            <Loader2 className="size-7 animate-spin text-primary-foreground" />
                        ) : (
                            <Sparkles className="size-7 text-background" />
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1.5 text-center">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                        {isSubmitting ? "Generating magic..." : "Ready to speak"}
                    </h3>
                    <p className="max-w-64 text-sm text-muted-foreground/80 leading-relaxed">
                        {isSubmitting 
                            ? "Your high-quality audio is being crafted right now. This usually takes just a few seconds."
                            : "Select a voice and enter your text above. Your generated audio will appear here instantly."}
                    </p>
                </div>
            </div>

            {!isSubmitting && (
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground" asChild>
                    <Link href="mailto:vivekvrc777@gmail.com">
                        <BookOpen className="size-4" />
                        Explore use cases
                    </Link>
                </Button>
            )}
        </div>
    );
};
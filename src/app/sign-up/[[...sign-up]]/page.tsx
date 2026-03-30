import { SignUp } from "@clerk/nextjs";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function SignUpPage() {
    return (
        <AuthLayout>
            <SignUp
                appearance={{
                    elements: {
                        rootBox: "mx-auto w-full",
                        card: "shadow-none border-none bg-transparent dark:bg-transparent",
                        headerTitle: "text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100",
                        headerSubtitle: "text-zinc-500 dark:text-zinc-400",
                        socialButtonsBlockButton: "rounded-lg border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-none",
                        formButtonPrimary: "bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:opacity-90 transition-none rounded-lg font-medium",
                        formFieldInput: "rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:border-zinc-900 dark:focus:border-zinc-100 ring-0",
                        footerActionLink: "text-zinc-900 dark:text-zinc-100 hover:underline font-medium transition-none",
                        dividerLine: "bg-zinc-100 dark:bg-zinc-900",
                        dividerText: "text-zinc-400 dark:text-zinc-500 text-[10px] uppercase tracking-widest",
                        identityPreviewText: "text-zinc-500 dark:text-zinc-400",
                        identityPreviewEditButtonIcon: "text-zinc-900 dark:text-zinc-100",
                    },
                }}
            />
        </AuthLayout>
    );
}
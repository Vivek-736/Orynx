import { OrganizationList } from "@clerk/nextjs";
import { AuthLayout } from "@/components/auth/AuthLayout";

const OrgSelectionPage = () => {
    return (
        <AuthLayout>
            <OrganizationList
                hidePersonal
                afterCreateOrganizationUrl="/"
                afterSelectOrganizationUrl="/"
                appearance={{
                    elements: {
                        rootBox: "mx-auto w-full",
                        card: "shadow-none border-none bg-transparent dark:bg-transparent",
                        organizationListHeaderTitle: "text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100",
                        organizationListHeaderSubtitle: "text-zinc-500 dark:text-zinc-400",
                        organizationPreviewTextContainer: "text-zinc-900 dark:text-zinc-100",
                        organizationPreviewSecondaryText: "text-zinc-500 dark:text-zinc-400",
                        organizationSwitcherTrigger: "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-none rounded-lg",
                        organizationListCreateOrganizationButton: "text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-none rounded-lg",
                        formButtonPrimary: "bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:opacity-90 transition-none rounded-lg font-medium",
                        formFieldInput: "rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:border-zinc-900 dark:focus:border-zinc-100 ring-0",
                    },
                }}
            />
        </AuthLayout>
    );
};

export default OrgSelectionPage;

import { PageHeader } from "../page-header";
import { DashboardHeader } from "./dashboard-header";
import { QuickActionsPanel } from "./quick-actions-panel";
import { TextInputPanel } from "./text-input-panel";

export default function DashboardView() {
    return (
        <div className="relative">
            <PageHeader
                title="Dashboard"
                className="lg:hidden"
            />
            <div className="relative space-y-8 p-4 lg:p-16">
                <DashboardHeader />
                <TextInputPanel />
                <QuickActionsPanel />
            </div>
        </div>
    )
}
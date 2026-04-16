"use client";

import { History } from "lucide-react";
import { 
    Drawer, 
    DrawerContent, 
    DrawerHeader, 
    DrawerTitle, 
    DrawerTrigger 
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SettingsPanelHistory } from "./settings-panel-history";

export function MobileHistoryDrawer() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 rounded-lg lg:hidden bg-white shadow-xs">
                    <History className="size-4" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="lg:hidden">
                <DrawerHeader>
                    <DrawerTitle>Generation History</DrawerTitle>
                </DrawerHeader>
                <div className="overflow-y-auto max-h-[60vh] pb-8">
                    <SettingsPanelHistory />
                </div>
            </DrawerContent>
        </Drawer>
    );
};
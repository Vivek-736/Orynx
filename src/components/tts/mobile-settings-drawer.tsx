"use client";

import { History, Settings2 } from "lucide-react";
import { 
    Drawer, 
    DrawerContent, 
    DrawerHeader, 
    DrawerTitle, 
    DrawerTrigger 
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs";
import { SettingsPanelHistory } from "./settings-panel-history";
import { SettingsPanelSettings } from "./settings-panel-settings";

export function MobileSettingsDrawer() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 rounded-lg lg:hidden bg-white shadow-xs">
                    <History className="size-4" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="lg:hidden h-[85vh]">
                <DrawerHeader className="border-b">
                    <DrawerTitle>Voice Menu</DrawerTitle>
                </DrawerHeader>
                <Tabs defaultValue="history" className="flex flex-1 flex-col overflow-hidden">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-12 p-0">
                        <TabsTrigger 
                            value="history" 
                            className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent shadow-none"
                        >
                            <History className="size-4 mr-2" />
                            History
                        </TabsTrigger>
                        <TabsTrigger 
                            value="settings" 
                            className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent shadow-none"
                        >
                            <Settings2 className="size-4 mr-2" />
                            Controls
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="history" className="flex-1 overflow-y-auto mt-0">
                        <SettingsPanelHistory />
                    </TabsContent>
                    <TabsContent value="settings" className="flex-1 overflow-y-auto mt-0">
                        <SettingsPanelSettings />
                    </TabsContent>
                </Tabs>
            </DrawerContent>
        </Drawer>
    );
};
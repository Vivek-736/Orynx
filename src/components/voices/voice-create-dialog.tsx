"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { VoiceCreateForm } from "@/components/voices/voice-create-form";
import { Button } from "@/components/ui/button";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

interface VoiceCreateDialogProps {
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function VoiceCreateDialog({
    children,
    open,
    onOpenChange,
}: VoiceCreateDialogProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Create custom voice</DrawerTitle>
                        <DrawerDescription>
                            Upload or record an audio sample to add a new voice to your
                            library.
                        </DrawerDescription>
                    </DrawerHeader>

                    <VoiceCreateForm
                        scrollable
                        footer={(submit: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) => (
                            <DrawerFooter>
                                {submit}
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        )}
                    />
                </DrawerContent>
            </Drawer>
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {children && <DialogTrigger asChild>{children}</DialogTrigger>}
            <DialogContent className="flex max-h-[90vh] flex-col gap-0 p-0 sm:max-w-xl">
                <DialogHeader className="p-6 pb-4 text-left">
                    <DialogTitle>Create custom voice</DialogTitle>
                    <DialogDescription>
                        Upload or record an audio sample to add a new voice to your library.
                    </DialogDescription>
                </DialogHeader>
                
                <VoiceCreateForm 
                    scrollable 
                    footer={(submit) => (
                        <div className="flex justify-end border-t p-6 pt-4">
                            {submit}
                        </div>
                    )}
                />
            </DialogContent>
        </Dialog>
    );
};
"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { HistoryItem } from "./settings-panel-history";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentHistoryList() {
    const trpc = useTRPC();
    const { data: generations, isLoading } = useQuery(trpc.generations.getAll.queryOptions());

    if (isLoading) {
        return (
            <div className="flex flex-col gap-2 pt-2">
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
            </div>
        );
    }

    if (!generations || generations.length === 0) return null;

    const recent = generations.slice(0, 2);

    return (
        <div className="flex flex-col min-h-0 pt-2">
            <div className="flex flex-col gap-2">
                {recent.map((gen) => (
                    <HistoryItem 
                        key={gen.id} 
                        generation={gen} 
                        className="rounded-xl border bg-white p-3 shadow-none hover:bg-muted/50"
                    />
                ))}
            </div>
        </div>
    );
};
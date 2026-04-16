import type { SearchParams } from "nuqs/server";
import type { Metadata } from "next";
import { VoicesView } from "@/components/voices/voices-view";
import { prefetch, trpc, HydrateClient } from "@/trpc/server";
import { voicesSearchParamsCache } from "@/lib/params";

export const metadata: Metadata = { title: "Voices" };

export default async function VoicesPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { query } = await voicesSearchParamsCache.parse(searchParams);

    prefetch(trpc.voices.getAll.queryOptions({ query }));

    return (
        <HydrateClient>
            <VoicesView />
        </HydrateClient>
    );
};
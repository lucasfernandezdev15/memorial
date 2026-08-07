import { MemorialPage } from "@/components/MemorialPage";
import { memorialConfig } from "@/data/config";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ live?: string }>;
}) {
  const params = await searchParams;
  const autoOpenLive = params.live === "1" || params.live === "true";

  return <MemorialPage config={memorialConfig} autoOpenLive={autoOpenLive} />;
}

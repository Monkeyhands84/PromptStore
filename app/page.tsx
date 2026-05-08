import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/components/marketing/hero";
import { MockUI } from "@/components/marketing/mock-ui";
import { Features } from "@/components/marketing/features";
import { FinalCta } from "@/components/marketing/final-cta";
import { MarketingFooter } from "@/components/marketing/footer";

async function findFeaturedPublicSlug(): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("prompts")
    .select("slug")
    .eq("public", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data?.slug ?? null;
}

export default async function HomePage() {
  const featuredSlug = await findFeaturedPublicSlug();

  return (
    <div className="screen-enter">
      <Hero featuredSlug={featuredSlug} />
      <MockUI />
      <Features />
      <FinalCta />
      <MarketingFooter />
    </div>
  );
}

import { listMyPrompts } from "@/lib/db/prompts";
import { DashboardList } from "@/components/dashboard-list";

export default async function DashboardPage() {
  const prompts = await listMyPrompts();
  return <DashboardList initialPrompts={prompts} />;
}

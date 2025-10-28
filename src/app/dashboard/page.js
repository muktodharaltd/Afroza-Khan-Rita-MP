import { redirect } from "next/navigation";

export default function DashboardHome() {
  // Default redirect to Dashboard/Overview
  redirect("/dashboard/dashboard/overview");
}

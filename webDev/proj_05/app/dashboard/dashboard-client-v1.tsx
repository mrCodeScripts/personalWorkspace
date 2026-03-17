"use client";

import { DataTable } from "@/components/data-table";
import TableData from "@/app/dashboard/data.json";

export default function DashboardClientV1() {
  return (
    <>
      <DataTable data={TableData} />
      <h1>This is the dashboard.</h1>
    </>
  );
}

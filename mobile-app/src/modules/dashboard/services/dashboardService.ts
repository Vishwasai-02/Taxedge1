import { SERVICE_CATALOGUE } from "../../../data/catalogue";
import type { Deadline, ServiceTile } from "../types/dashboard.types";

export const dashboardService = {
  getServiceCatalogue: () => SERVICE_CATALOGUE,
  getUpcomingDeadlines: (): Deadline[] => [
    {
      id: "gstr3b",
      tag: "GST",
      tint: "#0F766E",
      tintBg: "#E6F5F2",
      title: "GSTR-3B Filing Due",
      date: "20 Sep 2026",
      urgent: true,
      route: "/service/gst-filing" as any,
    },
    {
      id: "itr1",
      tag: "ITR",
      tint: "#2563EB",
      tintBg: "#EAF1FE",
      title: "ITR-1 Filing Deadline",
      date: "31 Oct 2026",
      urgent: false,
      route: "/service/itr-filing" as any,
    },
    {
      id: "emi",
      tag: "Loan",
      tint: "#EA580C",
      tintBg: "#FEF0E6",
      title: "EMI Due - Business Loan",
      date: "05 Sep 2026",
      urgent: false,
      route: "/service/business-loan" as any,
    },
  ],
};

export default dashboardService;

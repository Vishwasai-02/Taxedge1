import { BrandColors } from "../../../shared/theme";
import { ItrServiceItem } from "../types/itr.types";

export const ITR_SERVICES: ItrServiceItem[] = [
  {
    id: "itr-filing",
    title: "ITR Filing",
    description: "File your income tax return with expert help",
    iconName: "clipboard",
    iconColor: BrandColors.PRIMARY_BLUE,
    iconBg: BrandColors.PRIMARY_LIGHT_BLUE,
    route: "/service/itr-filing",
  },
  {
    id: "tds-refund",
    title: "TDS Refund",
    description: "Claim your TDS refund and file TDS returns efficiently",
    iconName: "calculator",
    iconColor: BrandColors.PRIMARY_ORANGE,
    iconBg: BrandColors.PRIMARY_LIGHT_ORANGE,
    route: "/service/tds-refund",
  },
  {
    id: "previous-year-itr",
    title: "Previous Year ITR",
    description: "File pending ITRs for previous years",
    iconName: "calendar",
    iconColor: BrandColors.PRIMARY_BLUE,
    iconBg: BrandColors.PRIMARY_LIGHT_BLUE,
    route: "/service/previous-year-itr",
  },
  {
    id: "revised-itr",
    title: "Revised ITR",
    description: "Revise your already filed return",
    iconName: "create",
    iconColor: BrandColors.PRIMARY_ORANGE,
    iconBg: BrandColors.PRIMARY_LIGHT_ORANGE,
    route: "/service/revised-itr",
  },
  {
    id: "tax-notice-assistance",
    title: "Tax Notice Assistance",
    description: "Get expert help with income tax notices",
    iconName: "warning",
    iconColor: BrandColors.PRIMARY_BLUE,
    iconBg: BrandColors.PRIMARY_LIGHT_BLUE,
    route: "/service/tax-notice-assistance",
  },
];

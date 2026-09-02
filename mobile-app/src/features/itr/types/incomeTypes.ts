export type IncomeTypeKey =
  | "salaried"
  | "business"
  | "professional"
  | "freelancer"
  | "trader"
  | "rental"
  | "capital-gains"
  | "multiple";

export interface IncomeTypeOption {
  id: IncomeTypeKey;
  title: string;
  subtitle: string;
  badge: string;
  formIncomeTypeValue: string;
}

export const INCOME_TYPES: IncomeTypeOption[] = [
  {
    id: "salaried",
    title: "Salaried",
    subtitle: "Form 16 available",
    badge: "ITR-1",
    formIncomeTypeValue: "Salary",
  },
  {
    id: "business",
    title: "Business Income",
    subtitle: "Proprietor / Business",
    badge: "ITR-3/4",
    formIncomeTypeValue: "Business / Profession",
  },
  {
    id: "professional",
    title: "Professional",
    subtitle: "Doctor, Lawyer, CA etc.",
    badge: "ITR-3",
    formIncomeTypeValue: "Business / Profession",
  },
  {
    id: "freelancer",
    title: "Freelancer",
    subtitle: "Independent Contractor",
    badge: "ITR-3/4",
    formIncomeTypeValue: "Business / Profession",
  },
  {
    id: "trader",
    title: "Trader / Investor",
    subtitle: "Stock & F&O Trading",
    badge: "ITR-3",
    formIncomeTypeValue: "Capital Gains",
  },
  {
    id: "rental",
    title: "Rental Income",
    subtitle: "House / Property Income",
    badge: "ITR-1/2",
    formIncomeTypeValue: "Other Sources",
  },
  {
    id: "capital-gains",
    title: "Capital Gains",
    subtitle: "Sale of Shares / Property",
    badge: "ITR-2",
    formIncomeTypeValue: "Capital Gains",
  },
  {
    id: "multiple",
    title: "Multiple Sources",
    subtitle: "Combination of above",
    badge: "ITR-3",
    formIncomeTypeValue: "Other Sources",
  },
];

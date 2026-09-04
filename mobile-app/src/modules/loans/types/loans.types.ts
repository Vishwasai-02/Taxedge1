import { ServiceCardData } from '../../../shared/components/ServiceCard';

export interface LoanServiceItem extends ServiceCardData {}

export interface LoanApplicationDraft {
  loanType: string;
  amount: number;
  tenureMonths: number;
  annualIncome: number;
  employmentType: string;
}

import { ILoansRepository, loansRepository } from "../repository/LoansRepository";
import { LoanServiceItem } from "../types/loans.types";

export class LoansService {
  constructor(private readonly repository: ILoansRepository = loansRepository) {}

  async fetchLoanServices(): Promise<LoanServiceItem[]> {
    return this.repository.getLoanServices();
  }
}

export const loansService = new LoansService();

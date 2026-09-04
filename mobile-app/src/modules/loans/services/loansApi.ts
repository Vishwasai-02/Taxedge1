import { apiClient } from '../../../core/api/apiClient';
import type { LoanApplicationDraft } from '../types/loans.types';

export const loansApi = {
  applyLoan: async (draft: Partial<LoanApplicationDraft>) => {
    return apiClient.post<{ applicationId: string; status: string }>('/loans/apply', draft);
  },
  fetchStatus: async (applicationId: string) => {
    return apiClient.get<{ status: string; timeline: any[] }>('/loans/status/' + applicationId);
  },
};

export default loansApi;

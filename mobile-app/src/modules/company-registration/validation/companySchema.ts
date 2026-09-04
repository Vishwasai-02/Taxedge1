import type { CompanyDetails } from '../types/company.types';

export const companySchema = {
  validateDetails(details: Partial<CompanyDetails>): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    if (!details.proposedName1?.trim()) errors.proposedName1 = 'Name 1 is required';
    if (!details.registeredState?.trim()) errors.registeredState = 'State is required';
    return { valid: Object.keys(errors).length === 0, errors };
  },
};

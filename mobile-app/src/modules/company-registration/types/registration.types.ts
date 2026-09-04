import type { CompanyDetails } from './company.types';
import type { DirectorInfo, PartnerInfo } from './director.types';
import type { ApplicationDocument } from '../../../shared/types/domain';

export interface CompanyRegistrationDraft {
  company: CompanyDetails;
  directors: DirectorInfo[];
  partners: PartnerInfo[];
  documents: ApplicationDocument[];
  currentStep: number;
  totalFee: number;
  paymentStatus: 'Pending' | 'Paid';
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved';
}

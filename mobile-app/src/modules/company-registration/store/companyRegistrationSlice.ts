import { create } from 'zustand';
import type { CompanyRegistrationDraft } from '../types/registration.types';
import type { CompanyType } from '../types/company.types';
import type { DirectorInfo, PartnerInfo } from '../types/director.types';

interface CompanyRegistrationState {
  draft: CompanyRegistrationDraft;
  setCompanyType: (type: CompanyType) => void;
  updateCompanyDetails: (details: Partial<CompanyRegistrationDraft['company']>) => void;
  addDirector: (director: DirectorInfo) => void;
  removeDirector: (id: string) => void;
  addPartner: (partner: PartnerInfo) => void;
  removePartner: (id: string) => void;
  setStep: (step: number) => void;
  resetRegistration: () => void;
}

const initialDraft: CompanyRegistrationDraft = {
  company: {
    proposedName1: '',
    proposedName2: '',
    companyType: 'Private Limited',
    industryCategory: '',
    businessActivityDescription: '',
    authorizedCapital: 100000,
    paidUpCapital: 100000,
    registeredState: '',
    registeredCity: '',
    registeredPincode: '',
    registeredAddressLine: '',
  },
  directors: [],
  partners: [],
  documents: [],
  currentStep: 0,
  totalFee: 4999,
  paymentStatus: 'Pending',
  status: 'Draft',
};

export const useCompanyRegistrationStore = create<CompanyRegistrationState>((set) => ({
  draft: initialDraft,
  setCompanyType: (type) =>
    set((state) => ({
      draft: {
        ...state.draft,
        company: { ...state.draft.company, companyType: type },
      },
    })),
  updateCompanyDetails: (details) =>
    set((state) => ({
      draft: {
        ...state.draft,
        company: { ...state.draft.company, ...details },
      },
    })),
  addDirector: (director) =>
    set((state) => ({
      draft: {
        ...state.draft,
        directors: [...state.draft.directors, director],
      },
    })),
  removeDirector: (id) =>
    set((state) => ({
      draft: {
        ...state.draft,
        directors: state.draft.directors.filter((d: DirectorInfo) => d.id !== id),
      },
    })),
  addPartner: (partner) =>
    set((state) => ({
      draft: {
        ...state.draft,
        partners: [...state.draft.partners, partner],
      },
    })),
  removePartner: (id) =>
    set((state) => ({
      draft: {
        ...state.draft,
        partners: state.draft.partners.filter((p: PartnerInfo) => p.id !== id),
      },
    })),
  setStep: (currentStep) =>
    set((state) => ({
      draft: { ...state.draft, currentStep },
    })),
  resetRegistration: () => set({ draft: initialDraft }),
}));

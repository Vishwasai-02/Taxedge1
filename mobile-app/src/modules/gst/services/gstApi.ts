import { apiClient } from "../../../core/api/apiClient";
import type { GstRegistrationDraft, GstFilingDraft } from "../types/gstTypes";

export const gstApi = {
  submitRegistration: async (draft: Partial<GstRegistrationDraft>) => {
    return apiClient.post<{ applicationId: string; status: string }>("/gst/registration", draft);
  },
  submitFiling: async (draft: Partial<GstFilingDraft>) => {
    return apiClient.post<{ filingId: string; status: string }>("/gst/filing", draft);
  },
  fetchStatus: async (applicationId: string) => {
    return apiClient.get<{ status: string; timeline: any[] }>(`/gst/status/${applicationId}`);
  },
};

export default gstApi;

import { apiClient } from '../../../core/api/apiClient';
import type { ApplicationItem } from '../types/application.types';

export const applicationService = {
  getApplications: async (): Promise<ApplicationItem[]> => {
    try {
      return await apiClient.get<ApplicationItem[]>('/applications');
    } catch {
      return [];
    }
  },
  getApplicationById: async (id: string): Promise<ApplicationItem | null> => {
    try {
      return await apiClient.get<ApplicationItem>('/applications/' + id);
    } catch {
      return null;
    }
  },
};
export default applicationService;

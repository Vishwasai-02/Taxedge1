import { apiClient } from '../../../core/api/apiClient';
import type { AppNotification } from '../types/notification.types';

export const notificationService = {
  getNotifications: async (): Promise<AppNotification[]> => {
    try {
      return await apiClient.get<AppNotification[]>('/notifications');
    } catch {
      return [];
    }
  },
};
export default notificationService;

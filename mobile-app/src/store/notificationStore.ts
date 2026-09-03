import { create } from "zustand";

import { mockNotifications } from "../data/notifications";
import type { AppNotification, NotificationType } from "../types/domain";

export interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (
    title: string,
    body: string,
    type: NotificationType,
  ) => void;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.read).length,
  addNotification: (title, body, type) =>
    set((state) => {
      const newNotif: AppNotification = {
        id: Math.random().toString(),
        title,
        body,
        type,
        read: false,
        timestamp: "Just now",
      };
      const newNotifs = [newNotif, ...state.notifications];
      return {
        notifications: newNotifs,
        unreadCount: newNotifs.filter((n) => !n.read).length,
      };
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  markAsRead: (id) =>
    set((state) => {
      const newNotifs = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      );
      return {
        notifications: newNotifs,
        unreadCount: newNotifs.filter((n) => !n.read).length,
      };
    }),
}));

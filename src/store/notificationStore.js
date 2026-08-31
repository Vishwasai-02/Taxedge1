import { create } from "zustand";
import { mockNotifications } from "../data/notifications";

export const useNotificationStore = create((set) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.read).length,
  addNotification: (title, body, type) =>
    set((state) => {
      const newNotif = {
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

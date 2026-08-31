import { create } from "zustand";
import { mockApplications } from "../data/applications";

export const useApplicationStore = create((set) => ({
  applications: mockApplications,
  selectedApplicationId: null,
  setSelectedApplicationId: (id) => set({ selectedApplicationId: id }),
  createApplication: (
    serviceId,
    serviceName,
    category,
    formData,
    requiredDocs,
    paymentAmount,
  ) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const prefix = category.substring(0, 4).toUpperCase();
    const appId = `${prefix}-2026-${randomNum}`;

    const newApp = {
      id: appId,
      serviceId,
      serviceName,
      category,
      status: "Verification",
      progress: 20,
      assignedExecutive: ["Rahul", "Sneha", "Vikram", "Karan"][
        Math.floor(Math.random() * 4)
      ],
      paymentAmount,
      paymentStatus: paymentAmount > 0 ? "Pending" : "Paid",
      createdAt: new Date().toISOString().split("T")[0],
      formData,
      documents: requiredDocs.map((doc) => ({ name: doc, status: "Pending" })),
      timeline: [
        {
          title: "Application Submitted",
          description: "Application filed online",
          status: "completed",
          date: "Today",
        },
        {
          title: "Document Collection",
          description: "Checking uploaded and pending files",
          status: "current",
          date: "Today",
        },
        {
          title: "Verification",
          description: "Verification by executive",
          status: "pending",
        },
        {
          title: "Completed",
          description: "Filing/Approval confirmation",
          status: "pending",
        },
      ],
      chatHistory: [
        {
          id: "1",
          sender: "staff",
          text: `Hello! I have been assigned as your service representative. Let me know if you have any questions about this request.`,
          timestamp: "Just now",
        },
      ],
    };

    set((state) => ({
      applications: [newApp, ...state.applications],
    }));

    return appId;
  },
  uploadDocument: (appId, docName, fileUri) =>
    set((state) => {
      return {
        applications: state.applications.map((app) => {
          if (app.id !== appId) return app;
          const newDocs = app.documents.map((doc) =>
            doc.name === docName
              ? { ...doc, status: "Uploaded", fileUri }
              : doc,
          );
          const uploadedCount = newDocs.filter(
            (d) => d.status === "Uploaded",
          ).length;
          const totalDocs = newDocs.length;
          const progress = Math.min(
            95,
            Math.round(20 + (uploadedCount / totalDocs) * 50),
          );
          return {
            ...app,
            documents: newDocs,
            progress,
            status:
              uploadedCount === totalDocs
                ? "Verification"
                : "Document Collection",
          };
        }),
      };
    }),
  addChatMessage: (appId, sender, text) => {
    const messageId = Math.random().toString();
    const newMessage = {
      id: messageId,
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    set((state) => ({
      applications: state.applications.map((app) => {
        if (app.id !== appId) return app;
        return {
          ...app,
          chatHistory: [...app.chatHistory, newMessage],
        };
      }),
    }));

    // If sent by user, simulate automated executive response after 1.5s
    if (sender === "user") {
      setTimeout(() => {
        const staffMessage = {
          id: Math.random().toString(),
          sender: "staff",
          text: "Thank you for your message. I am looking into your application. I will review and update your document status shortly.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        set((state) => ({
          applications: state.applications.map((app) => {
            if (app.id !== appId) return app;
            return {
              ...app,
              chatHistory: [...app.chatHistory, staffMessage],
            };
          }),
        }));
      }, 1500);
    }
  },
  payApplication: (appId) =>
    set((state) => ({
      applications: state.applications.map((app) => {
        if (app.id !== appId) return app;
        const newTimeline = app.timeline.map((step) =>
          step.title === "Verification"
            ? { ...step, status: "completed" }
            : step,
        );

        return {
          ...app,
          paymentStatus: "Paid",
          progress: Math.min(100, app.progress + 15),
          timeline: newTimeline,
        };
      }),
    })),
}));

export const Routes = {
  // Root & Auth
  INDEX: "/",
  AUTH: {
    LOGIN: "/(auth)/login",
    REGISTER: "/(auth)/createprofile",
    OTP: "/(auth)/otp",
    PASSCODE: "/(auth)/passcode",
  },
  // Main Tabs
  MAIN: {
    HOME: "/(main)/home",
    APPLICATIONS: "/(main)/applications",
    DOCUMENTS: "/(main)/documents",
    PAYMENTS: "/(main)/payments",
    PROFILE: "/(main)/profile",
    GST: "/(main)/gst",
  },
  // Services
  SERVICES: {
    GST: "/service/gst",
    GST_REGISTRATION: "/service/gst-registration",
    GST_FILING: "/service/gst-filing",
    GST_COMPLIANCE: "/service/gst-compliance",
    GST_AMENDMENT: "/service/gst-amendment",
    GST_CANCELLATION: "/service/gst-cancellation",
    GST_CERTIFICATE: "/service/gst-certificate",
    ITR: "/service/itr",
    ITR_FILING: "/service/itr-filing",
    ITR_INCOME_INFO: "/service/itr-income-info",
    ITR_DEDUCTIONS: "/service/itr-deductions",
    ITR_DOCUMENTS: "/service/itr-documents",
    ITR_REVIEW: "/service/itr-review",
    ITR_FILED: "/service/itr-filed",
    ITR_SUCCESS: "/service/itr-success",
    TDS_REFUND: "/service/tds-refund",
    PREVIOUS_YEAR_ITR: "/service/previous-year-itr",
    REVISED_ITR: "/service/revised-itr",
    TAX_NOTICE: "/service/tax-notice-assistance",
    LOANS: "/service/loans",
    COMPANY_REGISTRATION: "/service/company-registration",
    INSURANCE: "/service/insurance",
    DYNAMIC_SERVICE: (id: string) => `/service/${id}`,
  },
  // Details & Modals
  APPLICATION_DETAILS: (id: string) => `/application/${id}`,
  PAYMENT_DETAILS: (id: string) => `/payment/${id}`,
  NOTIFICATIONS: "/notifications",
  CHAT: {
    SUPPORT: "/chat/support",
    THREAD: (id: string) => `/chat/${id}`,
  },
} as const;

export default Routes;

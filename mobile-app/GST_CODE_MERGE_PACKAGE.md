# 📦 GST Services, Registration & Filing - Code Merge Package

This document contains the complete directory map, file paths, and instructions for all files modified and newly created for:
1. **GST Services Landing Screen**
2. **GST Registration (5-step interactive wizard)**
3. **GST Filing (Complete filing, payment & receipt flow)**
4. **Shared Utilities & Validators**

---

## 🗂️ Complete Directory Map of Changed/Created Files

```
Taxedge/mobile-app/src/
├── app/
│   └── service/
│       ├── gst-registration.tsx        [NEW]
│       └── gst-filing.tsx              [NEW]
├── shared/
│   └── components/
│       ├── ServiceHeader.tsx           [MODIFIED]
│       └── ServiceCard.tsx             [MODIFIED]
└── features/
    └── gst/
        ├── mock/
        │   └── gstServices.ts          [MODIFIED]
        ├── screens/
        │   ├── GstScreen.tsx           [MODIFIED]
        │   ├── GstRegistrationScreen.tsx [NEW]
        │   └── GstFilingScreen.tsx     [NEW]
        ├── utils/
        │   └── gstValidators.ts        [NEW]
        └── components/
            ├── GstStepIndicator.tsx    [NEW]
            ├── GstPersonalStep.tsx     [NEW]
            ├── GstBusinessStep.tsx     [NEW]
            ├── GstDocumentChecklistStep.tsx [NEW]
            ├── GstDocumentUploadStep.tsx    [NEW]
            ├── GstReviewStep.tsx       [NEW]
            ├── GstApplicationStatusStep.tsx [NEW]
            ├── filing/
            │   ├── GstFilingPeriodStep.tsx    [NEW]
            │   ├── GstFilingDocumentsStep.tsx [NEW]
            │   └── GstFilingReviewStep.tsx    [NEW]
            └── payment/
                ├── GstPaymentMethodStep.tsx   [NEW]
                ├── GstPaymentSuccessStep.tsx  [NEW]
                └── GstPaymentReceiptStep.tsx  [NEW]
```

---

## 📋 Full File List with Absolute Paths

### 1. Routes (Expo Router)
1. `Taxedge/mobile-app/src/app/service/gst-registration.tsx` (NEW)
2. `Taxedge/mobile-app/src/app/service/gst-filing.tsx` (NEW)

### 2. Shared Components
3. `Taxedge/mobile-app/src/shared/components/ServiceHeader.tsx` (MODIFIED)
4. `Taxedge/mobile-app/src/shared/components/ServiceCard.tsx` (MODIFIED)

### 3. GST Feature Core
5. `Taxedge/mobile-app/src/features/gst/mock/gstServices.ts` (MODIFIED)
6. `Taxedge/mobile-app/src/features/gst/screens/GstScreen.tsx` (MODIFIED)
7. `Taxedge/mobile-app/src/features/gst/utils/gstValidators.ts` (NEW)

### 4. GST Registration Wizard
8. `Taxedge/mobile-app/src/features/gst/screens/GstRegistrationScreen.tsx` (NEW)
9. `Taxedge/mobile-app/src/features/gst/components/GstStepIndicator.tsx` (NEW)
10. `Taxedge/mobile-app/src/features/gst/components/GstPersonalStep.tsx` (NEW)
11. `Taxedge/mobile-app/src/features/gst/components/GstBusinessStep.tsx` (NEW)
12. `Taxedge/mobile-app/src/features/gst/components/GstDocumentChecklistStep.tsx` (NEW)
13. `Taxedge/mobile-app/src/features/gst/components/GstDocumentUploadStep.tsx` (NEW)
14. `Taxedge/mobile-app/src/features/gst/components/GstReviewStep.tsx` (NEW)
15. `Taxedge/mobile-app/src/features/gst/components/GstApplicationStatusStep.tsx` (NEW)

### 5. GST Filing & Payment Workflow
16. `Taxedge/mobile-app/src/features/gst/screens/GstFilingScreen.tsx` (NEW)
17. `Taxedge/mobile-app/src/features/gst/components/filing/GstFilingPeriodStep.tsx` (NEW)
18. `Taxedge/mobile-app/src/features/gst/components/filing/GstFilingDocumentsStep.tsx` (NEW)
19. `Taxedge/mobile-app/src/features/gst/components/filing/GstFilingReviewStep.tsx` (NEW)
20. `Taxedge/mobile-app/src/features/gst/components/payment/GstPaymentMethodStep.tsx` (NEW)
21. `Taxedge/mobile-app/src/features/gst/components/payment/GstPaymentSuccessStep.tsx` (NEW)
22. `Taxedge/mobile-app/src/features/gst/components/payment/GstPaymentReceiptStep.tsx` (NEW)

---

## 🎯 Architecture & Standard Compliance
- **Advanced Modular Monolith**: All features are encapsulated inside `src/features/gst/`.
- **Line Limit**: Every single file is strictly $\le 300$ lines.
- **Type Safety**: 100% strict TypeScript verified (`npx tsc --noEmit` exited with 0 errors).
- **Responsive Layout**: `flexGrow: 1` applied across scroll content to prevent blank space.

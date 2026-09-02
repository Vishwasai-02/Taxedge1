import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrandColors, Shadows } from "../../../shared/theme";
import { useApplicationStore } from "../../../store/applicationStore";
import { useNotificationStore } from "../../../store/notificationStore";
import {
  PersonalDetailsData,
  IncomeDetailsData,
  DeductionsData,
  WorkflowDocumentItem,
} from "../types/workflowTypes";
import { sharedDocumentRepository } from "../services/SharedDocumentRepository";
import { ItrTypeSelectionView } from "../components/ItrTypeSelectionView";
import { IncomeTypeOption, INCOME_TYPES } from "../types/incomeTypes";
import { WorkflowHeader } from "../components/workflow/WorkflowHeader";
import { PersonalDetailsSection } from "../components/workflow/PersonalDetailsSection";
import { IncomeDetailsSection } from "../components/workflow/IncomeDetailsSection";
import { DeductionsSection } from "../components/workflow/DeductionsSection";
import { DocumentProgress } from "../components/workflow/DocumentProgress";
import { DocumentCard } from "../components/workflow/DocumentCard";
import { IndividualUploadView } from "../components/workflow/IndividualUploadView";
import { MissingDocumentsView } from "../components/workflow/MissingDocumentsView";
import { ReviewDetailsView } from "../components/workflow/ReviewDetailsView";
import { PaymentView } from "../components/workflow/PaymentView";
import { ServiceStatusView } from "../components/workflow/ServiceStatusView";
import {
  FormValidationErrors,
  validatePanNumber,
  validateAadhaarNumber,
  validateAssessmentYear,
  validateGrossSalary,
  validateMandatoryNumericField,
  validateSection80C,
} from "../utils/validation";

interface UniversalServiceWorkflowScreenProps {
  serviceId: string;
  serviceName: string;
}

type WorkflowStep = 1 | 2 | 3 | 4 | "missing_docs" | 5 | 6 | 7;

export const UniversalServiceWorkflowScreen: React.FC<UniversalServiceWorkflowScreenProps> = ({
  serviceId,
  serviceName,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const formScrollViewRef = useRef<ScrollView>(null);

  const createApplication = useApplicationStore((state) => state.createApplication);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const applications = useApplicationStore((state) => state.applications);

  // Workflow Step State (1 to 7)
  const [step, setStep] = useState<WorkflowStep>(1);

  // Step 1: Selected Income Type
  const [selectedIncome, setSelectedIncome] = useState<IncomeTypeOption>(INCOME_TYPES[0]);

  // Step 2: Form Data (All start EMPTY for a new application - NO pre-filled sample values)
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsData>({
    panNumber: "",
    aadhaarNumber: "",
    assessmentYear: "",
  });

  const [incomeDetails, setIncomeDetails] = useState<IncomeDetailsData>({
    grossSalary: "",
    businessIncome: "",
    rentalIncome: "",
    stcg: "",
    ltcg: "",
    otherIncome: "",
  });

  const [deductions, setDeductions] = useState<DeductionsData>({
    sec80c: "",
    sec80d: "",
    homeLoan24b: "",
    educationLoan80e: "",
    otherDeductions: "",
  });

  const [formErrors, setFormErrors] = useState<FormValidationErrors>({});

  // Step 3 & 4: Documents (Synchronized with shared repository - starts as 0/10 Not Uploaded for new application)
  const [documents, setDocuments] = useState<WorkflowDocumentItem[]>(() =>
    sharedDocumentRepository.getDocuments()
  );
  const [targetUploadDoc, setTargetUploadDoc] = useState<WorkflowDocumentItem | null>(null);

  // Synchronize whenever external store applications change
  useEffect(() => {
    setDocuments(sharedDocumentRepository.getDocuments());
  }, [applications]);

  // Step 6 & 7: Generated Application ID
  const [generatedAppId, setGeneratedAppId] = useState<string>("ITR-2026-00001");

  const completedDocs = sharedDocumentRepository.getCompletedDocuments(documents);
  const missingDocs = sharedDocumentRepository.getMissingDocuments(documents);
  const completedCount = completedDocs.length;
  const totalCount = documents.length;
  const isAllUploaded = sharedDocumentRepository.isAllDocumentsUploaded(documents);

  const validateForm = (): boolean => {
    const errors: FormValidationErrors = {};

    // 1. Personal Details
    const panErr = validatePanNumber(personalDetails.panNumber);
    if (panErr) errors.panNumber = panErr;

    const aadhaarErr = validateAadhaarNumber(personalDetails.aadhaarNumber);
    if (aadhaarErr) errors.aadhaarNumber = aadhaarErr;

    const ayErr = validateAssessmentYear(personalDetails.assessmentYear);
    if (ayErr) errors.assessmentYear = ayErr;

    // 2. Income Details
    const salaryErr = validateGrossSalary(incomeDetails.grossSalary);
    if (salaryErr) errors.grossSalary = salaryErr;

    const bizErr = validateMandatoryNumericField(
      incomeDetails.businessIncome,
      "Business / Professional Income"
    );
    if (bizErr) errors.businessIncome = bizErr;

    const rentalErr = validateMandatoryNumericField(
      incomeDetails.rentalIncome,
      "Rental Income"
    );
    if (rentalErr) errors.rentalIncome = rentalErr;

    const stcgErr = validateMandatoryNumericField(
      incomeDetails.stcg,
      "Short-term Capital Gains"
    );
    if (stcgErr) errors.stcg = stcgErr;

    const ltcgErr = validateMandatoryNumericField(
      incomeDetails.ltcg,
      "Long-term Capital Gains"
    );
    if (ltcgErr) errors.ltcg = ltcgErr;

    const otherErr = validateMandatoryNumericField(
      incomeDetails.otherIncome,
      "Other Income"
    );
    if (otherErr) errors.otherIncome = otherErr;

    // 3. Deductions
    const sec80cErr = validateSection80C(deductions.sec80c);
    if (sec80cErr) errors.sec80c = sec80cErr;

    const sec80dErr = validateMandatoryNumericField(
      deductions.sec80d,
      "Section 80D Deductions"
    );
    if (sec80dErr) errors.sec80d = sec80dErr;

    const homeLoanErr = validateMandatoryNumericField(
      deductions.homeLoan24b,
      "Home Loan Interest"
    );
    if (homeLoanErr) errors.homeLoan24b = homeLoanErr;

    const eduLoanErr = validateMandatoryNumericField(
      deductions.educationLoan80e,
      "Education Loan Interest"
    );
    if (eduLoanErr) errors.educationLoan80e = eduLoanErr;

    const otherDedErr = validateMandatoryNumericField(
      deductions.otherDeductions,
      "Other Deductions"
    );
    if (otherDedErr) errors.otherDeductions = otherDedErr;

    setFormErrors(errors);

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors && formScrollViewRef.current) {
      formScrollViewRef.current.scrollTo({ y: 0, animated: true });
    }

    return !hasErrors;
  };

  const handleIncomeFormContinue = () => {
    if (validateForm()) {
      setStep(3);
    }
  };

  const handleDocumentCardPress = (doc: WorkflowDocumentItem) => {
    setTargetUploadDoc(doc);
    setStep(4);
  };

  const handleUploadSuccess = (
    docName: string,
    uri: string,
    fileName: string,
    fileSize: string
  ) => {
    sharedDocumentRepository.syncUploadDocument(
      generatedAppId,
      docName,
      uri,
      fileName,
      fileSize
    );
    const updatedDocs = sharedDocumentRepository.getDocuments();
    setDocuments(updatedDocs);
    setStep(3);
  };

  const handleChecklistContinue = () => {
    const freshDocs = sharedDocumentRepository.getDocuments();
    setDocuments(freshDocs);
    const isReady = sharedDocumentRepository.isAllDocumentsUploaded(freshDocs);
    if (isReady) {
      setStep(5);
    } else {
      setStep("missing_docs");
    }
  };

  const handlePaymentSuccess = () => {
    const servicePrefix =
      serviceId === "tds-refund"
        ? "TDS"
        : serviceId === "previous-year-itr"
        ? "PREV"
        : serviceId === "revised-itr"
        ? "REV"
        : serviceId === "tax-notice-assistance"
        ? "NOT"
        : "ITR";

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newAppId = `${servicePrefix}-2026-${randomSuffix}`;
    setGeneratedAppId(newAppId);

    createApplication(
      serviceId,
      serviceName,
      "ITR",
      {
        incomeType: selectedIncome.title,
        pan: personalDetails.panNumber,
        aadhaar: personalDetails.aadhaarNumber,
        assessmentYear: personalDetails.assessmentYear,
        salary: incomeDetails.grossSalary,
        deductions80c: deductions.sec80c,
      },
      documents.map((d) => d.name),
      3540
    );

    addNotification(
      `${serviceName} Application Received`,
      `Your request for ${serviceName} (${newAppId}) has been registered and assigned to a Chartered Accountant.`,
      "itr"
    );

    setStep(7);
  };

  const handleBack = () => {
    if (step === 7) {
      router.push("/(main)/home");
    } else if (step === "missing_docs") {
      setStep(3);
    } else if (step === 4) {
      setStep(3);
    } else if (step > 1) {
      setStep((prev) => (Number(prev) - 1) as WorkflowStep);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.root}>
      {/* SCREEN 1: Service Selection */}
      {step === 1 && (
        <View style={styles.root}>
          <WorkflowHeader title={serviceName} onBack={handleBack} />
          <ItrTypeSelectionView
            serviceTitle={serviceName}
            serviceDescription="We'll recommend the right ITR form for you."
            buttonText="Start Application"
            onContinue={(opt) => {
              setSelectedIncome(opt);
              setStep(2);
            }}
          />
        </View>
      )}

      {/* SCREEN 2: Income Information Form (Empty fields for new application, all fields mandatory) */}
      {step === 2 && (
        <View style={styles.root}>
          <WorkflowHeader
            title={serviceName}
            subtitle="Income Information"
            onBack={handleBack}
          />
          <ScrollView
            ref={formScrollViewRef}
            contentContainerStyle={[styles.scrollBody, { paddingBottom: insets.bottom + 95 }]}
            showsVerticalScrollIndicator={false}
          >
            <PersonalDetailsSection
              data={personalDetails}
              errors={formErrors}
              onChange={(updated) => {
                setPersonalDetails((prev) => ({ ...prev, ...updated }));
                setFormErrors((prev) => ({ ...prev, ...Object.keys(updated).reduce((acc, k) => ({ ...acc, [k]: undefined }), {}) }));
              }}
            />

            <IncomeDetailsSection
              data={incomeDetails}
              errors={formErrors}
              onChange={(updated) => {
                setIncomeDetails((prev) => ({ ...prev, ...updated }));
                setFormErrors((prev) => ({ ...prev, ...Object.keys(updated).reduce((acc, k) => ({ ...acc, [k]: undefined }), {}) }));
              }}
            />

            <DeductionsSection
              data={deductions}
              errors={formErrors}
              onChange={(updated) => {
                setDeductions((prev) => ({ ...prev, ...updated }));
                setFormErrors((prev) => ({ ...prev, ...Object.keys(updated).reduce((acc, k) => ({ ...acc, [k]: undefined }), {}) }));
              }}
            />
          </ScrollView>

          {/* Sticky Bottom Continue Button */}
          <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 14) }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleIncomeFormContinue}
              style={styles.primaryBtn}
            >
              <Text style={styles.primaryBtnText}>Continue to Documents →</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* SCREEN 3: ITR Documents (Checklist - Starts 0/10 Not Uploaded for new application) */}
      {step === 3 && (
        <View style={styles.root}>
          <WorkflowHeader
            title={`${serviceName} Documents`}
            onBack={handleBack}
          />
          <ScrollView
            contentContainerStyle={[styles.scrollBody, { paddingBottom: insets.bottom + 95 }]}
            showsVerticalScrollIndicator={false}
          >
            <DocumentProgress
              completedCount={completedCount}
              totalCount={totalCount}
            />

            <View style={styles.cardList}>
              {documents.map((item) => (
                <DocumentCard
                  key={item.id}
                  item={item}
                  onPress={handleDocumentCardPress}
                />
              ))}
            </View>
          </ScrollView>

          {/* Sticky Bottom Action Button */}
          <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 14) }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleChecklistContinue}
              style={styles.primaryBtn}
            >
              <Text style={styles.primaryBtnText}>Continue to Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* SCREEN 4: Individual Upload Screen */}
      {step === 4 && (
        <IndividualUploadView
          serviceName={serviceName}
          targetDoc={targetUploadDoc}
          uploadedDocuments={completedDocs}
          onUploadSuccess={handleUploadSuccess}
          onBack={() => setStep(3)}
          onContinueToReview={handleChecklistContinue}
        />
      )}

      {/* MISSING DOCUMENTS REVIEW SCREEN */}
      {step === "missing_docs" && (
        <View style={styles.root}>
          <WorkflowHeader
            title="Upload Incomplete"
            subtitle={serviceName}
            onBack={handleBack}
          />
          <MissingDocumentsView
            missingDocuments={missingDocs}
            uploadedDocuments={completedDocs}
            onUploadDoc={(doc) => {
              setTargetUploadDoc(doc);
              setStep(4);
            }}
            onCompletePending={() => {
              setTargetUploadDoc(missingDocs[0] || null);
              setStep(4);
            }}
          />
        </View>
      )}

      {/* SCREEN 5: Review Details */}
      {step === 5 && (
        <View style={styles.root}>
          <WorkflowHeader
            title={`${serviceName} Review`}
            onBack={handleBack}
          />
          <ReviewDetailsView
            personalDetails={personalDetails}
            incomeDetails={incomeDetails}
            deductions={deductions}
            documents={completedDocs}
            onApproveAndProceed={() => setStep(6)}
          />
        </View>
      )}

      {/* SCREEN 6: Payment */}
      {step === 6 && (
        <View style={styles.root}>
          <WorkflowHeader
            title={`${serviceName} Payment`}
            onBack={handleBack}
          />
          <PaymentView
            serviceName={serviceName}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </View>
      )}

      {/* SCREEN 7: Service Status */}
      {step === 7 && (
        <View style={styles.root}>
          <WorkflowHeader
            title={`${serviceName} Status`}
            onBack={() => router.push("/(main)/home")}
          />
          <ServiceStatusView
            appId={generatedAppId}
            serviceName={serviceName}
            onReturnHome={() => router.push("/(main)/home")}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BrandColors.BACKGROUND,
  },
  scrollBody: {
    padding: 16,
  },
  cardList: {
    gap: 2,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: BrandColors.BORDER,
    paddingHorizontal: 16,
    paddingTop: 12,
    ...Shadows.md,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.sm,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
    letterSpacing: 0.2,
  },
});

import { useApplicationStore } from "../../../store/applicationStore";
import { DocumentStatus } from "../../../types/domain";
import {
  WORKFLOW_STANDARD_DOCUMENTS,
  WorkflowDocumentItem,
  DocumentWorkflowStatus,
} from "../types/workflowTypes";

class SharedDocumentRepository {
  private vaultMap: Map<string, WorkflowDocumentItem> = new Map();

  constructor() {
    // Pre-populate with standard initial documents
    WORKFLOW_STANDARD_DOCUMENTS.forEach((doc) => {
      this.vaultMap.set(doc.name.toLowerCase().trim(), { ...doc });
    });
  }

  /**
   * Normalizes document status into one of:
   * "Verified" | "Uploaded" | "Under Review" | "Not Uploaded" | "Rejected"
   */
  normalizeStatus(status?: string): DocumentWorkflowStatus {
    if (!status) return "Not Uploaded";
    const s = status.trim().toLowerCase();
    if (s === "approved" || s === "verified") return "Verified";
    if (s === "uploaded") return "Uploaded";
    if (s === "under review" || s === "under_review") return "Under Review";
    if (s === "rejected") return "Rejected";
    if (s === "not uploaded" || s === "pending" || s === "pending upload") return "Not Uploaded";
    return "Not Uploaded";
  }

  isDocumentCompleted(status?: string): boolean {
    const norm = this.normalizeStatus(status);
    return norm === "Uploaded" || norm === "Under Review" || norm === "Verified";
  }

  /**
   * Reads documents for an application and synchronizes with global repository and Zustand store.
   */
  getDocuments(appId?: string): WorkflowDocumentItem[] {
    const applications = useApplicationStore.getState().applications;
    const currentApp = appId ? applications.find((a) => a.id === appId) : undefined;

    // Scan all applications in Zustand store to pull any external uploads
    applications.forEach((app) => {
      app.documents.forEach((doc) => {
        const key = doc.name.toLowerCase().trim();
        const norm = this.normalizeStatus(doc.status);
        if (this.isDocumentCompleted(norm)) {
          const existing = this.vaultMap.get(key);
          this.vaultMap.set(key, {
            id: existing?.id || key,
            name: doc.name,
            status: norm,
            iconType: existing?.iconType || "pan",
            fileUri: doc.fileUri || existing?.fileUri,
            fileName: (doc as any).fileName || existing?.fileName || `${doc.name.replace(/\s+/g, "_")}.pdf`,
            fileSize: (doc as any).fileSize || existing?.fileSize || "2.1 MB",
            uploadedAt: (doc as any).uploadedAt || existing?.uploadedAt || new Date().toISOString(),
          });
        }
      });
    });

    return WORKFLOW_STANDARD_DOCUMENTS.map((stdDoc) => {
      const key = stdDoc.name.toLowerCase().trim();
      const currentDoc = currentApp?.documents.find(
        (d) => d.name.toLowerCase().trim() === key
      );
      const vaultDoc = this.vaultMap.get(key);

      const status = this.normalizeStatus(
        vaultDoc?.status || currentDoc?.status || stdDoc.status
      );

      return {
        ...stdDoc,
        status,
        fileUri: vaultDoc?.fileUri || currentDoc?.fileUri || stdDoc.fileUri,
        fileName:
          vaultDoc?.fileName ||
          (currentDoc as any)?.fileName ||
          stdDoc.fileName ||
          `${stdDoc.name.replace(/\s+/g, "_")}.pdf`,
        fileSize:
          vaultDoc?.fileSize ||
          (currentDoc as any)?.fileSize ||
          stdDoc.fileSize ||
          "1.8 MB",
        uploadedAt: vaultDoc?.uploadedAt || (currentDoc as any)?.uploadedAt,
      };
    });
  }

  /**
   * Uploads and synchronizes a document across the application, in-memory vault, and Zustand store.
   */
  syncUploadDocument(
    appId: string,
    docName: string,
    fileUri: string,
    fileName?: string,
    fileSize: string = "2.1 MB"
  ) {
    const key = docName.toLowerCase().trim();
    const actualFileName = fileName || `${docName.replace(/\s+/g, "_")}.pdf`;

    // 1. Update in-memory vault immediately
    const existing = this.vaultMap.get(key);
    this.vaultMap.set(key, {
      id: existing?.id || key,
      name: docName,
      status: "Uploaded",
      iconType: existing?.iconType || "pan",
      fileUri,
      fileName: actualFileName,
      fileSize,
      uploadedAt: new Date().toISOString(),
    });

    // 2. Sync to Zustand application store
    const store = useApplicationStore.getState();
    store.uploadDocument(appId, docName, fileUri);

    // Update matching docs across all applications in Zustand store
    useApplicationStore.setState((state) => ({
      applications: state.applications.map((app) => {
        const targetDocIndex = app.documents.findIndex(
          (d) => d.name.toLowerCase().trim() === key
        );

        if (targetDocIndex !== -1) {
          const updatedDocs = [...app.documents];
          updatedDocs[targetDocIndex] = {
            ...updatedDocs[targetDocIndex],
            status: "Uploaded" as DocumentStatus,
            fileUri,
            fileName: actualFileName,
            fileSize,
          } as any;
          return { ...app, documents: updatedDocs };
        } else if (app.id === appId) {
          return {
            ...app,
            documents: [
              ...app.documents,
              {
                name: docName,
                status: "Uploaded" as DocumentStatus,
                fileUri,
                fileName: actualFileName,
                fileSize,
              } as any,
            ],
          };
        }
        return app;
      }),
    }));
  }

  getMissingDocuments(docs: WorkflowDocumentItem[]): WorkflowDocumentItem[] {
    return docs.filter((d) => !this.isDocumentCompleted(d.status));
  }

  getCompletedDocuments(docs: WorkflowDocumentItem[]): WorkflowDocumentItem[] {
    return docs.filter((d) => this.isDocumentCompleted(d.status));
  }

  isAllDocumentsUploaded(docs: WorkflowDocumentItem[]): boolean {
    return this.getMissingDocuments(docs).length === 0;
  }
}

export const sharedDocumentRepository = new SharedDocumentRepository();

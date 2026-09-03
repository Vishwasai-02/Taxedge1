export type TdsUploadStatus =
  | "not_uploaded"
  | "uploaded"
  | "verified"
  | "rejected";

export interface TdsChecklistItem {
  id: string;
  title: string;
  subtitle: string;
  iconType:
    | "pan"
    | "form16"
    | "form16a"
    | "ais"
    | "tis"
    | "bank_cheque"
    | "prev_itr"
    | "tds_certs";
  isMandatory: boolean;
  status: TdsUploadStatus;
  fileName?: string;
  fileSize?: string;
  fileUri?: string;
  mimeType?: string;
  isHighlighted?: boolean;
}

import React from "react";
import { DocumentChecklist, type DocumentChecklistProps } from "../../../../shared/components/DocumentUploader/DocumentChecklist";

export const GSTDocumentList: React.FC<DocumentChecklistProps> = (props) => {
  return <DocumentChecklist {...props} />;
};

export default GSTDocumentList;

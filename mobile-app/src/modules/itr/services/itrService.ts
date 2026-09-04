import { itrApi } from "./itrApi";

export const itrService = {
  api: itrApi,
  getAssessmentYears: () => ["2025-2026", "2024-2025", "2023-2024", "2022-2023"],
};

export default itrService;

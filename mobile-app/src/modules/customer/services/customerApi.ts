import { apiClient } from "../../../core/api/apiClient";
import type { Customer, CustomerProfile } from "../types/customer.types";

export const customerApi = {
  getProfile: async () => {
    return apiClient.get<Customer>("/customer/profile");
  },
  updateProfile: async (profile: Partial<CustomerProfile>) => {
    return apiClient.put<Customer>("/customer/profile", profile);
  },
};

export default customerApi;

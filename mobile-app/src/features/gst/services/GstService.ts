import { IGstRepository, gstRepository } from "../repository/GstRepository";
import { GstServiceItem } from "../types/gst.types";

export class GstService {
  constructor(private readonly repository: IGstRepository = gstRepository) {}

  async fetchGstServices(): Promise<GstServiceItem[]> {
    return this.repository.getGstServices();
  }
}

export const gstService = new GstService();

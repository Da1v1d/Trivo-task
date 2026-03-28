import BaseApiService from "./base-api.service";

class ApiServiceInstance extends BaseApiService {
  constructor() {
    super(import.meta.env.VITE_API_BASE_URL || "");
  }
}

export const ApiService = new ApiServiceInstance();

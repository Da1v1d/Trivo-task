import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

// using this approach for microservices architecture where each service has its own API
class BaseApiService {
  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // add interceptors for response and request for many scenarios like authentication, logging, etc.
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      },
    );
    this.client.interceptors.request.use(
      (config) => config,
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    this.client.get<T>(url, config).then((res) => res.data);

  post = <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> =>
    this.client.post<T>(url, data, config).then((res) => res.data);

  put = <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> =>
    this.client.put<T>(url, data, config).then((res) => res.data);

  delete = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    this.client.delete<T>(url, config).then((res) => res.data);
}

export default BaseApiService;

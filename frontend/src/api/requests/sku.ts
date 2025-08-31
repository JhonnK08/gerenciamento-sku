import type { AxiosResponse } from "axios";
import { api } from "../instance";
import type { RegisterSkuPayload, Sku, UpdateSkuInfoPayload, UpdateSkuStatusPayload } from "../types/sku";

export async function fetchSkus(): Promise<AxiosResponse<Sku[]>> {
  return api.get('/sku');
}

export async function registerSku(
  payload: RegisterSkuPayload
): Promise<AxiosResponse<Sku>> {
  return api.post('/sku/register', payload);
}

export async function getSku(
  id: string
): Promise<AxiosResponse<Sku | null>> {
  return api.get(`/sku/${id}`);
}

export async function updateSkuInfo(
  id: string,
  payload: UpdateSkuInfoPayload
): Promise<AxiosResponse<Sku>> {
  return api.patch(`/sku/${id}`, payload);
}

export async function updateSkuStatus(
  id: string,
  payload: UpdateSkuStatusPayload
): Promise<AxiosResponse<Sku>> {
  return api.patch(`/sku/${id}/status`, payload);
}
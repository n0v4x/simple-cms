import modules from "@data/modules.json";
// import fetch from "@api/fetch";
import { AxiosInstance } from "axios";

const RESOURCE = "module"


// export const getAll = () => {
//   return fetch.get<{ data?: ModuleData[], error?: { message: string } }>(`/${RESOURCE}`);
// }

// export const get = (id: number) => {
//   return fetch.get<{ data?: ModuleData, error?: { message: string } }>(`/${RESOURCE}/${id}`);
// }

// export const create = (data: Partial<Omit<ModuleData, "id">>) => {
//   return fetch.post<{
//     data?: ModuleData,
//     error?: {
//       fields: { [key: string]: string }
//     }
//   }>(`/${RESOURCE}`, data);
// }

// export const update = (id: number, data: Partial<ModuleData>) => {
//   return fetch.put<{ data?: ModuleData, error?: { message: string, fields: { [key: string]: string } } }>(`/${RESOURCE}/${id}`, data);
// }

// export const deleteOne = (id: number) => {
//   return fetch.delete<{ data?: { deletedCount: number }, error?: { message: string } }>(`/${RESOURCE}/${id}`);
// }

// export const deleteAll = () => {
//   return fetch.delete<{ data?: { deletedCount: number }, error?: { message: string } }>(`/${RESOURCE}`);
// }
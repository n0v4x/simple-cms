import axios from "axios";

import page from "@api/services/page";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 31000,
  headers: {
    Accept: "application/json"
  },
});

export const get = <D>(resource: string, id?: number | string, data?: { [key: string]: any }) => {
  return client.get<D>(`/${resource}` + (id ? `/${id}` : ''), { data }).then(({ data }) => data);
}

export const post = <R, D extends { [key: string]: any } = { [key: string]: any }>(resource: string, data: D) => {
  return client.post<R>(`/${resource}`, data).then(({ data }) => data);
}

export const deleteOne = <R>(resource: string, id: number | string) => {
  return client.delete<R>(`/${resource}/${id}`).then(({ data }) => data);
}

export const services = {
  page
}

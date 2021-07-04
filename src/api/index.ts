import axios from "axios";
import page from "@api/services/page";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 31000,
  headers: {
    Accept: "application/json"
  },
});

type ResourceType = string | undefined | (string | undefined)[];

export const resourceToUrl = (resource: ResourceType): string => {
  if (!resource) {
    return "/"
  }

  if (typeof resource === "string") {
    resource = [resource]
  }

  return resource.reduce((acc, res) => {
    const normalizedRes = res ? res.replace(/(^[\s\/]+|\/(?=\/)|[\s\/]+$)/g, "") : "";

    if (normalizedRes) {
      return `${acc}/${normalizedRes}`
    }

    return acc;
  }, "") as string;
}

type Data = { [key: string]: any };

export const get = <R, D extends Data = Data>(resource: ResourceType, data?: D) => {
  return client.get<R>(resourceToUrl(resource), { data }).then(({ data }) => data);
}

export const post = <R, D extends Data>(resource: ResourceType, data: D) => {
  return client.post<R>(resourceToUrl(resource), data).then(({ data }) => data);
}

export const deleteOne = <R>(resource: ResourceType) => {
  return client.delete<R>(resourceToUrl(resource)).then(({ data }) => data);
}

export const put = <R, D extends Data>(resource: ResourceType, data: D) => {
  return client.put<R>(resourceToUrl(resource), data).then(({ data }) => data);
}

export const services = {
  page
}

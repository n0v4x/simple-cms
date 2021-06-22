import * as api from "@api/index";

const cerateService = (resource: string) => {
  const get = (filter?: Pick<PageData, "url">) => {
    return api.get<{
      data: PageData[],
      success: 1
    } | {
      error: string,
      success: 0
    }>(resource, undefined, filter);
  }

  const getOne = (id: PageData["id"]) => {
    return api.get<{ data?: PageData, error?: { message: string } }>(resource, id);
  }

  const create = (data: Omit<PageData, "id">) => {
    return api.post<{
      data: PageData,
      success: 1
    } | {
      error: string,
      success: 0
    }>(resource, data);
  }

  const deleteOne = (id: PageData["id"]) => {
    return api.deleteOne<{
      data: number,
      success: 1
    } | {
      error: string,
      success: 0
    }>(resource, id)
  }

  const addModule = (pageId: PageData["id"], moduleData: ModuleData) => {
    return api.post<{
      data: ModuleData,
      success: 1
    } | {
      error: string,
      success: 0
    }>(resource + `/${pageId}/module`, moduleData)
  }

  return {
    create,
    getOne,
    get,
    deleteOne,
    addModule
  }
}

const service = cerateService("page");

export default service;


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
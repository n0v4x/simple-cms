import * as api from "@api/index";

const initService = (resource: string) => {
  const get = (filter?: Pick<PageData, "url">) => {
    return api.get<{
      data: PageData[],
      success: 1
    } | {
      error: string,
      success: 0
    }>(resource, filter);
  }

  const getOne = (id: PageData["id"]) => {
    return api.get<{ data?: PageData, error?: { message: string } }>([resource, id]);
  }

  const create = (data: Omit<PageData, "id">) => {
    return api.post<{
      data: PageData,
      success: 1
    } | {
      error: string,
      success: 0
    }, typeof data>(resource, data);
  }

  const deleteOne = (id: PageData["id"]) => {
    return api.deleteOne<{
      data: number,
      success: 1
    } | {
      error: string,
      success: 0
    }>([resource, id])
  }

  const update = (id: PageData["id"], pageData: PageData) => {
    return api.put<{
      success: 1
      data: PageData,
    } | {
      success: 0
      error: PageData,
    }, PageData>([resource, id], pageData);
  }

  return {
    create,
    getOne,
    get,
    deleteOne,
    update
  }
}

const service = initService("page");

export default service;
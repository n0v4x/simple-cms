import * as api from "@api/index";

const initService = (resource: string) => {
  const get = () => {
    return api.get<{
      data: TemplateData[],
      success: 1
    } | {
      error: string,
      success: 0
    }>(resource);
  }

  const getOne = (id: TemplateData["id"]) => {
    return api.get<{ data?: TemplateData, error?: { message: string } }>([resource, id]);
  }

  const create = (data: Omit<TemplateData, "id">) => {
    return api.post<{
      data: TemplateData,
      success: 1
    } | {
      error: string,
      success: 0
    }, typeof data>(resource, data);
  }

  const deleteOne = (id: TemplateData["id"]) => {
    return api.deleteOne<{
      data: number,
      success: 1
    } | {
      error: string,
      success: 0
    }>([resource, id])
  }

  const update = (id: TemplateData["id"], pageData: TemplateData) => {
    return api.put<{
      success: 1
      data: TemplateData,
    } | {
      success: 0
      error: TemplateData,
    }, TemplateData>([resource, id], pageData);
  }

  return {
    create,
    getOne,
    get,
    deleteOne,
    update
  }
}

const service = initService("template");

export default service;
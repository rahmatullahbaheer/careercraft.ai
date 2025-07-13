import authApi from "./auth";
// import { handleAPIError } from "./helper";

export async function getAPI(path, params = {}) {
  try {
    const response = await authApi.get(path, { params });

    return response;
  } catch (e) {
    // const error = handleAPIError(e.response);
    throw e?.response; // Throw the full error response
  }
}

export async function postAPI(path, body = {}) {
  try {
    const response = await authApi.post(path, body);
    return response;
  } catch (e) {
    // const error = handleAPIError(e.response);

    throw e?.response; // Throw the full error response
  }
}

export async function patchAPI(path, id, body) {
  try {
    const response = await authApi.patch(`${path}/${id}`, body);
    return response;
  } catch (e) {
    // const error = handleAPIError(e.response);
    throw e?.response; // Throw the full error response
  }
}
export async function putAPI(path, id, body) {
  try {
    const response = await authApi.put(`${path}/${id}`, body);
    return response;
  } catch (e) {
    // const error = handleAPIError(e.response);
    throw e?.response; // Throw the full error response
  }
}

export async function deleteAPI(path, id) {
  try {
    const response = await authApi.delete(`${path}/${id}`);
    return response;
  } catch (e) {
    // const error = handleAPIError(e.response);
    throw e?.response; // Throw the full error response
  }
}

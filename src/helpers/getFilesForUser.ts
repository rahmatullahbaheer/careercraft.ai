import axios from "axios";
export const getFilesForUser = async (email: string | null | undefined) => {
  if (email) {
    return axios
      .get(`/api/users/getOneByEmail?email=${email}`)
      .then(async (resp) => {
        const data = resp.data.result;
        if (data) {
          return data;
        } else {
          return [];
        }
      });
  }
};

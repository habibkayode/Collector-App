import { AxiosNormal } from "./axios";
import { store } from "../Redux/store";
import {
  updateNetWorkLoading,
  updateLoggedIn,
  saveUserData,
} from "../Redux/actionCreator";

const loginFun = async (payload) => {
  try {
    console.log(payload);
    let response = await AxiosNormal.post("/auth/collector/login", {
      ...payload,
    });

    console.log(response.data);
    store.dispatch(
      saveUserData({
        data: response.data.data.user,
        token: response.data.data.access_token,
      })
    );
    store.dispatch(updateLoggedIn(true));
    return response.data;
  } catch (error) {
    store.dispatch(updateNetWorkLoading(false));
    console.log(error, "in herr", error.response.data.error);
    throw error;
  }
};

let registerCollector = async (payload) => {
  try {
    let url = "/auth/collectors/register";
    let response = await AxiosNormal.post(url, payload);

    return response.data;

    console.log(response.data.error, "errr in then");
  } catch (e) {
    store.dispatch(updateNetWorkLoading(false));
    console.log(e, "error in catch");
    throw e;
  }
};

export { loginFun, registerCollector };

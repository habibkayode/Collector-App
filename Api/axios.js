import axios from "axios";
import { store } from "../Redux/store";
import { updateLoggedIn, updateNetWorkLoading } from "../Redux/actionCreator";
import { Alert } from "react-native";

const baseURL = "https://api.scrapays.com/v1";

let errFun = (error) => {
  console.log(error);
  if (
    error.response.status === 401 &&
    error.response.data.error === "Invalid token"
  ) {
    store.dispatch(updateLoggedIn(false));
    store.dispatch(updateNetWorkLoading(false));
    Alert.alert("Session Expired", "Please login again");
  } else {
    console.log(error.response.data);
    store.dispatch(updateNetWorkLoading(false));
    throw error;
  }
};

//export let baseURL = "https://api.scrapays.com/v1";
let AxiosNormal = axios.create({
  baseURL: baseURL,
});

AxiosNormal.interceptors.request.use((config) => {
  store.dispatch(updateNetWorkLoading(true));

  return config;
});

AxiosNormal.interceptors.response.use((repons) => {
  store.dispatch(updateNetWorkLoading(false));
  // console.log(repons, "axios normal");
  return repons;
});

let AxiosSecure = axios.create({
  baseURL,
});

AxiosSecure.interceptors.request.use((config) => {
  store.dispatch(updateNetWorkLoading(true));
  let token = store.getState().normal.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

AxiosSecure.interceptors.response.use((repons) => {
  store.dispatch(updateNetWorkLoading(false));
  return repons;
}, errFun);

let AxiosNoLoading = axios.create({
  baseURL,
});

AxiosNoLoading.interceptors.response.use((repons) => {
  store.dispatch(updateNetWorkLoading(false));
  return repons;
}, errFun);

AxiosNoLoading.interceptors.request.use((config) => {
  let token = store.getState().normal.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { AxiosNormal, AxiosSecure, AxiosNoLoading, baseURL };

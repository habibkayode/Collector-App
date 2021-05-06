import axios from "axios";
import { store } from "../Redux/store";
import { updateNetWorkLoading } from "../Redux/actionCreator";
export let baseURL = "https://staging.scrapays.com/v1";
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
});

let AxiosNoLoading = axios.create({
  baseURL,
});

AxiosNoLoading.interceptors.request.use((config) => {
  let token = store.getState().normal.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { AxiosNormal, AxiosSecure, AxiosNoLoading };

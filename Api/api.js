import { AxiosSecure, AxiosNoLoading, AxiosNormal } from "./axios";
import { store } from "../Redux/store";
import {
  savePickUpRequest,
  saveMaterialTypes,
  saveAcceptedPickUpRequest,
  updatePendingCollection,
  updateCompositeMaterial,
  saveNotification,
  saveCoverageZone,
  saveAgent,
  updateNetWorkLoading,
} from "../Redux/actionCreator";

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

let getSingleCollectorPickUp = async (page = 1, refreshing = false) => {
  try {
    let userId = store.getState().normal.userData.id;
    let url = `/collectors/${userId}/pickuprequests?page=${page}&collector_accepted=pending`;
    console.log(url, "singlePick");
    let response = await AxiosNoLoading.get(url);
    if (response.status === 200) {
      console.log(page, "page number");
      store.dispatch(savePickUpRequest(response.data.data, refreshing));
      return;
    } else {
      //
    }
  } catch (e) {
    console.log(e, "in pickup");
  }
};

let getAllSingleCollectorPickUp = async () => {
  try {
    let userId = store.getState().normal.userData.id;
    let url = `/collectors/${userId}/pickuprequests?collector_accepted=pending`;
    console.log(url, "all pending pickup request");
    let response = await AxiosNoLoading.get(url);
    if (response.status === 200) {
      console.log(response.data);
      return response.data.data;
    } else {
      //
    }
  } catch (e) {
    console.log(e, "in all pickup request");
  }
};

let getAllMaterial = async () => {
  try {
    let url = "/materials?per_page=-1";
    let response = await AxiosSecure(url);
    console.log(url, response.status);
    if (response.status === 200) {
      let dataObj = convertArrayToObject(response.data.data.homogenous, "name");
      store.dispatch(saveMaterialTypes(response.data.data.homogenous, dataObj));
      console.log(response.data.data.composite, "composite");
      store.dispatch(updateCompositeMaterial(response.data.data.composite));
    }
  } catch (e) {
    console.log(e, "in material");
  }
};

let acceptPickUp = async (id) => {
  try {
    let url = `/pickuprequests/${id}/accept`;
    let response = await AxiosSecure.put(url);
    if (response.status == 200) {
      console.log("accepted ", id);
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

let rejectPickUp = async (id) => {
  try {
    let url = `/pickuprequests/${id}/reject`;
    let response = await AxiosSecure.put(url);
    console.log(response.data, response.status);
    if (response.status == 200) {
      console.log("Rejected", id);
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

let getAcceptedPickupRequst = async (page, refreshing = false) => {
  let userId = store.getState().normal.userData.id;
  try {
    let url = `/collectors/${userId}/pickuprequests?collector_accepted=accepted&page=${page}`;
    let response = await AxiosNoLoading.get(url);
    if (response.status == 200) {
      console.log("accepted pickup request", userId);
      store.dispatch(saveAcceptedPickUpRequest(response.data.data, refreshing));
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

let getAllAcceptedPickupRequst = async () => {
  let userId = store.getState().normal.userData.id;
  try {
    let url = `/collectors/${userId}/pickuprequests?collector_accepted=accepted&per_page=-1`;
    let response = await AxiosNoLoading.get(url);
    if (response.status == 200) {
      console.log("All accepted pickup request", userId);
      // store.dispatch(saveAcceptedPickUpRequest(response.data.data, refreshing));
      return response.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

// let getAllCollection = async (page,refreshing) => {
//   try {
//     let url = "/collectors/BRY9FYBDX/collectedscraps?per_page=-1";
//     let response = await AxiosSecure.put(url);

//     if (response.status == 200) {
//       console.log("Log");
//       return response.data;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

let getAllCollection = async (page) => {
  try {
    let url = `/collectors/BRY9FYBDX/collectedscraps?page=${page}`;
    let response = await AxiosNoLoading.get(url);

    if (response.status == 200) {
      console.log("all collection");
      console.log(response.data, "collection s");
      return response.data.data;
    }
  } catch (e) {
    console.log(e.response.data.error, "collection  errors");
  }
};

let getAllPendingCollection = async () => {
  let userId = store.getState().normal.userData.id;

  try {
    let url = `/collectors/${userId}/collectedscraps?per_page=-1&drop_off_status=pending`;
    let response = await AxiosSecure.get(url);
    if (response.status === 200) {
      store.dispatch(updatePendingCollection(response.data.data));
      console.log(response.data.data.length, "pppp");
    }
    store.dispatch(updatePendingCollection(response.data.data));
  } catch (e) {
    console.log(e);
    store.dispatch(updateNetWorkLoading(false));
    throw e;
  }
};

let getComissionBalance = async () => {
  let userId = store.getState().normal.userData.id;
  let url = `/wallets/${userId}/balance`;
  try {
    let response = await AxiosSecure.get(url);
    if (response.status === 200) return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

let getCOGbalance = async () => {
  let userId = store.getState().normal.userData.id;
  let url = `/wallets/${userId}/balance?wallet=cog`;
  try {
    let response = await AxiosSecure.get(url);
    if (response.status === 200) return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

let updateLocation = async (lat, lng) => {
  let id = store.getState().normal.userData.id;
  try {
    console.log(lat, lng);
    let response = await AxiosNoLoading.post("/locations/ping", {
      lat,
      lng,
      id,
    });
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
};

let updateProfile = async (data) => {
  // console.log(data);
  let id = store.getState().normal.userData.id;
  let url = `/auth/collectors/${id}?_method=PUT`;
  try {
    console.log(url);
    let response = await AxiosSecure.post(url, data);
    console.log(response.data);

    return response.data;
  } catch (e) {
    store.dispatch(updateNetWorkLoading(false));
    console.log(e, "in update Profile");
    throw e;
  }
};

let getAllNofification = async () => {
  let id = store.getState().normal.userData.id;
  let url = `/users/${id}/notifications?per_page=-1`;
  try {
    let response = await AxiosSecure.get(url);
    if (response.status === 200) {
      console.log(response.data.data, "Notification");
      store.dispatch(saveNotification(response.data.data));
      return;
    }
  } catch (e) {
    console.log(e.response.data.error, "in notification");
    // throw e;
  }
};

let getAllCoverageRegion = async () => {
  let url = `/locations?per_page=-1`;
  try {
    let response = await AxiosNormal.get(url);
    if (response.status === 200) {
      let sort = response.data.data.sort(function (a, b) {
        return ("" + a.name).localeCompare(b.name);
      });

      store.dispatch(saveCoverageZone(sort));
      return;
    }
  } catch (e) {
    console.log(e.response.data.error, "in coverage Zone");
    // throw e;
  }
};

let gettAllAgent = async () => {
  let id = store.getState().normal.userData.id;
  let url = `/agents?per_page=-1`;
  try {
    let response = await AxiosSecure.get(url);
    if (response.status === 200) {
      store.dispatch(saveAgent(response.data.data));
      return;
    }
  } catch (e) {
    console.log(e.response.data.error, "in getting all agent");
    // throw e;
  }
};

let submitPickup = async (payload) => {
  let url = `/collectedscraps`;
  try {
    let response = await AxiosSecure.post(url, payload);
    console.log(response.data);
  } catch (e) {
    console.log(e, "in submiting pickup reqest");

    store.dispatch(updateNetWorkLoading(false));
    throw e;
  }
};

let verifyPhone = async (data) => {
  console.log(data, "dat in vee");
  let url = "/auth/phone/verify";
  try {
    let response = await AxiosSecure.post(url, data);
    console.log(response.data, "veriyDaddd");
    return response.data;
  } catch (e) {
    console.log(e, "icode veryfication");
    store.dispatch(updateNetWorkLoading(false));
    throw e;
  }
};

const sendVerificationCodeAgain = async (phone) => {
  let url = "/auth/phone/verify/resend";
  try {
    let response = await AxiosNormal.post(url, { phone });
  } catch (e) {
    console.log(e.response.data.error);

    store.dispatch(updateNetWorkLoading(false));
  }
};
export {
  getSingleCollectorPickUp,
  getAllMaterial,
  acceptPickUp,
  rejectPickUp,
  getAllCollection,
  getAcceptedPickupRequst,
  getAllPendingCollection,
  getCOGbalance,
  getComissionBalance,
  updateLocation,
  updateProfile,
  getAllNofification,
  getAllCoverageRegion,
  gettAllAgent,
  getAllSingleCollectorPickUp,
  getAllAcceptedPickupRequst,
  submitPickup,
  verifyPhone,
  sendVerificationCodeAgain,
};

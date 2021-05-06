import axios from "axios";

let googleAPi = "https://maps.googleapis.com/maps/api/distancematrix/json";

let getDistanceAndTime = async (origin, destination) => {
  let params = `?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=AIzaSyA3p7z6bSVFZ9qZWSB9BW8kmT6K50QTHb4&mode=walking`;

  try {
    let response = await axios.get(googleAPi + params);
    if (response.status) return response.data;
  } catch (e) {
    console.log(e.response);
  }
};

export { getDistanceAndTime };

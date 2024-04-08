import axios from "axios";

const API = "https://aviral.iiita.ac.in/api";
export const logUser = async (obj) => {
  try {
    const data = await axios.post(`${API}/login/`, obj);
    return data;
  } catch (e) {
    console.log(e);
    return;
  }
};
export const verifyUser = async (obj) => {
  try {
    const res = await axios.post(`${API}/login/`, obj);
    return res.data.user_group ? true : false;
  } catch (e) {
    console.log(e);
    return;
  }
};
export const getDashboard = async (jwt_token, session) => {
  try {
    const res = await axios.get(`${API}/student/dashboard/`, {
      headers: {
        Authorization: jwt_token,
        Session: session,
      },
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

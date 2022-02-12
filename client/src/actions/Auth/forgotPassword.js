import axios from "axios";
import { setAlert } from "../alert";

export const forgotPassword = (email) => async (dispatch) => {
  try {
    await axios({
      method: "POST",
      url: "/api/auth/forgotpassword",
      data: { email },
    });
    dispatch(setAlert(`Email has been sent`, "success"));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
  }
};

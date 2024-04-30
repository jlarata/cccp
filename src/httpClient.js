import axios from "axios";

export default axios.create({
  withCredentials: true,
  //baseURL: "https://ratalajota.pythonanywhere.com", //can be your localhost too
});


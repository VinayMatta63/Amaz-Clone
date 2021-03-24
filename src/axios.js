import axios from "axios";

const instance = axios.create({
  baseURL: "https://a-clone-backend.herokuapp.com",
});

export default instance;

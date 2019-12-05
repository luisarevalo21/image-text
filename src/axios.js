import axios from "axios";

const instance = axios.create({
  baseURL: "https://image-text-259801.firebaseio.com/"
});

export default instance;

import axios from "axios";
import { baseUrl } from "../constants/url.constants";

//Creating an instance of axios client
//this means all the requests using this baseUrl will be on the same url
const httpModule = axios.create({
  baseURL: baseUrl,
});

export default httpModule;

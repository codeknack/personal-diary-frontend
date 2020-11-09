import axios from "axios";
import User from "./User";

const token = User.getUserToken();

const server = axios.create({
  baseURL: 'http://localhost:8000',
  headers: token
});

export default server;
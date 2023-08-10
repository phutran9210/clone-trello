import axios from "axios";

const url = "http://localhost:3000"

export const fetchPermission = (payload : {data : string}) =>
axios.post(`${url}/user/createchatsearch`,payload, { withCredentials: true });

export const fetchCreateBoard = (payload : any) =>
axios.post(`${url}/board`,payload, { withCredentials: true });
import axios from "axios";



const customFetch = axios.create({

  baseURL: import.meta.env.VITE_API_URL || "/api",

  withCredentials: true,

  headers: {

    "Content-Type": "application/json",

    Accept: "application/json",

  },

});



export default customFetch;

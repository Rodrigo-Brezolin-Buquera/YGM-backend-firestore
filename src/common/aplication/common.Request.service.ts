import axios from "axios";

export class RequestService { 
    protected baseURL = "https://yogamangala.onrender.com"

    //protected baseURL = "http://localhost:3003"

    protected setHeader = (token: string) => {
        return { headers: { Authorization: token } };
      };

    protected API = axios 
}
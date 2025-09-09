import axios from "axios";
import "dotenv/config"; // this is loaded before main

export const tektonClient = axios.create({
    baseURL: `${process.env.AWS_TEKTON_URL}:30080`,
    headers: { "Content-Type": "application/json" },
    timeout: 10000,
});

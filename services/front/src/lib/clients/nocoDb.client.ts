import axios from 'axios';

export const waitlistNocoDBClient = axios.create({
    baseURL: process.env.NOCODB_API_ROUTE,
    headers: {
        'Content-Type': 'application/json',
        'xc-token': process.env.NOCODB_API_KEY!,
    },
});
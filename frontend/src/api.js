// Interceptor that intercepts any requests we're going to send
// Automatically add the correct headers so that we don't need
// to manually write it a bunch of different tiems

// Uses axios to send network requests

// Every time we send a request it checks if there's an access token
// If we do it will automatically add it to the request

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

// Allows us to import anything that's specified
// in an environment variable file
// If we want to have an env var loaded inside
// the React code, it needs to start with VITE

// We have this in an env var so it's easy to load
// and change what the URL should be 
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        // If we have an access token, add it to the request
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            // Adds an authorization header to the HTTP request
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api

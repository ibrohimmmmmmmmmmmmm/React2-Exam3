import axios from "axios"

// SAVE TOKEN
export function SaveToken(token: string) {
  localStorage.setItem("store_token", token)
}

// GET TOKEN
export function getToken() {
  return localStorage.getItem("store_token")
}

// REMOVE TOKEN (LOGOUT)
export function RemoveToken() {
  localStorage.removeItem("store_token")
}

// AXIOS INSTANCE
export const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

// INTERCEPTOR
axiosRequest.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
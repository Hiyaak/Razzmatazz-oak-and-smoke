import axios from 'axios'

export const ImagePath =
  'https://recessbucket.s3.ap-south-1.amazonaws.com/attachments/'

const API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
})

const ApiService = {
  get: (endpoint, params, token) =>
    axiosInstance.get(endpoint, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    }),
  post: (endpoint, data, token) =>
    axiosInstance.post(endpoint, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
}
export default ApiService

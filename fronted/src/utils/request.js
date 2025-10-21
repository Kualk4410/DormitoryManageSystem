import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000
})

export default request
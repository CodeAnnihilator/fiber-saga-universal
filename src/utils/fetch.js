import axios from 'axios'

export const fetch = axios.create({
  baseURL: 'http://localhost:9000/api',
})

fetch.defaults.headers.common['Authorization'] = 'ADQtXePQ8U9b1q7WGXHihNjrTHLdWygygCo6EzXG0GY4djxsbNIphHLtCtIVbWAD'

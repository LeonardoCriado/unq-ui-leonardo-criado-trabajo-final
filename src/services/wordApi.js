import axios from 'axios'

const api = axios.create({
  baseURL: 'https://word-api-hmlg.vercel.app/api',
  timeout: 10000,
})

export async function validateWord(word) {
  const response = await api.get('/validate', {
    params: { word },
  })

  return response.data
}

import axios from 'axios'

const API_URL = 'http://localhost:3001/'

export const getStudent = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}user/student?id=${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

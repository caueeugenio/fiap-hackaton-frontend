import axios from 'axios'

export async function login(email: string, password: string) {
  try {
    const response = await axios.post('http://localhost:3001/auth/login', {
      email,
      password,
    })
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  } catch (error: any) {
    return error.response ? error.response.data : error.message
  }
}

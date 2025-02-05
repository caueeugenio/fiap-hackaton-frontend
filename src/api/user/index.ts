import { AxiosError } from 'axios';
import api from '@/api/lib/axios';
import { getErrorMessage } from '../utils/functions';

export const getUser = async (email: string) => {
  try {
    const { data } = await api.get(`/user?email=${email}`);

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

export const getTeacher = async (userId: number) => {
  try {
    const { data } = await api.get(`/user/teacher/${userId}`);

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

export const getStudent = async (userId: number) => {
  try {
    const { data } = await api.get(`/user/student/${userId}`);

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}


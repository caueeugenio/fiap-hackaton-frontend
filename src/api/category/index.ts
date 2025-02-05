import { AxiosError } from 'axios';
import api from '@/api/lib/axios';
import { getErrorMessage } from '../utils/functions';

export const getYears = async () => {
  try {
    const { data } = await api.get('/category/years');

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

export const getClasses = async () => {
  try {
    const { data } = await api.get('/category/classes');

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}
export const getGrades = async () => {
  try {
    const { data } = await api.get('/category/grades');

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}
export const getSubjects = async () => {
  try {
    const { data } = await api.get('/category/subjects');

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

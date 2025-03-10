import { AxiosError } from 'axios';
import api from '@/api/lib/axios';
import { getErrorMessage } from '../utils/functions';
import { Category, Result } from '@/types/globals';

export const getYears = async (): Promise<Result<Category[]>>  => {
  try {
    const { data } = await api.get('/category/years');

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

export const getClasses = async (): Promise<Result<Category[]>>  => {
  try {
    const { data } = await api.get('/category/classes');

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}
export const getGrades = async (): Promise<Result<Category[]>>  => {
  try {
    const { data } = await api.get('/category/grades');

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}
export const getSubjects = async (): Promise<Result<Category[]>>  => {
  try {
    const { data } = await api.get('/category/subjects');

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

import { AxiosError } from 'axios';
import api from '@/api/lib/axios';
import { getErrorMessage } from '../utils/functions';
import { mapPendingQuestionnaires, mapQuestionnaire } from './utils';

export const getQuestionnaires = async () => {
  try {
    const { data } = await api.get('/questionnaire');

    return { success: true, value: mapQuestionnaire(data)}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

export const getStudentScoresGroupedBySubject = async (userId: number) => {
  try {
    const { data } = await api.get(`/questionnaire/student/${userId}/scores`);

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

export const getQuestionnairesByStudent = async (userId: number) => {
  try {
    const { data } = await api.get(`/questionnaire/student/${userId}`);

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

export const getQuestionnairesByTeacher = async (userId: number) => {
  try {
    const { data } = await api.get(`/questionnaire/teacher/${userId}`);

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

export const getPendingQuestionnairesByStudent = async (userId: number, yearId: string, gradeId: string, classId: string) => {
  try {
    const { data } = await api.get(`/questionnaire/student/${userId}/pending?year=${yearId}&grade=${gradeId}&class=${classId}`);

    return { success: true, value: mapPendingQuestionnaires(data)}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

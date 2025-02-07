import { AxiosError } from 'axios';
import api from '@/api/lib/axios';
import { getErrorMessage } from '../utils/functions';
import { mapPendingQuestionnaires } from './utils';
import { Questionnaire } from '@/app/new-questionnaire/types';

export const getQuestionnaires = async () => {
  try {
    const { data } = await api.get('/questionnaire');

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

export const getQuestionnaireById = async (id: number) => {
  try {
    const { data } = await api.get('/questionnaire/' + id);

    return { success: true, value: data}    
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

export const deleteQuestionnaire = async (questionnaireId: number) => {
  try {
    await api.delete(`/questionnaire/${questionnaireId}`);

    return { success: true, value: null}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

export const postQuestionnaire = async (questionnaire: Questionnaire) => {
  try {
    const { data } = await api.post('/questionnaire', questionnaire);

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}
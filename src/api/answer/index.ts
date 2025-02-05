import { AxiosError } from 'axios';
import api from '@/api/lib/axios';
import { getErrorMessage } from '../utils/functions';
import { mapQuestionnaireAnswers } from './utils';

export const getQuestionnaireAnswers = async (questionnaireId: number) => {
  try {
    const { data } = await api.get(`/answer/questionnaire/${questionnaireId}`);

    return { success: true, value: mapQuestionnaireAnswers(data)}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}

export const getAnswerCountsByQuestionnaire = async (questionnaireId: number) => {
  try {
    const { data } = await api.get(`/answer/questionnaire/${questionnaireId}/counts`);

    return { success: true, value: data}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}


export const getAnswersByQuestion = async (questionnaireId: number, questionId: number) => {
  try {
    const { data } = await api.get(`/answer/questionnaire/${questionnaireId}/question/${questionId}`);

    return { success: true, value: mapQuestionnaireAnswers(data)}    
  } catch (error) {
    const message = getErrorMessage((error as AxiosError).status);
    
    return { success: false, error: message}
  }
}


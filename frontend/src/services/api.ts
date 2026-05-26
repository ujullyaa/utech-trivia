import axios from 'axios';

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface PlayerScore {
  name: string;
  score: number;
}

export const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const fetchQuizQuestions = async (): Promise<Question[]> => {
  const response = await api.get('/quiz');
  const data = response.data;

  if (Array.isArray(data)) {
    return data;
  } else if (data.questions) {
    return data.questions; 
  } else if (data.question) {
    return data.question; 
  }

  return [];
};

export const saveRanking = async (name: string, score: number) => {
  const response = await api.post('/ranking', { name, score });
  return response.data;
};

export const getTop5 = async (): Promise<PlayerScore[]> => {
  const response = await api.get('/ranking/top5');
  return response.data.top5;
};
import axios from 'axios';
import { params } from './const';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPic = async ({ query, page }) => {
  try {
    const resp = await axios.get(`?q=${query}&page=${page}`, {
      params,
    });

    return resp.data;
  } catch (error) {
    return Promise.reject(
      new Error('Что то пошло не так. Попробуйте перезапустить страницу')
    );
  }
};

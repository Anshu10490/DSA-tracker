import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/problems';

export const getAllProblems = () => axios.get(BASE_URL);
export const addProblem = (data) => axios.post(BASE_URL, data);
export const deleteProblem = (id) => axios.delete(`${BASE_URL}/${id}`);
export const updateProblem = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const getStats = () => axios.get(`${BASE_URL}/stats`);
export const getByTag = (tag) => axios.get(`${BASE_URL}/tag/${tag}`);

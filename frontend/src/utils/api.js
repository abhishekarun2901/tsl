import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Public API calls
export const getTeams = () => api.get('/teams');
export const getTeam = (id) => api.get(`/teams/${id}`);
export const getMatches = () => api.get('/matches');
export const getStandings = () => api.get('/standings');
export const getPlayers = () => api.get('/players');
export const getTopScorers = () => api.get('/topscorers');

// Admin API calls
const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAdminSecret = (secret) => {
  adminApi.defaults.headers['x-admin-secret'] = secret;
};

export const verifyAdmin = () => adminApi.post('/admin/verify');
export const createTeam = (data) => adminApi.post('/admin/team', data);
export const createPlayer = (data) => adminApi.post('/admin/player', data);
export const createMatch = (data) => adminApi.post('/admin/match', data);
export const updateMatchScore = (data) => adminApi.patch('/admin/match/score', data);
export const addGoalScorer = (data) => adminApi.post('/admin/match/goals', data);
export const removeGoalScorer = (data) => adminApi.delete('/admin/match/goals', { data });

export default api;

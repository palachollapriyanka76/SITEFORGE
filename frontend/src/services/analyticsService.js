import api from './api';

export const analyticsService = {
  getStats: async () => {
    const response = await api.get('/analytics');
    return response.data;
  },
};

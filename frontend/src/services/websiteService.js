import api from './api';

export const websiteService = {
  getWebsites: async () => {
    const response = await api.get('/websites');
    return response.data;
  },
};

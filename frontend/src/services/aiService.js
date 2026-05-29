import api from './api';

export const aiService = {
  generateWebsite: async (prompt) => {
    const response = await api.post('/ai/generate', { prompt });
    return response.data;
  },
};

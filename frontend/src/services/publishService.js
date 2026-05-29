import api from './api';

export const publishService = {
  publish: async (siteId) => {
    const response = await api.post(`/publish/${siteId}`);
    return response.data;
  },
};

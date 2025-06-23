import api from './axios';
export const protocolsApi = {
    async create(data) {
        return api.post('protocols/', data);
    },
    async getAll() {
        return api.get('protocols/');
    },
    async get(id) {
        return api.get(`protocols/${id}/`);
    },
    async update(id, data) {
        return api.put(`protocols/${id}/`, data);
    },
    async delete(id) {
        return api.delete(`protocols/${id}/`);
    }
};

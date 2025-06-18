import { Protocol } from '../types/protocol';
import api from './axios'

export const protocolsApi = {
  async create(data: Omit<Protocol, 'id'>) {
    return api.post('protocols/', data);
  },
  async getAll() {
    return api.get<Protocol[]>('protocols/');
  },
  async get(id: number) {
    return api.get<Protocol>(`protocols/${id}/`);
  },
  async update(id: number, data: Partial<Omit<Protocol, 'id'>>) {
    return api.put(`protocols/${id}/`, data);
  },
  async delete(id: number) {
    return api.delete(`protocols/${id}/`);
  }
}
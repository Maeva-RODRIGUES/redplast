import api from 'axios'

export const protocolsApi = {
  async create(data: any) {
    return api.post('protocols/', data)
  },
  async getAll() {
    return api.get('protocols/')
  },
  async get(id: number) {
    return api.get(`protocols/${id}/`)
  },
  async update(id: number, data: any) {
    return api.put(`protocols/${id}/`, data)
  },
  async delete(id: number) {
    return api.delete(`protocols/${id}/`)
  }
}

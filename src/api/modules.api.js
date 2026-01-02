import { apiFetch } from '@/lib/api';

export const modulesAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return apiFetch(`/modules?${queryParams}`);
  },

  getActiveForAssign: async () => {
    return apiFetch('/modules?isActive=true&page=1&limit=100');
  },

  getAssignableForEmployee: async (employeeAccountId) => {
    if (!employeeAccountId) return [];

    return apiFetch(
      `/modules/assignable?employeeAccountId=${employeeAccountId}`
    );
  },

  getById: async (id) => {
    return apiFetch(`/modules/${id}`);
  },

  getModuleDetail: async (id) => {
    // Get detailed module info with enrollment counts
    return apiFetch(`/modules/${id}/detail`);
  },

  getModuleEnrollments: async (id) => {
    // Get list of users enrolled in this module
    return apiFetch(`/modules/${id}/enrollments`);
  },

  create: async (moduleData) => {
    return apiFetch('/modules', {
      method: 'POST',
      body: JSON.stringify(moduleData),
    });
  },

  update: async (id, moduleData) => {
    return apiFetch(`/modules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(moduleData),
    });
  },

  delete: async (id) => {
    return apiFetch(`/modules/${id}`, {
      method: 'DELETE',
    });
  },

  // Module Items endpoints
  addItem: async (moduleId, itemData) => {
    return apiFetch(`/modules/${moduleId}/items`, {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },

  updateItem: async (moduleId, itemId, itemData) => {
    return apiFetch(`/modules/${moduleId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    });
  },

  deleteItem: async (moduleId, itemId) => {
    return apiFetch(`/modules/${moduleId}/items/${itemId}`, {
      method: 'DELETE',
    });
  },

  reorderItems: async (moduleId, itemOrders) => {
    return apiFetch(`/modules/${moduleId}/items/reorder`, {
      method: 'PUT',
      body: JSON.stringify({ itemOrders }),
    });
  },
};

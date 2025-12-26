const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7118/api/v1';

/* =========================
   RESPONSE HANDLER
========================= */
const handleResponse = async (response) => {
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message || result.Message || result.error || result.Error || 'An error occurred'
    );
  }

  return result.data ?? result.Data ?? result;
};

/* =========================
   AUTH HEADERS
========================= */
const getHeaders = () => {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/* =========================
   ENROLLMENT API
========================= */
export const enrollmentAPI = {
  /* -------------------------
     GET CURRENT ENROLLMENT
  ------------------------- */
  getCurrent: async () => {
    const res = await fetch(`${API_BASE_URL}/enrollments/current`, {
      method: 'GET',
      headers: getHeaders(),
    });

    // 204 No Content → berarti belum enroll
    if (res.status === 204) return null;

    return handleResponse(res);
  },

  /* -------------------------
     ENROLL MODULE
  ------------------------- */
  enroll: async (moduleId) => {
    const res = await fetch(`${API_BASE_URL}/enrollments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ moduleId }),
    });

    return handleResponse(res);
  },

  /* -------------------------
     GET PROGRESS
  ------------------------- */
  getProgress: async (enrollmentId) => {
    const res = await fetch(`${API_BASE_URL}/enrollments/${enrollmentId}/progress`, {
      method: 'GET',
      headers: getHeaders(),
    });

    return handleResponse(res);
  },

  /* -------------------------
     SUBMIT CHECKLIST ITEM
  ------------------------- */
  submitItem: async (enrollmentId, payload) => {
    /**
     * payload:
     * {
     *   moduleItemId,
     *   feedback,
     *   evidenceUrl
     * }
     */
    const res = await fetch(`${API_BASE_URL}/enrollments/${enrollmentId}/items`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    return handleResponse(res);
  },

  /* -------------------------
     RESUME ENROLLMENT
  ------------------------- */
  resume: async (enrollmentId) => {
    const res = await fetch(`${API_BASE_URL}/enrollments/${enrollmentId}/resume`, {
      method: 'POST',
      headers: getHeaders(),
    });

    return handleResponse(res);
  },

  /* -------------------------
     GET HISTORY
  ------------------------- */
  getHistory: async () => {
    const res = await fetch(`${API_BASE_URL}/enrollments/history`, {
      method: 'GET',
      headers: getHeaders(),
    });

    return handleResponse(res);
  },

  /* =========================
   ASSIGN ENROLL BY MANAGER
========================= */
  assignByManager: async ({ accountId, moduleId }) => {
    const res = await fetch(`${API_BASE_URL}/enrollments/assign`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        accountId,
        moduleId,
      }),
    });

    return handleResponse(res);
  },
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://localhost:7118/api/v1";

const handleResponse = async (res) => {
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Error");
  return json.data;
};

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const submissionAPI = {
  // GET LIST
  getSubmissions: async () => {
    const res = await fetch(`${API_BASE_URL}/submissions`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // GET DETAIL
  getSubmissionDetail: async (id) => {
    const res = await fetch(
      `${API_BASE_URL}/submissions/${id}`,
      { headers: getHeaders() }
    );
    return handleResponse(res);
  },

  // REVIEW (APPROVE / REJECT) 🔥 SATU-SATUNYA
  reviewSubmission: async (id, payload) => {
    const res = await fetch(
      `${API_BASE_URL}/submissions/${id}/review`,
      {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      }
    );
    return handleResponse(res);
  },
};

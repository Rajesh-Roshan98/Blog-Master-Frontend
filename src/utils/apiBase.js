// Utility to get the backend API base URL from environment or fallback
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
export default API_BASE_URL;

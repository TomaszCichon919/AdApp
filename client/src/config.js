export const API_URL = process.env.NODE_ENV === 'error' ? '/' : 'http://localhost:8000';
export const IMGS_URL = (process.env.NODE_ENV === 'production') ? '/uploads/' : 'http://localhost:8000/uploads/';
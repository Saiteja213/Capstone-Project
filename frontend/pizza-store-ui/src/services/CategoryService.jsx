import axios from "axios";

const API = "http://localhost:8082/api/categories";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }
});

export const getCategories = () => axios.get(API);

export const addCategory = (category) =>
  axios.post(API, category, getAuthHeader());

export const updateCategory = (id, category) =>
  axios.put(`${API}/${id}`, category, getAuthHeader());

export const deleteCategory = (id) =>
  axios.delete(`${API}/${id}`, getAuthHeader());
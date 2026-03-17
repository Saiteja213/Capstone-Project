import axios from "axios";

const API = "http://localhost:8082/api/menu";

const getAuthHeader = () => {
  const token = sessionStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token?.trim()}`
    }
  };
};

// READ
export const getMenu = () => {
  return axios.get(API, getAuthHeader());
};

// CREATE
export const addMenu = (menu) => {
  return axios.post(API, menu, getAuthHeader());
};

// UPDATE
export const updateMenu = (id, menu) => {
  return axios.put(`${API}/${id}`, menu, getAuthHeader());
};

// DELETE
export const deleteMenu = (id) => {
  return axios.delete(`${API}/${id}`, getAuthHeader());
};
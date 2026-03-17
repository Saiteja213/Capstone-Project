import axios from "axios";

const API_URL="http://localhost:8081/api/admin/users";

export const getCustomers = ()=>{
const token = sessionStorage.getItem("token");

return axios.get(API_URL,{
headers:{Authorization:`Bearer ${token}`}
});
}

export const blockUser = (id)=>{
const token = sessionStorage.getItem("token");

return axios.put(`${API_URL}/${id}/block`,{},{
headers:{Authorization:`Bearer ${token}`}
});
}

export const unblockUser = (id)=>{
const token = sessionStorage.getItem("token");

return axios.put(`${API_URL}/${id}/unblock`,{},{
headers:{Authorization:`Bearer ${token}`}
});
}
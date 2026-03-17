import axios from "axios";

const BASE_URL = "http://localhost:8083/api/orders";

const authHeader = () => ({
headers:{
Authorization:`Bearer ${sessionStorage.getItem("token")}`
}
});

export const getOrders = () => {
console.log("Fetching all orders");
return axios.get(`${BASE_URL}/all`, authHeader());
};

export const getUserOrders = (email) => {
console.log("Fetching orders for user:", email);
return axios.get(`${BASE_URL}/user/${email}`, authHeader());
};

export const placeOrder = (orderData) => {
console.log("Placing order:", orderData);
return axios.post(BASE_URL, orderData, authHeader());
};

export const updateOrderStatus = (id,status) => {

console.log("Updating order:", id, "Status:", status);

return axios.put(
`${BASE_URL}/${id}/status`,
{},
{
headers:{
Authorization:`Bearer ${sessionStorage.getItem("token")}`
},
params:{ status }
}
);

};
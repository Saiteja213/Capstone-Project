import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/orders.css";
import { getUserOrders } from "../services/OrderService";

function Orders() {

const [orders,setOrders] = useState([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState(null);

useEffect(()=>{

const fetchOrders = async ()=>{

try{

const email = sessionStorage.getItem("email");
const token = sessionStorage.getItem("token");

if(!email || !token){
setError("User not logged in");
setLoading(false);
return;
}

const res = await getUserOrders(email);

setOrders(res.data || []);

}catch(err){

console.error("Error fetching orders:",err);
setError("Unable to load orders");

}finally{
setLoading(false);
}

};

fetchOrders();

const interval = setInterval(()=>{
fetchOrders();
},5000);

return ()=> clearInterval(interval);

},[]);


return(

<div>

<Navbar/>

<div className="orders-page">

<h2>My Orders</h2>

{loading && <p>Loading orders...</p>}

{error && <p className="error">{error}</p>}

{!loading && !error && orders.length === 0 && (
<p>No orders yet</p>
)}

{orders.map(order =>{

// calculations
const subtotal = order.totalAmount || 0;
const deliveryFee = 40;
const tax = Math.round(subtotal * 0.05);
const finalTotal = subtotal + deliveryFee + tax;

return(

<div key={order.orderId} className="order-card">

{/* ORDER HEADER */}
<div className="order-header">

<div className="order-id">
Order #{order.orderId}
</div>

<div className="order-date">
{new Date(order.createdAt).toLocaleString()}
</div>

</div>


{/* ORDER ITEMS */}
<div className="order-items">

{order.orderItems?.length > 0 ? (

order.orderItems.map(item =>(

<p key={item.id}>

<span>{item.itemName}</span>
<span>x {item.quantity}</span>

</p>

))

) : (

<p>No items found</p>

)}

</div>


{/* ORDER PRICE DETAILS */}

<div className="order-total">

<div>Subtotal: ₹{subtotal}</div>

<div>Delivery Fee: ₹{deliveryFee}</div>

<div>Tax: ₹{tax}</div>

<div className="final-total">
Total: ₹{finalTotal}
</div>

</div>


{/* STATUS */}

<div className={`status ${order.status?.toLowerCase()}`}>

{order.status === "PENDING" && "Waiting for admin approval"}
{order.status === "PREPARING" && "Order Preparing"}
{order.status === "OUT_FOR_DELIVERY" && "Out for Delivery"}
{order.status === "DELIVERED" && "Order Delivered"}
{order.status === "REJECTED" && "Order Cancelled"}

</div>

</div>

);

})}

</div>

</div>

);

}

export default Orders;
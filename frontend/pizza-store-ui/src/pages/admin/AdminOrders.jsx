import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../services/OrderService";
import "../../styles/AdminMenu.css";

function AdminOrders() {

const [orders,setOrders] = useState([]);
const [selectedOrder,setSelectedOrder] = useState(null);

useEffect(()=>{
loadOrders();
},[]);

const loadOrders = async ()=>{

try{

const res = await getOrders();

const sortedOrders = res.data.sort(
(a,b)=> new Date(b.createdAt) - new Date(a.createdAt)
);

setOrders(sortedOrders);

}catch(error){
console.error("Error loading orders:",error);
}

};

const updateStatus = async(id,status)=>{

try{

await updateOrderStatus(id,status);
loadOrders();

// update modal instantly
setSelectedOrder(prev=>({...prev,status}));

}catch(error){

console.error("Error updating status:",error);

}

};

return(

<div className="menu-container">

<h2 className="menu-title">Manage Orders</h2>

<div className="menu-table">

<table>

<thead>
<tr>
<th>Order ID</th>
<th>Customer Email</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{orders.map(order=>(
<tr key={order.orderId}>

<td>{order.orderId}</td>

<td>{order.userEmail}</td>

<td>{order.status}</td>

<td>

<button
className="edit-btn"
onClick={()=> setSelectedOrder(order)}
>
View Order
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>


{/* ORDER MODAL */}

{selectedOrder &&(

<div className="order-modal">

<div className="order-modal-content">

<h3>Order Summary</h3>

<hr/>

<div className="order-info">

<p><b>Order ID:</b> {selectedOrder.orderId}</p>

<p><b>Customer:</b> {selectedOrder.userEmail}</p>

<p>
<b>Created At:</b> {new Date(selectedOrder.createdAt).toLocaleString()}
</p>

</div>

<hr/>

{/* ITEMS */}

<div className="order-items">

<h4>Items Ordered</h4>

{selectedOrder.orderItems?.map(item=>(
<div key={item.id} className="order-item">

<span>{item.itemName}</span>
<span>× {item.quantity}</span>

</div>
))}

</div>

<hr/>

{/* SUMMARY */}

<div className="order-summary">

{(()=>{
const subtotal = selectedOrder.orderItems?.reduce(
(sum,item)=> sum + item.price * item.quantity,
0
) || 0;

const deliveryFee = 40;
const tax = Math.round(subtotal * 0.05);
const total = subtotal + tax + deliveryFee;

return(

<>
<p><b>Subtotal:</b> ₹{subtotal}</p>
<p><b>Delivery Fee:</b> ₹{deliveryFee}</p>
<p><b>Tax:</b> ₹{tax}</p>

<hr/>

<p><b>Total:</b> ₹{total}</p>
</>

);

})()}

<p><b>Status:</b> {selectedOrder.status}</p>

</div>


{/* ACTION BUTTONS */}

<div className="order-buttons">

{/* Pending Order */}
{selectedOrder.status === "PENDING" &&(
<>
<button
className="edit-btn"
onClick={()=> updateStatus(selectedOrder.orderId,"PREPARING")}
>
Approve
</button>

<button
className="delete-btn"
onClick={()=> updateStatus(selectedOrder.orderId,"REJECTED")}
>
Reject
</button>
</>
)}

{/* Preparing */}
{selectedOrder.status === "PREPARING" &&(
<>
<button
className="edit-btn"
onClick={()=> updateStatus(selectedOrder.orderId,"OUT_FOR_DELIVERY")}
>
Out for Delivery
</button>

<button
className="delete-btn"
onClick={()=> updateStatus(selectedOrder.orderId,"REJECTED")}
>
Cancel Order
</button>
</>
)}

{/* Out for delivery */}
{selectedOrder.status === "OUT_FOR_DELIVERY" &&(
<button
className="edit-btn"
onClick={()=> updateStatus(selectedOrder.orderId,"DELIVERED")}
>
Mark Delivered
</button>
)}

{/* Delivered */}
{selectedOrder.status === "DELIVERED" &&(
<p className="success-status">Order Delivered ✅</p>
)}

{/* Rejected */}
{selectedOrder.status === "REJECTED" &&(
<p className="rejected-status">Order Rejected ❌</p>
)}

<button onClick={()=> setSelectedOrder(null)}>
Close
</button>

</div>

</div>

</div>

)}

</div>

);

}

export default AdminOrders;
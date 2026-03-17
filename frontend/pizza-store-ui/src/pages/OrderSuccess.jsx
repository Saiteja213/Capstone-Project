import { useNavigate, useLocation } from "react-router-dom";
import "../styles/orderSuccess.css";

function OrderSuccess(){

const navigate = useNavigate();
const location = useLocation();

/* Data received from Checkout */
const items = location.state?.items || [];
const total = location.state?.total || 0;
const address = location.state?.address || "Address not available";
const phone = location.state?.phone || "";

/* Random order id for UI */
const orderId = Math.floor(Math.random()*90000)+10000;

return(

<div className="success-container">

<div className="success-card">

<div className="icon">📦</div>

<h2>Order Received!</h2>

<p className="subtitle">
Your order has been placed and is currently 
<b> waiting for admin approval.</b>
</p>

<p className="subtitle">
We will confirm your order shortly.
</p>

<h3 className="summary-title">Order Summary</h3>

<div className="summary">

<div className="row">
<span>Order ID:</span>
<span>{orderId}</span>
</div>

<div className="row">
<span>Items Ordered:</span>

<span>
{items.map(item => (
<div key={item.menuId}>
{item.name} × {item.quantity}
</div>
))}
</span>

</div>

<div className="row">
<span>Total:</span>
<span>₹{total}</span>
</div>

<div className="row">
<span>Status:</span>
<span className="pending">Waiting for Admin Approval</span>
</div>

<div className="row">
<span>Estimated Delivery Time:</span>
<span>Will update after approval</span>
</div>

<div className="row">
<span>Delivery Address:</span>
<span>{address}</span>
</div>

<div className="row">
<span>Phone:</span>
<span>{phone}</span>
</div>

<div className="row">
<span>Payment Method:</span>
<span>Cash on Delivery</span>
</div>

</div>


<button
className="home-btn"
onClick={()=>navigate("/home")}
>
🏠 Back to Home
</button>

<button
className="home-btn"
onClick={()=>navigate("/orders")}
>
📦 View My Orders
</button>


<div className="links">

<a href="#">Need Help? Contact Us</a>

<a href="#">Reorder This</a>

</div>

</div>

</div>

)

}

export default OrderSuccess;
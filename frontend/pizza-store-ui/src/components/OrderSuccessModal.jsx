import "../styles/orderSuccessModal.css";

function OrderSuccessModal({ show, orderId, items, address, phone, onClose }) {

if (!show) return null;

// Calculate subtotal from items
const subtotal = items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

// same values used in backend
const deliveryFee = 40;

// tax 5%
const tax = Math.round(subtotal * 0.05);

// final total
const finalTotal = subtotal + deliveryFee + tax;

return (

<div className="modal-overlay">
<div className="modal-box">

<div className="success-icon">📦</div>

<h2>Order Received!</h2>

<p className="subtitle">
Your order <b>#{orderId}</b> has been placed and is waiting for admin approval.
</p>

<h3 className="summary-title">Order Summary</h3>

<div className="summary">

<div className="row">
<span>Order ID</span>
<span>{orderId}</span>
</div>

<div className="row items">
<span>Items</span>

<span>
{items.map(item => (
<div key={item.menuId}>
{item.name} × {item.quantity}
</div>
))}
</span>
</div>

<div className="row">
<span>Subtotal</span>
<span>₹{subtotal}</span>
</div>

<div className="row">
<span>Delivery Fee</span>
<span>₹{deliveryFee}</span>
</div>

<div className="row">
<span>Tax</span>
<span>₹{tax}</span>
</div>

<div className="row total">
<span>Total</span>
<span>₹{finalTotal}</span>
</div>

<div className="row">
<span>Status</span>
<span className="status">Waiting for Admin Approval</span>
</div>

<div className="row">
<span>Delivery Address</span>
<span>{address}</span>
</div>

<div className="row">
<span>Phone</span>
<span>{phone}</span>
</div>

<div className="row">
<span>Payment</span>
<span>Cash on Delivery</span>
</div>

</div>

<button className="view-orders-btn" onClick={onClose}>
View My Orders
</button>

</div>
</div>

);

}

export default OrderSuccessModal;
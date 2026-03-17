import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/OrderService";
import Navbar from "../components/Navbar";
import "../styles/cart.css";

function Cart(){

const { cartItems, increaseQuantity, decreaseQuantity, clearCart } =
useContext(CartContext);

const navigate = useNavigate();

const [location,setLocation] = useState("");
const [phone,setPhone] = useState("");
const [loading,setLoading] = useState(false);


// BILL CALCULATION
const subtotal = cartItems.reduce(
(sum,item)=> sum + item.price * item.quantity,0
);

const deliveryFee = 40;
const tax = Math.round(subtotal * 0.05);
const total = subtotal + deliveryFee + tax;


// PLACE ORDER
const handleOrder = async () => {

if(location.trim()===""){
alert("Enter delivery address");
return;
}

if(!/^[0-9]{10}$/.test(phone)){
alert("Enter valid phone number");
return;
}

if(cartItems.length === 0){
alert("Cart is empty");
return;
}

const email = sessionStorage.getItem("email");

const orderData = {
userEmail: email,
status:"PENDING",
items: cartItems.map(item => ({
menuId:item.menuId,
name:item.name,
quantity:item.quantity,
price:item.price
}))
};

try{

setLoading(true);

await placeOrder(orderData);

navigate("/order-success",{
state:{
items:cartItems,
total,
address:location,
phone
}
});

clearCart();

}catch(err){

alert("Order failed");

}finally{

setLoading(false);

}

};


return(

<div>

<Navbar/>

<div className="cart-container">

<h2 className="title">My Cart</h2>

<div className="cart-layout">


{/* ================= LEFT : CART ITEMS ================= */}

<div className="cart-items">

{cartItems.length === 0 && <p>Your cart is empty</p>}

{cartItems.map(item => (

<div className="cart-card" key={item.menuId}>

<div className="cart-info">

<h3>{item.name}</h3>
<p>{item.description}</p>

</div>

<div className="cart-right">

<div className="qty-box">

<button
onClick={()=>decreaseQuantity(item.menuId)}
disabled={item.quantity===0}
>
-
</button>

<span>{item.quantity}</span>

<button
onClick={()=>increaseQuantity(item.menuId)}
disabled={item.quantity===4}
>
+
</button>

</div>

<div className="item-total">
₹{item.price * item.quantity}
</div>

</div>

</div>

))}

</div>



{/* ================= RIGHT : CHECKOUT FORM ================= */}

<div className="checkout-box">

<h3>Delivery Details</h3>

<label>Location</label>

<input
type="text"
placeholder="Enter delivery address"
value={location}
onChange={(e)=>setLocation(e.target.value)}
/>

<label>Phone Number</label>

<input
type="text"
placeholder="Enter 10 digit mobile number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>


<h3 className="summary-title">Order Summary</h3>

{cartItems.map(item => (

<div className="summary-row" key={item.menuId}>
<span>{item.name} × {item.quantity}</span>
<span>₹{item.price * item.quantity}</span>
</div>

))}


<div className="summary-row">
<span>Subtotal</span>
<span>₹{subtotal}</span>
</div>

<div className="summary-row">
<span>Delivery Fee</span>
<span>₹{deliveryFee}</span>
</div>

<div className="summary-row">
<span>Tax</span>
<span>₹{tax}</span>
</div>

<div className="summary-row total">
<span>Total</span>
<span>₹{total}</span>
</div>


<button
className="place-order-btn"
onClick={handleOrder}
disabled={loading}
>
{loading ? "Placing Order..." : "Place Order"}
</button>

</div>

</div>

</div>

</div>

);

}

export default Cart;
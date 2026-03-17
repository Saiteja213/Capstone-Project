import { useNavigate } from "react-router-dom";
import { FaHistory, FaShoppingCart, FaUser, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import "../styles/navbar.css";

function Navbar({ cartCount = 0, handleLogout, search, setSearch }) {

const navigate = useNavigate();
const username = sessionStorage.getItem("username") || "User";

const [dropdownOpen,setDropdownOpen] = useState(false);

return (

<header className="navbar">

{/* LOGO */}

<div
className="logo-container"
onClick={(e)=>{
e.stopPropagation();
navigate("/home");
}}
>

<div className="logo-icon">P</div>

<span className="logo-text">Pizzeria</span>

</div>


{/* SEARCH */}

<div className="nav-center">

<input
className="search-bar"
placeholder="Search food..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>


{/* RIGHT SECTION */}

<div className="nav-right">


{/* ORDERS */}

<button
className="orders-btn"
onClick={(e)=>{
e.stopPropagation();
navigate("/orders");
}}
>

<FaHistory className="orders-icon"/>

<span>Orders</span>

</button>


{/* CART */}

<div
className="nav-cart"
onClick={(e)=>{
e.stopPropagation();
navigate("/cart");
}}
>

<div className="cart-icon-wrapper">

<FaShoppingCart className="cart-icon"/>

{cartCount > 0 && (
<span className="cart-badge">{cartCount}</span>
)}

</div>

<span className="cart-text">Cart</span>

</div>


{/* USER */}

<div
className="user-section"
onClick={(e)=>{
e.stopPropagation();
setDropdownOpen(!dropdownOpen);
}}
>

<FaUser/>

<span>{username}</span>

<FaChevronDown className="dropdown-icon"/>


{dropdownOpen && (

<div className="user-dropdown">

<div onClick={()=>navigate("/settings")}>
Profile & Settings
</div>

<div onClick={handleLogout}>
Logout
</div>

</div>

)}

</div>

</div>

</header>

);

}

export default Navbar;
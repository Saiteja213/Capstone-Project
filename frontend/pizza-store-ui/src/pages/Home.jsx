import { useEffect, useState, useContext } from "react";
import { getMenu } from "../services/MenuService";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { categoryImages } from "../utils/categoryImages";
import menuImages from "../utils/menuImages";

function Home(){

const [menu,setMenu] = useState([]);
const [categories,setCategories] = useState([]);
const [selectedCategory,setSelectedCategory] = useState("");
const [search,setSearch] = useState("");

const { cartItems, addToCart, increaseQuantity, decreaseQuantity, cartCount } =
useContext(CartContext);

const navigate = useNavigate();


const handleLogout = () => {
sessionStorage.removeItem("token");
sessionStorage.removeItem("username");
navigate("/");
};


useEffect(()=>{

loadMenu();

const token = sessionStorage.getItem("token");

if(token){
const decoded = jwtDecode(token);
sessionStorage.setItem("username", decoded.fullName);
}

},[]);



const loadMenu = async ()=>{

const res = await getMenu();
const menuData = res.data;

setMenu(menuData);

const uniqueCategories = [
...new Set(menuData.map(item => item.category.categoryName))
];

setCategories(uniqueCategories);
setSelectedCategory(uniqueCategories[0]);

};



const filteredMenu = menu
.filter(item =>
item.name.toLowerCase().includes(search.toLowerCase())
)
.filter(item =>
item.category.categoryName === selectedCategory
);



return(

<div>

{/* NAVBAR */}

<Navbar
cartCount={cartCount}
handleLogout={handleLogout}
search={search}
setSearch={setSearch}
/>


<div className="home-content">


{/* PROMO BANNER */}

<div className="promo-banner">

<div className="promo-text">

<h2>🔥 Flat 40% OFF on Your First Order</h2>

<p>Hot pizzas, burgers and desserts delivered fresh</p>

<button>Order Now</button>

</div>

</div>



{/* CATEGORY SECTION */}

<div className="category-section">

<h2 className="category-title">
Hello, What's on your mind?
</h2>


<div className="category-grid">

{categories.map(cat => (

<div
key={cat}
className={`category-card ${selectedCategory === cat ? "active-category" : ""}`}
onClick={()=>setSelectedCategory(cat)}
>

<img
src={categoryImages[cat]}
alt={cat}
/>

<p>{cat}</p>

</div>

))}

</div>

</div>



{/* MENU GRID */}

<div className="menu-grid">

{filteredMenu.map(item=>{

const existing = cartItems.find(i=>i.menuId===item.menuId);

return(

<div key={item.menuId} className="menu-card">

<img
src={menuImages[item.name]}
alt={item.name}
/>

<div className="menu-info">

<div className="menu-left">

<h3>{item.name}</h3>

<p>{item.description}</p>

</div>


<div className="menu-right">

<h4>₹{item.price}</h4>


{existing ? (

<div className="qty-controls">

<button onClick={()=>decreaseQuantity(item.menuId)}>
-
</button>

<span>{existing.quantity}</span>

<button onClick={()=>increaseQuantity(item.menuId)}>
+
</button>

</div>

):( 

<button onClick={()=>addToCart(item)}>
Add
</button>

)}

</div>

</div>

</div>

)

})}

</div>


</div>

</div>

)

}

export default Home;
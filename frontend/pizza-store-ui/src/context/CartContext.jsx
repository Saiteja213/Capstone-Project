import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

const [cartItems,setCartItems] = useState([]);


/* ADD ITEM TO CART */

const addToCart = (item) => {

const existing = cartItems.find(i => i.menuId === item.menuId);

if(existing){
setCartItems(cartItems.map(i =>
i.menuId === item.menuId
? {...i, quantity: i.quantity + 1}
: i
));
}else{
setCartItems([...cartItems,{...item,quantity:1}]);
}

};


/* INCREASE QUANTITY */

const increaseQuantity = (menuId) => {

setCartItems(cartItems.map(item => {

if(item.menuId === menuId){

if(item.quantity >= 4){
alert("Max limit is 4");
return item;
}

return {...item, quantity: item.quantity + 1};

}

return item;

}));

};


/* DECREASE QUANTITY */

const decreaseQuantity = (menuId) => {

setCartItems(cartItems
.map(item =>
item.menuId === menuId
? {...item,quantity:item.quantity-1}
: item
)
.filter(item => item.quantity > 0)
);

};


/* CLEAR CART AFTER ORDER */

const clearCart = () => {
setCartItems([]);
};


/* TOTAL CART COUNT */

const cartCount = cartItems.reduce((a,b)=>a+b.quantity,0);


return(

<CartContext.Provider
value={{
cartItems,
addToCart,
increaseQuantity,
decreaseQuantity,
clearCart,     // added here
cartCount
}}
>

{children}

</CartContext.Provider>

);

};
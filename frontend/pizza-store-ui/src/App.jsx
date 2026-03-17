import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import User from "./pages/User";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminOrders from "./pages/admin/AdminOrders";

import AdminLayout from "./components/AdminLayout";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";

import Checkout from "./pages/CheckOut";
import OrderSuccess from "./pages/OrderSuccess";
import UserSettings from "./pages/UserSettings";

function App() {

return (

<BrowserRouter>

<Routes>

{/* Auth */}
<Route path="/" element={<Login />} />
<Route path="/register" element={<Register />} />

{/* User Pages */}
<Route path="/home" element={<Home />} />
<Route path="/cart" element={<Cart />} />
<Route path="/orders" element={<Orders />} />
<Route path="/user" element={<User />} />

<Route path="/checkout" element={<Checkout />} />
<Route path="/order-success" element={<OrderSuccess />} />

<Route path="/settings" element={<UserSettings />} />

{/* Admin Routes */}
<Route path="/admin" element={<AdminLayout />}>

<Route path="dashboard" element={<AdminDashboard />} />

<Route path="menu" element={<AdminMenu />} />

<Route path="categories" element={<AdminCategory />} />

<Route path="orders" element={<AdminOrders />} />

<Route path="customers" element={<AdminCustomers />} />

<Route path="reports" element={<AdminReports />} />

<Route path="settings" element={<AdminSettings />} />

</Route>

</Routes>

</BrowserRouter>

);

}

export default App;
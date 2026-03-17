import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

import { FaBars, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { MdDashboard, MdRestaurantMenu } from "react-icons/md";
import { FaFolder, FaUsers } from "react-icons/fa";
import { BsReceipt } from "react-icons/bs";
import { HiChartBar } from "react-icons/hi";

import "../styles/AdminLayout.css";

function AdminLayout() {

const navigate = useNavigate();

const [collapsed,setCollapsed] = useState(false);
const [dropdownOpen,setDropdownOpen] = useState(false);

const handleLogout = ()=>{
sessionStorage.removeItem("token");
navigate("/");
};

const linkClass = ({isActive}) =>
isActive ? "menu-link active-link" : "menu-link";

return(

<div className={`admin-container ${collapsed ? "collapsed":""}`}>

{/* SIDEBAR */}

<div className="sidebar">

<div className="logo">
<span className="logo-box">🍕</span>
<span className="logo-text">
{collapsed ? "" : "Admin"}
</span>
</div>

<ul>

<li>
<NavLink to="/admin/dashboard" className={linkClass}>
<MdDashboard className="icon"/>
{!collapsed && "Dashboard"}
</NavLink>
</li>

<li>
<NavLink to="/admin/menu" className={linkClass}>
<MdRestaurantMenu className="icon"/>
{!collapsed && "Menu"}
</NavLink>
</li>

<li>
<NavLink to="/admin/categories" className={linkClass}>
<FaFolder className="icon"/>
{!collapsed && "Categories"}
</NavLink>
</li>

<li>
<NavLink to="/admin/orders" className={linkClass}>
<BsReceipt className="icon"/>
{!collapsed && "Orders"}
</NavLink>
</li>

<li>
<NavLink to="/admin/customers" className={linkClass}>
<FaUsers className="icon"/>
{!collapsed && "Customers"}
</NavLink>
</li>

<li>
<NavLink to="/admin/reports" className={linkClass}>
<HiChartBar className="icon"/>
{!collapsed && "Reports"}
</NavLink>
</li>

</ul>

</div>

{/* MAIN */}

<div className="main">

{/* TOPBAR */}

<div className="topbar">

<button
className="hamburger"
onClick={()=>setCollapsed(!collapsed)}
>
<FaBars/>
</button>

<div
className="admin-user"
onClick={()=>setDropdownOpen(!dropdownOpen)}
>

<FaUserCircle className="user-icon"/>

<span>Admin</span>

<FaChevronDown className="dropdown-icon"/>

{dropdownOpen && (

<div className="admin-dropdown">


<NavLink to="/admin/settings"> Profile & Settings</NavLink>

<button onClick={handleLogout}>Logout</button>

</div>

)}

</div>

</div>

{/* PAGE CONTENT */}

<div className="content">
<Outlet/>
</div>

</div>

</div>

);

}

export default AdminLayout;
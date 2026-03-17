import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AdminReports.css";

function AdminReports(){

// =====================================
// BASE URL FOR ORDER SERVICE
// (Change port if your order-service
// runs on a different port)
// =====================================

const API_BASE = "http://localhost:8083";

// =====================================
// STATE VARIABLES
// =====================================

const [dailySales,setDailySales] = useState(0);        // today's sales
const [monthlySales,setMonthlySales] = useState([]);   // monthly revenue data
const [revenue,setRevenue] = useState(0);              // total revenue
const [topPizza,setTopPizza] = useState([]);           // top selling pizzas
const [orderTrends,setOrderTrends] = useState([]);     // orders per day
const [totalOrders,setTotalOrders] = useState(0);      // total number of orders

// =====================================
// LOAD REPORT DATA WHEN PAGE LOADS
// =====================================

useEffect(()=>{
loadReports();
},[]);

// =====================================
// FUNCTION TO FETCH REPORT DATA
// =====================================

const loadReports = async ()=>{

try{

// get JWT token stored during login
const token = sessionStorage.getItem("token");

// attach token in Authorization header
const headers = {
Authorization:`Bearer ${token}`
};

// =====================================
// DAILY SALES
// =====================================

const daily = await axios.get(
`${API_BASE}/api/orders/reports/daily-sales`,
{headers}
);

setDailySales(daily.data || 0);

// =====================================
// MONTHLY SALES
// =====================================

const monthly = await axios.get(
`${API_BASE}/api/orders/reports/monthly-sales`,
{headers}
);

setMonthlySales(monthly.data || []);

// =====================================
// TOTAL REVENUE
// =====================================

const revenueRes = await axios.get(
`${API_BASE}/api/orders/reports/revenue`,
{headers}
);

setRevenue(revenueRes.data || 0);

// =====================================
// TOP SELLING PIZZA
// =====================================

const pizzaRes = await axios.get(
`${API_BASE}/api/orders/reports/top-pizza`,
{headers}
);

setTopPizza(pizzaRes.data || []);

// =====================================
// ORDER TRENDS (ORDERS PER DAY)
// =====================================

const trendsRes = await axios.get(
`${API_BASE}/api/orders/reports/order-trends`,
{headers}
);

setOrderTrends(trendsRes.data || []);

// =====================================
// TOTAL ORDERS CALCULATION
// =====================================

const total = trendsRes.data.reduce((sum,o)=>sum+o[1],0);

setTotalOrders(total);

}
catch(error){

// log error in console
console.error("Error loading reports:",error);

}

};

// =====================================
// CALCULATIONS
// =====================================

// average order value
const avgOrderValue = totalOrders
? Math.round(revenue / totalOrders)
: 0;

// maximum pizza sales (used for progress bar)
const maxPizza = topPizza.length
? topPizza[0][1]
: 0;

// =====================================
// UI
// =====================================

return(

<div className="reports-container">

<h2 className="page-title">Reports & Analytics</h2>
<p className="page-sub">Performance at a glance</p>

{/* ===================================== */
/* KPI CARDS */
/* ===================================== */}

<div className="kpi-row">

<div className="kpi">
<p>Total Revenue</p>
<h3>₹{revenue}</h3>
<span className="up">↑ This month</span>
</div>

<div className="kpi">
<p>Daily Sales</p>
<h3>₹{dailySales}</h3>
<span>{dailySales ? "Today's revenue" : "No orders today"}</span>
</div>

<div className="kpi">
<p>Total Orders</p>
<h3>{totalOrders}</h3>
<span>Orders processed</span>
</div>

<div className="kpi">
<p>Avg Order Value</p>
<h3>₹{avgOrderValue}</h3>
<span className="up">Avg per order</span>
</div>

</div>

{/* ===================================== */
/* ORDER TRENDS CHART */
/* ===================================== */}

<div className="chart-card">

<h3>Order Trends</h3>

<div className="chart">

{(() => {

// find max orders to scale chart bars
const maxOrders = Math.max(...orderTrends.map(o => o[1]),1);

return orderTrends.map((o,i)=>{

const height = (o[1] / maxOrders) * 180;

return(

<div key={i} className="bar-wrapper">

<span>{o[1]}</span>

<div
className="bar"
style={{height:`${height}px`}}
></div>

<p>{o[0]}</p>

</div>

);

});

})()}

</div>

</div>

{/* ===================================== */
/* MONTHLY REVENUE TABLE */
/* ===================================== */}

<div className="table-card">

<h3>Monthly Revenue</h3>

<table>

<thead>
<tr>
<th>Month</th>
<th>Revenue</th>
<th>Orders</th>
</tr>
</thead>

<tbody>

{monthlySales.map((m,i)=>{

// calculate orders in that month
const ordersCount = orderTrends
.filter(o => new Date(o[0]).getMonth()+1 === m[0])
.reduce((sum,o)=>sum+o[1],0);

return(

<tr key={i}>

<td className="month-cell">
{new Date(2025,m[0]-1).toLocaleString("default",{month:"long"})}
</td>

<td className="accent">₹{m[1]}</td>

<td>{ordersCount}</td>

</tr>

);

})}

</tbody>

</table>

</div>

{/* ===================================== */
/* TOP SELLING ITEMS */
/* ===================================== */}

<div className="table-card">

<h3>Top Selling Items</h3>

<table>

<thead>
<tr>
<th>Rank</th>
<th>Item Name</th>
<th>Units Sold</th>
<th>Share</th>
</tr>
</thead>

<tbody>

{topPizza.map((p,i)=>{

// progress bar percentage
const percent = maxPizza ? (p[1]/maxPizza)*100 : 0;

return(

<tr key={i}>

<td>
<span className="rank">{i+1}</span>
</td>

<td className="item-name">
{p[0]}
</td>

<td>{p[1]}</td>

<td>

<div className="progress">

<div
className="progress-bar"
style={{width:`${percent}%`}}
></div>

</div>

</td>

</tr>

);

})}

</tbody>

</table>

</div>

</div>

);

}

export default AdminReports;

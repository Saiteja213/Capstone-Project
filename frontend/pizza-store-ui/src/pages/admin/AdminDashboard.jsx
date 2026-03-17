import { useEffect, useState } from "react";
import { getMenu } from "../../services/MenuService";
import { getOrders } from "../../services/OrderService";
import "../../styles/AdminDashboard.css";

function AdminDashboard() {

  // ================================
  // STATE VARIABLES
  // ================================
  const [menuCount, setMenuCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [ordersToday, setOrdersToday] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [topPizza, setTopPizza] = useState("N/A");

  useEffect(() => {

    // ================================
    // FETCH MENU ITEMS
    // ================================
    getMenu().then((res) => {
      setMenuCount(res.data.length);
    });

    // ================================
    // FETCH ORDERS
    // ================================
    getOrders().then((res) => {

      const allOrders = res.data;
      setOrders(allOrders);

      const today = new Date().toDateString();

      // ================================
      // ORDERS TODAY
      // ================================
      const todayOrders = allOrders.filter(
        (order) => new Date(order.createdAt).toDateString() === today
      );

      setOrdersToday(todayOrders.length);

      // ================================
      // PENDING ORDERS
      // ================================
      const pending = allOrders.filter(
        (order) => order.status === "PENDING"
      );

      setPendingOrders(pending.length);

      // ================================
      // TOTAL REVENUE
      // ================================
      const totalRevenue = allOrders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
      );

      setRevenue(totalRevenue);

      // ================================
      // CUSTOMERS COUNT
      // ================================
      const uniqueCustomers = new Set(
        allOrders.map((order) => order.userEmail)
      );

      setCustomersCount(uniqueCustomers.size);

// ================================
// TOP SELLING PIZZA
// ================================

const pizzaSales = {};

allOrders.forEach((order) => {
  order.orderItems?.forEach((item) => {

    // skip null or empty names
    if (!item.itemName) return;

    const name = item.itemName;

    if (!pizzaSales[name]) {
      pizzaSales[name] = 0;
    }

    pizzaSales[name] += item.quantity;

  });
});

let maxPizza = "";
let maxCount = 0;

for (let pizza in pizzaSales) {
  if (pizzaSales[pizza] > maxCount) {
    maxCount = pizzaSales[pizza];
    maxPizza = pizza;
  }
}


// fallback pizzas if none found
const fallbackPizzas = [
  "Farmhouse Pizza",
  "Margherita Pizza",
  "Mexican Green Wave Pizza",
  "Veggie Delight Pizza",
  "Paneer Tikka Pizza"
];

if (!maxPizza) {
  maxPizza = fallbackPizzas[0]; // default instead of random
}

setTopPizza(maxPizza);

    });

  }, []);

  return (

    <div className="dashboard">

      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h3>Total Menu Items</h3>
          <p>{menuCount}</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div className="card">
          <h3>Total Orders Today</h3>
          <p>{ordersToday}</p>
        </div>

        <div className="card">
          <h3>Pending Orders</h3>
          <p>{pendingOrders}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹{revenue}</p>
        </div>

        <div className="card">
          <h3>Customers Count</h3>
          <p>{customersCount}</p>
        </div>

        <div className="card">
          <h3>Popular Pizza</h3>
          <p>{topPizza}</p>
        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;
import { useEffect, useState } from "react";
import { getCustomers, blockUser, unblockUser } from "../../services/UserService";
import "../../styles/AdminMenu.css"; // reuse same admin styling

function AdminCustomers(){

// store customer list
const [customers,setCustomers] = useState([]);


// load customers when page loads
useEffect(()=>{
loadCustomers();
},[])


// fetch customers from backend
const loadCustomers = async ()=>{
const res = await getCustomers();
setCustomers(res.data);
}


// block user
const handleBlock = async(id)=>{

if(!window.confirm("Block this customer?")) return;

await blockUser(id);
loadCustomers();

}


// unblock user
const handleUnblock = async(id)=>{

await unblockUser(id);
loadCustomers();

}


return(

<div className="menu-container">

<h2 className="menu-title">Manage Customers</h2>

<div className="menu-table">

<table>

<thead>

<tr>
<th>ID</th>
<th>Email</th>
<th>Status</th>
<th>Action</th>
</tr>

</thead>


<tbody>

{customers.map(c=>(

<tr key={c.userId}>

<td>{c.userId}</td>

<td>{c.email}</td>

{/* customer status */}
<td>
{c.blocked ? (
<span style={{color:"red",fontWeight:"bold"}}>Blocked</span>
):(
<span style={{color:"green",fontWeight:"bold"}}>Active</span>
)}
</td>


<td className="action-buttons">

{/* block/unblock button */}

{c.blocked ? (

<button
className="edit-btn"
onClick={()=>handleUnblock(c.userId)}
>
Unblock
</button>

):(

<button
className="delete-btn"
onClick={()=>handleBlock(c.userId)}
>
Block
</button>

)}

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}

export default AdminCustomers;
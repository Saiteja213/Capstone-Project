import { useEffect, useState } from "react";
import { getMenu, addMenu, updateMenu, deleteMenu } from "../../services/MenuService";
import { getCategories } from "../../services/CategoryService";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/AdminMenu.css";

function AdminMenu() {

const [menus,setMenu] = useState([]);
const [categories,setCategories] = useState([]);

const [name,setName] = useState("");
const [price,setPrice] = useState("");
const [description,setDescription] = useState("");
const [categoryId,setCategoryId] = useState("");
const [image,setImage] = useState(null);

const [editId,setEditId] = useState(null);
const [showForm,setShowForm] = useState(false);

const [search,setSearch] = useState("");
const [filterCategory,setFilterCategory] = useState("");


useEffect(()=>{

loadMenu();
loadCategories();

},[]);


const loadMenu = async ()=>{

try{

const res = await getMenu();
setMenu(res.data);

}catch(error){

console.error(error);

}

}


const loadCategories = async ()=>{

try{

const res = await getCategories();
setCategories(res.data);

}catch(error){

console.error(error);

}

}


const openAddForm = ()=>{

setName("");
setPrice("");
setDescription("");
setCategoryId("");
setImage(null);
setEditId(null);

setShowForm(true);

}


const handleAddPizza = async ()=>{

const pizza = {

name,
description,
price:Number(price),
categoryId

};

try{

if(editId){

await updateMenu(editId,pizza);

}else{

await addMenu(pizza);

}

loadMenu();
setShowForm(false);

}catch(error){

console.error(error);

}

}


const handleDelete = async(id)=>{

if(window.confirm("Delete this pizza?")){

await deleteMenu(id);
loadMenu();

}

}


const handleEdit = (item)=>{

setName(item.name);
setPrice(item.price);
setDescription(item.description);
setCategoryId(item.category.categoryId);
setEditId(item.menuId);

setShowForm(true);

}


const filteredMenus = menus.filter(menu=>{

const matchesSearch =
menu.name.toLowerCase().includes(search.toLowerCase());

const matchesCategory =
filterCategory === "" ||
menu.category?.categoryId == filterCategory;

return matchesSearch && matchesCategory;

});


return(

<div className="menu-container">


<div className="menu-top-bar">

<h2 className="menu-title">Manage Menu</h2>

<div className="menu-actions">

<input
type="text"
placeholder="Search pizza..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<select
value={filterCategory}
onChange={(e)=>setFilterCategory(e.target.value)}
>
<option value="">All Categories</option>

{categories.map(cat => (
<option key={cat.categoryId} value={cat.categoryId}>
{cat.categoryName}
</option>
))}

</select>

<button className="add-btn" onClick={openAddForm}>
+ Add Item
</button>

</div>

</div>


{/* TABLE */}

<div className="menu-table">

<table>

<thead>

<tr>
<th>Name</th>
<th>Description</th>
<th>Price</th>
<th>Category</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{filteredMenus.map(menu => (

<tr key={menu.menuId}>

<td>{menu.name}</td>

<td>{menu.description}</td>

<td>₹{menu.price}</td>

<td>
{menu.category ? menu.category.categoryName : "N/A"}
</td>

<td className="action-buttons">

<button
className="edit-btn"
onClick={()=>handleEdit(menu)}
>
<FaEdit/>
</button>

<button
className="delete-btn"
onClick={()=>handleDelete(menu.menuId)}
>
<FaTrash/>
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>


{/* MODAL */}

{showForm &&(

<div className="menu-modal">

<div className="menu-modal-content">

<h3>{editId ? "Edit Item" : "Add Item"}</h3>

<input
type="text"
placeholder="Pizza Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="text"
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<input
type="number"
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>


<select
value={categoryId}
onChange={(e)=>setCategoryId(e.target.value)}
>

<option value="">Select Category</option>

{categories.map(cat => (

<option key={cat.categoryId} value={cat.categoryId}>
{cat.categoryName}
</option>

))}

</select>


<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}
/>


{image &&(

<img
className="preview-img"
src={URL.createObjectURL(image)}
alt="preview"
/>

)}


<div className="modal-buttons">

<button
className="edit-btn"
onClick={handleAddPizza}
>
{editId ? "Update Item" : "Add Item"}
</button>

<button
className="delete-btn"
onClick={()=>setShowForm(false)}
>
Cancel
</button>

</div>

</div>

</div>

)}

</div>

)

}

export default AdminMenu;
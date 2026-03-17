import margherita from "../assets/margherita-pizza.jpg";

function FoodCard({ item }) {

  const imageMap = {
    1: margherita
  };

  return (
    <div className="menu-card">

      <img src={imageMap[item.menuId]} alt={item.name} />

      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <h4>₹{item.price}</h4>

    </div>
  );
}

export default FoodCard;
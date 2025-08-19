import MenuDelete from "../MenuDelete/MenuDelete"
const MenuItem = ({ item, onAddToCart }) => {
  return (
    <div>
      <h3>{item.item}</h3>
      <p>{item.description}</p>
      <p>${item.price}</p>
      <button onClick={() => onAddToCart(item)}>Add to Cart</button>
      <MenuDelete itemId= {item._id} getAllItems ={getAllItems} />
    </div>
  )
}

export default MenuItem
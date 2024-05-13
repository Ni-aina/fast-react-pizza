import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {

  const totalQuantity = useSelector(getTotalCartQuantity);
  const totalPrice = useSelector(getTotalCartPrice);

  if (!totalPrice) return null;

  return (
    <div className="
      flex
      items-center
      justify-between
      bg-stone-800 
      text-sm px-4 
      py-4 
      text-stone-200 
      uppercase 
      sm:px-6 
      md:text-base
    ">
      <p className="space-x-4 sm:space-x-6 font-semibold text-stone-300">
        <span>{ totalQuantity } pizzas</span>
        <span>{ formatCurrency(totalPrice) }</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

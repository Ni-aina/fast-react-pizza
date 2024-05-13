import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const { 
    username,
    status: statusAddress,
    position,
    address,
    error: errorAddress
  } = useSelector(state => state.userReducer);
  const isLoading = statusAddress === "loading";
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const errorForms = useActionData();

  const cart = useSelector(getCart);
  if (!cart.length) return <EmptyCart />

  const dispatch = useDispatch();
  const price = useSelector(getTotalCartPrice);
  const priority = withPriority ? price * 0.2 : 0;
  const totalPrice = price + priority;

  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input 
              type="text" 
              name="customer"
              defaultValue={username}
              className="input"
              required 
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input 
              type="tel" 
              name="phone" 
              className="input"
              required 
            />
            { errorForms?.phone && 
              <p className="mt-2 text-xs bg-red-100 rounded-full text-red-700 py-3 px-4">{ errorForms.phone }</p>
            }
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input 
              type="text" 
              name="address" 
              className="input"
              disabled={isLoading}
              defaultValue={address}
              required 
            />
            { statusAddress === "error" && 
              <p className="mt-2 text-xs bg-red-100 rounded-full text-red-700 py-3 px-4">{ errorAddress }</p>
            }
          </div>
          {
            !position.latitude && !position.longitude &&
            <span className="absolute top-[-10px] right-[3px] sm:top-[3px] md:top-[4px] md:right-[5px]">
              <Button 
                disabled={isLoading}
                type="small" 
                onClick={(e)=> {
                e.preventDefault();
                dispatch(fetchAddress());
              }}>Get Position</Button>
            </span>
          }
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="
              h-6 w-6 
              accent-yellow-400 
              focus:outline-none
              focus:ring
              focus:ring-yellow-400
              focus:ring-offset-2
            "
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button
            disabled={isSubmitting || isLoading}
            type="primary"
          >
            { isSubmitting ? "Pacing order ..." : `Order now from ${formatCurrency(totalPrice)}` }
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true"
  }

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please give us your correct pone number, we might need it to connect you.";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

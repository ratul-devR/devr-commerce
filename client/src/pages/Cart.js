import "../styles/Cart/Cart.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../config";
import NotFound from "./NotFound";
import EmptyCart from "../components/Cart/EmptyCart";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

// hooks
import useCartSubtotal from "../hooks/useCartSubtotal";

// actions
import {
  changeQuantity,
  emptyCart,
  removeItem,
} from "../redux/actions/cartActions";

import InlineLoader from "../components/InlineLoader";

const Cart = () => {
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const { cart_items, responseEnded } = useSelector(
    (state) => state.cartReducer
  );
  const cartSubtotal = useCartSubtotal();
  const dispatch = useDispatch();

  function putOptions(item) {
    let options = [];

    for (let i = 1; i < Math.max(item.quantity, item.max_quantity + 1); i++) {
      options.push(
        <option key={i} value={i}>
          Quantity: {i}
        </option>
      );
    }

    return options;
  }

  function removeThisItem(item) {
    dispatch(removeItem(item));
  }

  async function checkout() {
    try {
      const res = await fetch("/checkout/checkout_and_place_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_items }),
      });
      const body = await res.json();

      if (res.ok) {
        window.location = body.url;
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    document.title = `${config.applicationName} / Cart`;
  }, []);

  return (
    <div className="cart_page">
      {responseEnded ? (
        <div className="container">
          {isAuthenticated ? (
            <>
              {cart_items.length > 0 ? (
                <div className="cart_content">
                  <h2 className="heading">Cart Items:</h2>

                  <div className="cart_item_container">
                    {cart_items.map((item, index) => {
                      return (
                        <div className="singleItem" key={index}>
                          <div className="item_img">
                            <img
                              src={item.images[0].photoUrl}
                              alt={item.title}
                            />
                          </div>
                          <div className="item_desc">
                            <div className="item_name_and_price">
                              <h2 className="product_title">
                                <Link to={`/product/${item._id}`}>
                                  {item.title}
                                </Link>
                              </h2>
                              <p className="price">{item.total_price} $</p>
                            </div>

                            <div className="item_actions">
                              <div className="item_quantity">
                                <select
                                  value={item.quantity}
                                  onChange={(event) =>
                                    dispatch(
                                      changeQuantity(
                                        item,
                                        parseInt(event.target.value)
                                      )
                                    )
                                  }
                                >
                                  {putOptions(item)}
                                </select>
                              </div>

                              <div className="remove_item">
                                <Button
                                  variant="contained"
                                  onClick={() => removeThisItem(item)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="cart_total_and_checkout_and_other">
                    <div className="actions">
                      <div className="single_action_button">
                        <Button
                          variant="contained"
                          onClick={() => dispatch(emptyCart())}
                        >
                          Remove All
                        </Button>
                      </div>

                      {/* the checkout button */}
                      <div className="single_action_button">
                        <Button onClick={checkout} variant="contained">
                          Checkout
                        </Button>
                      </div>
                    </div>

                    <div className="sub_total">
                      Subtotal: <span>{cartSubtotal} $</span>
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyCart />
              )}
            </>
          ) : (
            <NotFound />
          )}
        </div>
      ) : (
        <div className="inline_loader_container">
          <InlineLoader />
        </div>
      )}
    </div>
  );
};

export default Cart;

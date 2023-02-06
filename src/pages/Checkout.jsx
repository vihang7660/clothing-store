import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

export default function Checkout() {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function increaseQuantity(id) {
    dispatch(incrementQuantity(id));
  }

  function decreaseQuantity(id) {
    dispatch(decrementQuantity(id));
  }

  function productRemoval(id) {
    dispatch(removeFromCart(id));
  }

  if (products.filter(product => product.isInCart).length === 0) {
    return <h1 className="text-5xl text-center">Nothing to see here</h1>
  }
  return (
    <>
      <Link className="text-blue-500 clear-both" to="/">
        Back
      </Link>
      <main className="flex items-start justify-between">
        <table className="table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) => product.isInCart)
              .map((product) => {
                return (
                  <tr key={product.id}>
                    <td
                      className="px-4 py-2 cursor-pointer"
                      onClick={() => productRemoval(product.id)}
                    >
                      <TiDeleteOutline size={35} />
                    </td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <div className="w-20 h-24">
                        <img
                          src={product.image}
                          alt="Product Image"
                          className="flex object-cover h-full w-full"
                        />
                      </div>
                      <span>{`${product.description} - ${product.color}`}</span>
                    </td>
                    <td className="px-4 py-2">{product.price}</td>
                    <td>
                      <div className="  ">
                        <span
                          className="text-xl cursor-pointer hover:bg-gray-300 p-1 px-3 border rounded-l-full "
                          onClick={() => {
                            product.quantity > 1
                              ? decreaseQuantity(product.id)
                              : productRemoval(product.id);
                          }}
                        >
                          -
                        </span>
                        <span className="text-xl p-1 px-3 border-y">
                          {product.quantity}
                        </span>
                        <span
                          className="text-xl cursor-pointer hover:bg-gray-300 p-1 px-3 border rounded-r-full "
                          onClick={() => increaseQuantity(product.id)}
                        >
                          +
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      {(product.price * product.quantity).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="flex flex-col items-center justify-between p-14 bg-white rounded-lg shadow gap-4">
          <h1 className="text-lg font-medium border-b">Cart Total</h1>
          <p className="text-xl font-medium text-gray-700">
            ${products
              .filter((item) => item.isInCart)
              .reduce((accumulator, currentValue) => {
                return accumulator + currentValue.price * currentValue.quantity;
              }, 0).toFixed(2)}
          </p>
          <Link to='/order-confirmation' className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600">
            Proceed to Checkout
          </Link>
        </div>
      </main>
    </>
  );
}

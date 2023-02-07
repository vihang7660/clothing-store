import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterForm from "../components/FilterForm";
import {
  fetchProducts,
  changingQuantity,
  updateCart,
} from "../features/cart/cartSlice";
import { BsCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ProductListing() {
  const dispatch = useDispatch();
  const { cartList, status } = useSelector((state) => state.cart);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, []);

  function handleQuantityChange(e, id) {
    dispatch(changingQuantity({ id, value: e.target.value }));
  }
  function handleCartUpdate(e, id) {
    dispatch(updateCart({ id, value: e.target.checked }));
  }

  return (
    <>
      <div className="flex items-center gap-4 justify-between">
        <div className="py-4">
          <FilterForm />
        </div>
        <div className="py-4 w-auto">
          <Link
            to="/checkout"
            className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "
          >
            Go to Cart
          </Link>
        </div>
      </div>
      <table className="w-full text-left table-collapse">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-400">
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Color</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Buy</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((product) => {
            return (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-2">
                  <div className="w-20 h-24">
                    <img
                      src={product.image}
                      alt="Product Image"
                      className="flex object-cover h-full w-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-2">{product.productName}</td>
                <td className="px-4 py-2">{product.color}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">
                  <form>
                    <input
                      type="text"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(e, product.id)}
                      className="border border-gray-400 px-2 py-1 rounded-lg w-20"
                    />
                  </form>
                </td>
                <td className="px-4 py-2">
                  <form className="flex items-center">
                    <label htmlFor={product.id} className="text-gray-700">
                      <BsCartPlusFill size={30} />
                    </label>
                    <input
                      type="checkbox"
                      name="addedToCart"
                      id={product.id}
                      checked={product.isInCart}
                      onChange={(e) => handleCartUpdate(e, product.id)}
                      className="ml-10 w-6 h-6"
                    />
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

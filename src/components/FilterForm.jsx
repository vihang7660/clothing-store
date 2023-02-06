import { useDispatch, useSelector } from "react-redux";
import { updateFilters, resetFilter } from "../features/cart/cartSlice";

export default function FilterForm() {
  const { products, filters } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const uniqueSizes = [...new Set(products.map((product) => product.size))].map(
    (item, index) => ({ size: item, id: index })
  );
  const uniqueApparelType = [...new Set(products.map((product) => product.type))].map(
    (item, index) => ({ type: item, id: index })
  )

  function handleChange(e) {
    dispatch(updateFilters({ [e.target.name]: e.target.value }));
  }

  return (
    <form className="flex items-center gap-4 ">
      <select
        name="apparelType"
        id="apparelType"
        value={filters.apparelType}
        onChange={handleChange}
        className="w-44 p-1 rounded border"
      >
        <option value="">--Clothing Type--</option>
        {uniqueApparelType.map((product) => (
          <option key={product.id} value={product.type}>
            {product.type}
          </option>
        ))}
      </select>
      <select
        name="size"
        id="size"
        value={filters.size}
        onChange={handleChange}
        className="w-44 p-1 rounded border"
      >
        <option value="">--Size--</option>
        {uniqueSizes.map((item) => (
          <option key={item.id} value={item.size}>
            {item.size}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => dispatch(resetFilter())}
        className="w-32 p-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
      >
        Reset
      </button>
      <label htmlFor="searchText" className="text-gray-700 ml-60">
        Search:
      </label>
      <input
        type="text"
        id="searchText"
        name="searchText"
        value={filters.searchText}
        onChange={handleChange}
        className="w-44 p-1 rounded border"
      />
    </form>
  );
}

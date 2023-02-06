import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cartList: [],
  checkoutList: [],
  filters: { apparelType: "", size: "", searchText: "" },
  cartTotal: 0,
  status: "idle",
};

const url = "https://api.npoint.io/c0e35e626080d3929f57";

export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handlingFormData(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.cartList = state.products
        .filter((product) =>
          product.productName
            .toLowerCase()
            .includes(state.filters.searchText.toLowerCase())
        )
        .filter((product) => product.size.includes(state.filters.size))
        .filter((product) =>
          product.productName.includes(state.filters.apparelType)
        );
    },
    resetFilters(state, action) {
      state.filters = initialState.filters;
      state.cartList = state.products;
    },
    changingQuantity(state, action) {
      state.cartList = state.cartList.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Number(action.payload.value) }
          : item
      );
      state.products = state.products.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Number(action.payload.value) }
          : item
      );
    },
    updateCart(state, action) {
      state.cartList = state.cartList.map((item) =>
        item.id === action.payload.id
          ? { ...item, isInCart: action.payload.value }
          : item
      );
      state.products = state.products.map((item) =>
        item.id === action.payload.id
          ? { ...item, isInCart: action.payload.value }
          : item
      );
    },
    quantityIncrement(state, action) {
      state.products = state.products.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      state.cartList = state.cartList.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },
    quantityDecrement(state, action) {
      state.products = state.products.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      state.cartList = state.cartList.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    },
    removeFromCart(state, action) {
      state.products = state.products.map((item) =>
        item.id === action.payload ? { ...item, isInCart: false } : item
      );
      state.cartList = state.cartList.map((item) =>
        item.id === action.payload ? { ...item, isInCart: false } : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "successful";
        state.products = action.payload;
        state.cartList = action.payload;
      });
  },
});

export const {
  handlingFormData,
  resetFilters,
  changingQuantity,
  updateCart,
  quantityIncrement,
  quantityDecrement,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  productName?: string;
  price?: number;
  discountPrice?: number;
  hasDiscount?: boolean;
  image?: string | null;
  rating?: number;
  categoryId?: number;
  categoryName?: string;
  brandId?: number;
}

interface WishlistState {
  items: Product[];
}

const getInitialWishlist = (): Product[] => {
  try {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const initialState: WishlistState = {
  items: getInitialWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const existsIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existsIndex >= 0) {
        state.items.splice(existsIndex, 1);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    }
  }
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

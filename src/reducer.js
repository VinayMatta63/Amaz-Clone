//Initialize the dataLayer
export const initialState = {
  cart: [],
  user: null,
  product: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: action.user,
        cart: action.cart,
      };
    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
      };
    case "PRODUCT_DETAILS":
      return {
        ...state,
        product: action.product,
      };
    case "ADD_TO_CART":
      const indexA = state.cart.findIndex(
        (cartItem) => cartItem.id === action.item.id
      );
      let copy = [...state.cart];
      console.log(indexA);
      if (indexA >= 0) {
        copy[indexA].quantity += action.item.quantity;
      } else {
        copy = [...state.cart, action.item];
      }
      return {
        ...state,
        cart: copy,
      };
    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      let copyCart = [...state.cart];

      if (index >= 0) {
        if (copyCart[index].quantity > 1) {
          copyCart[index].quantity -= 1;
        } else {
          copyCart.splice(index, 1);
        }
      } else {
        console.warn(`Item ${action.id} does not exist.`);
      }

      return {
        ...state,
        cart: copyCart,
      };
    default:
      return state;
  }
};

export const cartTotal = (cart) =>
  cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const cartSum = (cart) =>
  cart?.reduce((sum, item) => sum + item.quantity, 0);

export default reducer;

import { createStore } from "redux";
import rootReducer from "./rootReducer";

// const initialStore = {
//   cartReducer: {
//     cartItems: JSON.parse(localStorage.getItem("cartItems")) ?? [],
//   },
// };
const Store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;

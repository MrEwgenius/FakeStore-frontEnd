import { useDispatch } from "react-redux";
import Router from "./pages/Router";
import { getBrandProduct } from "./redux/reducers/productSlice";

function App() {
  const dispatch = useDispatch();
  setInterval(() => {
    dispatch(getBrandProduct());
  }, 10000);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;

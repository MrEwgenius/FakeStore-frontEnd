import { useDispatch } from "react-redux";
import Router from "./pages/Router";
import { getBrandProduct } from "./redux/reducers/productSlice";

function App() {

  const url = `https://fakestore-backend-ozwi.onrender.com/`;
  const interval = 15000; // Interval in milliseconds (30 seconds)
 
  function reloadWebsite() {
    fetch(url)
      .then((response) => {
        console.log(
          `Reloaded at : Status Code ${
            response
          }`
        );
      })
      .catch((error) => {
        console.error(
          `Error reloading at ${new Date().toISOString()}:`,
          error.message
        );
      });
  }

  setInterval(reloadWebsite, interval);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;

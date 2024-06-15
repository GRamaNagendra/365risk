import {BrowserRouter, Route, Routes} from "react-router-dom"
import Layout from "./Layout";
import Home from "./Home";
import Aboutus from "./Aboutus"
import './App.css';
function App() {
  return (
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="aboutus" element={<Aboutus />} />
          </Route>
  </Routes>
  </BrowserRouter>
  );
}

export default App;

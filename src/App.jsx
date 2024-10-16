import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Connection from "./Connection";
import Feed from "./Feed";

function App() {
  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
           <Route path="/Login" element={<Login />}></Route>
           <Route path="/Connection" element={<Connection />}></Route>
           <Route path="/Feed" element={<Feed />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

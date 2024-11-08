import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Connection from "./components/Connection";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import userStore from "./utils/userStore";

function App() {
  return (
    <>
      <Provider store={userStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/Connection" element={<Connection />}></Route>
              <Route path="/Feed" element={<Feed />}></Route>
              <Route path="/Profile" element={<Profile />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

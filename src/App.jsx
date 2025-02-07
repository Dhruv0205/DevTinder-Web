import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Connections from "./components/Connections";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Request from "./components/Request";
import { Provider } from "react-redux";
import userStore from "./utils/userStore";
import Chatting from "./components/Chatting";

function App() {
  return (
    <>
      <Provider store={userStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/Connection" element={<Connections />}></Route>
              <Route path="/Feed" element={<Feed />}></Route>
              <Route path="/Profile" element={<Profile />}></Route>
              <Route path="/Request" element={<Request />}></Route>
              <Route path="/chat/:targetUserId" element={<Chatting />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

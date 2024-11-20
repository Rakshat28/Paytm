import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";

import { RecoilRoot } from "recoil";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import PrivateRoute from "./components/auth/PrivateRoute";
import Settings from "./pages/Settings";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendMoney />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
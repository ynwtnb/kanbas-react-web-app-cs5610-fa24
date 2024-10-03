import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import {Routes, Route, Navigate} from "react-router-dom";

export default function Account() {
  return (
    <div id="wd-account-screen">
      <h2>Account</h2>
      <div className="d-flex">
        <div className="d-none d-sm-block">
          <AccountNavigation />
        </div>
        <div className="flex-start m-5 mt-0">
          <Routes>
              <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup" element={<Signup />} />
          </Routes>  
        </div>
      </div>
    </div>
  );
}

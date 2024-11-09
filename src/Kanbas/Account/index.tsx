import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import {Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div id="wd-account-screen">
      <h2>Account</h2>
      <div className="d-flex">
        <div className="d-none d-sm-block">
          <AccountNavigation />
        </div>
        <div className="flex-start m-5 mt-0">
          <Routes>
              <Route path="/" element={<Navigate to={ currentUser ? "/Kanbas/Account/Profile": "/Kanbas/Account/Signin" } />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup" element={<Signup />} />
          </Routes>  
        </div>
      </div>
    </div>
  );
}

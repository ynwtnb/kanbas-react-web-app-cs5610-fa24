import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import React from "react";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => { fetchProfile(); }, []);
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      { profile &&
        <div>
          <input id="wd-username" value={profile.username} placeholder="username" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}/>
          <input id="wd-password" value={profile.password} placeholder="password"
                  type="password" className="form-control mb-2"
                  onChange={(e) => setProfile({ ...profile, password: e.target.value })}/>
          <input id="wd-firstname" value={profile.firstName} placeholder="First Name"  className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}/>
          <input id="wd-lastname" value={profile.lastName} placeholder="Last Name"  className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}/>
          <input id="wd-dob" placeholder="yyyy-mm-dd" value={profile.dob} type="date"  className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, udob: e.target.value })}/>
          <input id="wd-email" value={profile.email} type="email"  className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}/>
          <select id="wd-role"  className="form-select mb-2" value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={signout} className="btn btn-danger w-100">Sign out</button>
        </div>
      }
    </div>
);}

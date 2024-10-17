import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const { pathname } = useLocation();
  return (
    <div id="wd-account-navigation" className="wd list-group rounded-0 fs-6">
      <Link to={`/Kanbas/Account/Signin`}  className={`list-group-item border-0 ${pathname.includes("Signin") ? "active" : "text-danger"}`}> Signin  </Link>
      <Link to={`/Kanbas/Account/Signup`}  className={`list-group-item border-0 ${pathname.includes("Signup") ? "active" : "text-danger"}`}> Signup  </Link>
      <Link to={`/Kanbas/Account/Profile`} className={`list-group-item border-0 ${pathname.includes("Profile") ? "active" : "text-danger"}`}> Profile </Link>
    </div>
);}
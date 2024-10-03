import { Link } from "react-router-dom";
export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group rounded-0 fs-6">
      <Link to={`/Kanbas/Account/Signin`}  className="list-group-item border-0 active"> Signin  </Link>
      <Link to={`/Kanbas/Account/Signup`}  className="list-group-item border-0 text-danger"> Signup  </Link>
      <Link to={`/Kanbas/Account/Profile`} className="list-group-item border-0 text-danger"> Profile </Link>
    </div>
);}
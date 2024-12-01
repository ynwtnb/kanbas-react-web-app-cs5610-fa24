import { useSelector } from "react-redux"
import * as db from "./Database";

export default function ProtectedContent({children, role} : {children: any, role: string[]}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    if (currentUser && role.includes(currentUser.role)) {
        return children;
    }
}
import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate } from "react-router-dom"


const ProtectedRoute  = ({ children, roles }) => {
        const { user, token } = useContext(AuthContext);
      
        if (!token) {
          return <Navigate to="/pos/login" replace />;
        }
      
        if (roles && !roles.includes(user?.role)) {
          return <Navigate to="/pos/unauthorized" replace />;
        }
      
        return children;
      };
      

export default ProtectedRoute
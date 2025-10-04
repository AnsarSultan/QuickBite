import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

const Unauthorized = () => {
  const {user} = useContext(AuthContext)
  const role = user?.role;
  if(role === 'customer'){
    return <Navigate to={'/'} replace/>
  }

    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">
          🚫 You are not authorized to view this page
        </h1>
      </div>
    );
  };
  export default Unauthorized;
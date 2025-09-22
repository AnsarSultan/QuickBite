import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Unauthorized = () => {

    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">
          🚫 You are not authorized to view this page
        </h1>
      </div>
    );
  };
  export default Unauthorized;
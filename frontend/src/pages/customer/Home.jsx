import React, { useContext, useState } from "react";
import Carousel from "../../components/customer/Carousel";
import CategoryIcon from "../../components/common/CategoryIcon";
import logo from "../../assets/logo.png";
import ProductCard from "../../components/common/ProductCard";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import Modal from '../../components/pos/Modal'
import axios from "axios";
import { toast } from 'react-toastify';

function Home() {
  const [isSignUpModalOpen  , setIsSignUpModalOpen] = useState(false);
  const [ email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [otp , setOtp] = useState('')
  const [accountType , setAccountType] = useState("customer")
  const [haveAccount , setHaveAccount] = useState(false)
  const [otpSent, setOtpSent] = useState(false);
  const [loading , setLoading] = useState(false)
  const {token , user , userLogout , setToken} = useContext(AuthContext)
  const role = user?.role;
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const handleAddToCart = (product) => {
    if (role === "customer") {
      addToCart(product); 
    } else {
      setIsSignUpModalOpen(true); 
    }
  };
  const { products } = useContext(ProductContext);
  const { addToCart} = useContext(CartContext);
  
  const payload = {
    email ,
    password,
    otp,
    accountType
  }
  const handleLogin = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${backendURL}/api/users/login` , {email , password})
    if(data.success){
      setLoading(true)
      localStorage.setItem("token", data.token);
      setToken(data.token)
      toast.success("Login Successfully")
      setIsSignUpModalOpen(false)
    }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message); 
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }finally{
      setLoading(false)
    }
  }
  const handleSendOtp = async (e)=>{
    e.preventDefault();
   try {
    setLoading(true)
    const {data} = await axios.post(`${backendURL}/api/users/customer/initiate` , {email})
    if(data.success){
      setOtpSent(true)
    }else{
      toast.error(data.message)
    }
   } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message); 
    } else {
      toast.error("Something went wrong. Please try again.");
    }
   }finally{
    setLoading(false)
   }
  }

  const handleVerifyOtp = async (e)=>{
    e.preventDefault();
   try {
    setLoading(true)
    const {data} = await axios.post(`${backendURL}/api/users/verify/otp` , payload)
    if(data.success){
      localStorage.setItem("token", data.token);
      setToken(data.token)
      setIsSignUpModalOpen(false)
      toast.success("Email verfied and login.")
    }
   } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message); 
    } else {
      toast.error("Something went wrong. Please try again.");
    }
   }finally{
    setLoading(false)
   }
  }
  return (
    <div>
      <Carousel />
      <div className="flex flex-col gap-2">
       <Modal
          isOpen={isSignUpModalOpen}
          onClose={() => {
            setIsSignUpModalOpen(false);
            setOtpSent(false);
            setHaveAccount(false);
          }}
        >
          {haveAccount ? (
            <form onSubmit={handleLogin} className="flex flex-col p-5 gap-2 text-black">
              <h2 className="font-bold text-2xl text-center mb-2">
                Please Sign-In to Place an Order
              </h2>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              />
             {loading ?  <p>Loading...</p> :<button type="submit" className="bg-red-500 py-2 rounded text-white cursor-pointer">
                Login
              </button>}
              <p>
                First time user?{" "}
                <span
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => setHaveAccount(false)}
                >
                  Click here
                </span>
              </p>
            </form>
          ) : (
            <form
              onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
              className="flex flex-col p-5 gap-2 text-black"
            >
              <h2 className="font-bold text-2xl text-center mb-2">
                Please Sign-Up to Place an Order
              </h2>
              {otpSent ? (<p className="text-center">{email}</p>) :( <div className="w-full flex flex-col gap-2">
                <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
              </div>)}
              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2"
                />
              )}
             {loading ? <p>Loading...</p>  :  <button type="submit" className="bg-red-500 py-2 rounded text-white cursor-pointer">
                {otpSent ? "Verify OTP" : "Send OTP"}
              </button>}
              <p>
                Already have an account?{" "}
                <span
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => setHaveAccount(true)}
                >
                  Click here
                </span>
              </p>
            </form>
          )}
        </Modal>
        <div className="p-4 my-4">
          <p className="text-3xl font-bold underline decoration-red-500 underline-offset-4">
            EXPLORE MENU
          </p>
        </div>
        <div></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-3 justify-center">
          {products.map((p) => (
            <ProductCard
              POS={false}
              key={p.product_id}
              product={p}
              showActions={false}
              showAddToCart={true}
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

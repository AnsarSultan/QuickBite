import React from "react";
import Carousel from "../../components/customer/Carousel";
import CategoryIcon from "../../components/common/CategoryIcon";
import logo from '../../assets/logo.png'


function Home() {
  return (
    <div>
      <Carousel/>
      <div className='flex gap-2'>
        <CategoryIcon image={logo} name="Pizza" selected={true}/>
        <CategoryIcon image={logo} name="Burger" selected={false}/>
      </div>
      home
    </div>
  )
}

export default Home
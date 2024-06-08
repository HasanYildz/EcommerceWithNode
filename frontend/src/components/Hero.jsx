import React from 'react'
import { FaStar } from 'react-icons/fa'
import {MdStar ,MdOutlineLocalOffer} from "react-icons/md"
import { NavLink } from 'react-router-dom'
const Hero = () => {
  return (
    <section className='relative bg-cover bg-hero bg-center 
    bg-no-repeat h-screen w-full'>
        <div className='max_padd_container relative top-32 xs:top-52'>
            <h1 className='h1 capitalize max-w-[37rem]'>
                Digital Shopping Hub Address
            </h1>
            <p className='text-gray-50 regular-16 mt-6 max-2-[33rem]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci natus maiores commodi sint veniam harum eaque fugiat quam exercitationem. Dicta, minima repellendus. Totam voluptatibus odit, expedita ratione omnis voluptatem perspiciatis deleniti a. Iste.</p>
            <div className='flexStart !items-center gap-x-4 my-10'>
                <div className='!regular-24 flexCenter gap-x-3'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
                <div className='bold-16 sm:bold-20'>176k <span className='regular-16 sm:regular-20'>Excellent Reviews</span></div>
            </div>
            <div className='max-xs.flex-col flex gap-2'>
                <NavLink to={""} className={"btn_dark_rounded flexCenter"}>
                    Shop now
                </NavLink>
                <NavLink to={""} className={"btn_dark_rounded flexCenter gap-x-2"} ><MdOutlineLocalOffer className='text-2xl'/>
                    Offers
                </NavLink>
            </div>
        </div>

    </section>
  )
}

export default Hero
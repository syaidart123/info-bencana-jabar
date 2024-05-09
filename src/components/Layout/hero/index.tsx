import Button from '@/components/UI/Button';
import Image from 'next/image';
import React from 'react'

const HeroSection = () => {
  return (
    <section className="  h-screen flex justify-around items-center ">
        <div className='px-10 w-6/12'>
            <p className=' text-3xl font-bold mb-5'>Tangan yang Menyentuh,Hati yang Peduli.</p>
            <p className='text-lg mb-5'>Bersama-sama Memperkuat Kebangkitan di Tengah Bencana</p>
            <Button type='button' className='bg-sky-500 text-white p-5'>Selengkapnya</Button>
        </div>
        <div className='px-10 w-6/12'>
            <Image src="/images/hero.jpg" width={500} height={500} alt='Hero' className='rounded-lg shadow-lg '/>
        </div>
    </section>
  )
}
export default HeroSection;
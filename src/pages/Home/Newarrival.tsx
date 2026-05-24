import React from 'react'
import { Truck, Headphones, RotateCcw } from 'lucide-react'

import PS5_IMG from "../../assets/ps5-slim-goedkope-playstation_large 1.png";
import WOMEN_IMG from "../../assets/attractive-woman-wearing-hat-posing-black-background 1.png"
import SPEAKERS_IMG from "../../assets/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1.png"
import PERFUME_IMG from "../../assets/652e82cd70aa6522dd785109a455904c.png"

function ServiceCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className='flex flex-col items-center text-center gap-3 px-4'>
      <div className='w-14 h-14 rounded-full border-2 border-gray-800 dark:border-gray-500 flex items-center justify-center'>
        <div className='w-10 h-10 rounded-full border border-gray-400 dark:border-gray-600 flex items-center justify-center'>
          <Icon size={18} className='text-gray-800 dark:text-gray-300' />
        </div>
      </div>
      <div>
        <p className='font-extrabold text-sm tracking-wide text-gray-900 dark:text-gray-100 uppercase'>{title}</p>
        <p className='text-gray-500 dark:text-gray-400 text-xs mt-1'>{desc}</p>
      </div>
    </div>
  )
}

export default function NewArrival() {
  return (
    <div className='px-4 sm:px-6 md:px-[100px] py-10 bg-white dark:bg-gray-950 transition-colors duration-300'>

      {/* Header */}
      <div className='flex items-center gap-2 mb-2'>
        <div className='w-[14px] h-[34px] bg-[#DB4444] rounded' />
        <span className='text-[#DB4444] font-medium text-sm'>Featured</span>
      </div>
      <h2 className='text-2xl sm:text-[32px] font-bold text-gray-900 dark:text-white mb-6'>New Arrival</h2>

      {/* ── MOBILE: stacked cards ── */}
      <div className='flex flex-col gap-3 sm:hidden'>
        {/* Simplified for brevity - applying dark: classes to all cards below as well */}
        {[PS5_IMG, WOMEN_IMG, SPEAKERS_IMG, PERFUME_IMG].map((img, i) => (
          <div key={i} className='relative h-[180px] rounded overflow-hidden bg-black group cursor-pointer'>
            <img src={img} alt='Product' className='absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500' />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent' />
            <div className='absolute bottom-0 left-0 p-5 z-10'>
              <h3 className='text-white font-bold text-lg mb-1'>New Collection</h3>
              <p className='text-white/60 text-xs mb-3'>Explore our latest arrivals.</p>
              <button className='text-white text-sm font-semibold border-b border-white pb-0.5 hover:text-gray-300'>Shop Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: Grid ── */}
      <div className='hidden sm:grid grid-cols-2 gap-4' style={{ height: 520 }}>
        {/* PS5 — full height left */}
        <div className='relative rounded overflow-hidden bg-black group cursor-pointer h-full'>
          <img src={PS5_IMG} alt='PS5' className='absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
          <div className='absolute bottom-0 left-0 p-8 z-10'>
            <h3 className='text-white font-bold text-2xl mb-2'>PlayStation 5</h3>
            <p className='text-white/60 text-sm mb-4 max-w-[220px]'>Black and White version of the PS5 coming out on sale.</p>
            <button className='text-white text-sm font-semibold border-b border-white pb-0.5 hover:text-gray-300'>Shop Now</button>
          </div>
        </div>

        {/* Right column */}
        <div className='flex flex-col gap-4 h-full'>
          <div className='relative rounded overflow-hidden bg-black group cursor-pointer flex-1'>
            <img src={WOMEN_IMG} alt="Women's" className='absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-500' />
            <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent' />
            <div className='absolute bottom-0 left-0 p-6 z-10'>
              <h3 className='text-white font-bold text-xl mb-1'>Women's Collections</h3>
              <p className='text-white/60 text-xs mb-3 max-w-[180px]'>Featured woman collections that give you another vibe.</p>
              <button className='text-white text-sm font-semibold border-b border-white pb-0.5 hover:text-gray-300'>Shop Now</button>
            </div>
          </div>

          <div className='flex gap-4 flex-1'>
            <div className='relative rounded overflow-hidden bg-black group cursor-pointer flex-1'>
              <img src={SPEAKERS_IMG} alt='Speakers' className='absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500' />
              <div className='absolute bottom-0 left-0 p-5 z-10'>
                <h3 className='text-white font-bold text-lg mb-1'>Speakers</h3>
                <button className='text-white text-sm font-semibold border-b border-white pb-0.5'>Shop Now</button>
              </div>
            </div>
            <div className='relative rounded overflow-hidden bg-black group cursor-pointer flex-1'>
              <img src={PERFUME_IMG} alt='Perfume' className='absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500' />
              <div className='absolute bottom-0 left-0 p-5 z-10'>
                <h3 className='text-white font-bold text-lg mb-1'>Perfume</h3>
                <button className='text-white text-sm font-semibold border-b border-white pb-0.5'>Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Service strip ── */}
      <div className='mt-14 pt-10 border-t border-gray-200 dark:border-gray-800'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20'>
          <ServiceCard icon={Truck} title='Free And Fast Delivery' desc='Free delivery for all orders over $140' />
          <ServiceCard icon={Headphones} title='24/7 Customer Service' desc='Friendly 24/7 customer support' />
          <ServiceCard icon={RotateCcw} title='Money Back Guarantee' desc='We return money within 30 days' />
        </div>
      </div>
    </div>
  )
}
import GraficoHome from '@/components/GraficoHome'
import React from 'react'

const Home = () => {

  return (
    <>
      <section className='py-4 sm:py-4 '>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='text-white text-3xl font-bold tracking-tight sm:text-4xl'>Stay in the Know with ExchangeTracker - Your Currency Companion.</h2>
          </div>  
          <div className='mx-auto mt-16 bg-modals max-w-2xl rounded-3xl sm:mt-20 lg:mx-0 lg:flex lg:max-w-none'>
            <div className='p-8 sm:p-10 lg:flex-auto'>
             <GraficoHome/>      
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
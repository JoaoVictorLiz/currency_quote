import Link from 'next/link'
import Image from 'next/image'
import Currency from '../public/assets/icons/icons8-currency-96.png'

const NavBar = () => {
  return (
    <header className='w-full text-white'>
      <nav className='container mx-auto flex justify-between items-center px-6 md:px-20 py-4 gap-16'>
        <Link href="/" className='flex items-center gap-1'>
          <Image src={Currency} width={50} height={50} alt='logo'/>
          <p className=''>
            Exchange <span className='text-primary'>Tracker </span>
          </p>
        </Link>
      </nav>
    </header>
  )
}

export default NavBar
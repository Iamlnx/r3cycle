import logo from '../assets/logo.svg'

function NavBar(){
  return (
    <nav className='flex items-center justify-between bg-white px-20 py-5'>
      <img src={logo} className='h-8' />
      <section className='flex gap-5 items-center justify-center font-bold text-[#386641]'>
        <a href="/" className='h-5'>Início</a>
        <a href="" className='h-5'>Cadastros</a>
      </section>
    </nav>
  );
}

export default NavBar;

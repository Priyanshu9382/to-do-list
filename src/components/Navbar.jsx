const Navbar = () => {
  return (
    <nav className="flex bg-violet-900 h-14 items-center justify-between">
      <div className="logo">
        <span className=" text-white font-extrabold text-lg md:text-2xl m-5 cursor-pointer">
          <a href="#">iTask</a>
        </span>
      </div>
      <ul className="flex text-white text-lg gap-8 m-9 ">
        <li className="cursor-pointer text-[1.1rem] md:text-xl no-underline transform origin-bottom hover:scale-110 transition duration-100"><a href="#">Home</a></li>
        <li className="cursor-pointer text-[1.1rem] md:text-xl no-underline transform origin-bottom hover:scale-110 transition duration-100"><a href="">Your Tasks</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

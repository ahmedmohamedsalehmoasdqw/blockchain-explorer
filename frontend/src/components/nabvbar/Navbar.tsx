const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container ml-4">
        <a
          href="#"
          className="text-white text-lg font-semibold flex items-center gap-2"
        >
          <img src="/logo.svg" alt="logo" className="w-10" />
          <p className="text-white font-medium">Blockchain Explorer</p>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

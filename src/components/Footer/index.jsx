const Footer = () => {
  return (
    <footer className="border-t-2 border-gray-200">
      <div className="px-5 md:px-10 py-8 xl:container xl:mx-auto">
        <p className="text-center font-semibold">
          &copy; {new Date().getFullYear()} - Ai Study Abroad Assistant
        </p>
      </div>
    </footer>
  );
};

export default Footer;

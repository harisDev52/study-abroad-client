const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="px-5 md:px-10 py-8 xl:container xl:mx-auto">
        <p className="text-center text-white font-semibold">
          &copy {new Date().getFullYear()} - Ai Study Abroad Assistant
        </p>
      </div>
    </footer>
  )
}

export default Footer

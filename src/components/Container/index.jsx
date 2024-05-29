const Container = ({ children }) => {
  return (
    <div className="bg-bgBlueR bg-bottom lg:bg-right lg:bg-[length:70%_100%] xl:bg-contain bg-no-repeat">
      <div className="min-h-screen px-5 md:px-10 xl:container xl:mx-auto">
        {children}
      </div>
    </div>
  )
}

export default Container

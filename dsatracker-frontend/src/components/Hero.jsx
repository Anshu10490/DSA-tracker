function Hero() {
  return (
    <section className="relative text-center py-28 px-6 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/80 backdrop-blur-lg rounded-3xl shadow-2xl mt-8 max-w-6xl mx-auto overflow-hidden">
      
      {/* Decorative Glow Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-200"></div>
      
      {/* Main Content */}
      <h1 className="relative text-5xl sm:text-6xl md:text-7xl font-extrabold text-primary drop-shadow-md leading-tight">
        Kickstart your <span className="text-white">DSA Journey 🚀</span>
      </h1>

      <p className="relative mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-gray-300 leading-relaxed">
        Track your problems, stay consistent, and prepare for your dream company with confidence.
      </p>
    </section>
  );
}

export default Hero;

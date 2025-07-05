export default function Banner() {
  return (
    <section className="mb-[92vh] ">
      <div className="absolute top-0 left-0 z-40 w-full min-h-screen bg-gradient-to-t from-primary via-accent to-[#141c0d] text-base-100 px-10 py-10 flex items-center overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-xl bg-secondary/5 -right-[250px] -top-[250px]"></div>

        <div className="pt-20 container">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10">
            <div className="md:w-1/2 w-full flex justify-center md:justify-start relative">
              {/* Green Shadow Layer */}
              <div className="absolute w-[90%] h-full rounded-full blur-xl bg-secondary/10"></div>

              {/* Main Image */}
              <img
                src="/images/hero.png"
                alt="Profile"
                className="w-[75%] mx-auto h-auto rounded-lg relative z-10"
              />
            </div>

            <div className="md:w-1/2 w-full">
              <p className="text-sm text-secondary mb-2">Hello I'm Smith</p>
              <h1 className="text-5xl font-bold mb-4">UX/UI Designer</h1>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Rutrum odio est platea viverra sed lobortis elit. Eget fringilla
                tempus suspendisse amet vitae amet lorem erat fermentum. <br />
                Amet eu quis mauris est diam eget nulla purus ipsum. Lacinia
                accumsan enim amet.
              </p>
              <button className="bg-secondary/90 text-secondary-foreground px-6 py-2 rounded hover:bg-secondary transition">
                ABOUT ME
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="sm:mx-10 grid grid-cols-2 sm:grid-cols-4 gap-6 bg-secondary/5 backdrop-blur-[20px] border border-secondary/10 rounded-xl p-6 shadow-lg">
            <div>
              <h3 className="text-2xl font-bold text-white">12+</h3>
              <p className="text-sm text-gray-300">Years experience</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">60+</h3>
              <p className="text-sm text-gray-300">Clients</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">240+</h3>
              <p className="text-sm text-gray-300">Completed projects</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">20+</h3>
              <p className="text-sm text-gray-300">Achievements</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

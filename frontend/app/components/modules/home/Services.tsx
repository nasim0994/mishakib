export default function Services() {
  return (
    <section className="py-10 bg-primary text-primary-foreground">
      <div className="container">
        <h2 className="font-medium text-2xl text-center">Services</h2>

        <div className="mt-10 grid grid-cols-3 gap-8 md:mx-40">
          <div className="service_card_wrap">
            <div className="service_card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4668/4668243.png"
                alt="service1"
                className="w-10"
              />
              <h2 className="text-xl font-medium mt-2">Graphics Design</h2>
              <p className="text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                sed est minima optio ratione necessitatibus ipsa modi facere.
                Nulla, in...
              </p>
            </div>
          </div>

          <div className="service_card_wrap">
            <div className="rotated_bg"></div>
            <div className="service_card border border-secondary">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4668/4668243.png"
                alt="service1"
                className="w-10"
              />
              <h2 className="text-xl font-medium mt-2">Graphics Design</h2>
              <p className="text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                sed est minima optio ratione necessitatibus ipsa modi facere.
                Nulla, in...
              </p>
            </div>
          </div>

          <div className="service_card_wrap">
            <div className="service_card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4668/4668243.png"
                alt="service1"
                className="w-10"
              />
              <h2 className="text-xl font-medium mt-2">Graphics Design</h2>
              <p className="text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                sed est minima optio ratione necessitatibus ipsa modi facere.
                Nulla, in...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

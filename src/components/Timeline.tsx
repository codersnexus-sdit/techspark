export default function Timeline() {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-white">
          Event Timeline
        </h2>
        <ol
          className="relative space-y-16 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-gray-600"
        >
          <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
            <div
              className="relative flex items-start gap-6 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
            >
              <span className="size-4 shrink-0 rounded-full ring-4 ring-black" style={{backgroundColor: '#9929EA'}}></span>

              <div className="-mt-2 space-y-3">
                <time className="text-sm font-medium text-gray-300">12/02/2025</time>

                <h3 className="text-xl font-bold text-white">Kickoff</h3>

                <p className="text-sm text-gray-300 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga officiis tempora ipsum
                  adipisci tenetur sunt quae exercitationem sed pariatur porro!
                </p>
              </div>
            </div>

            <div aria-hidden="true"></div>
          </li>

          <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
            <div
              className="relative flex items-start gap-6 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
            >
              <span className="size-4 shrink-0 rounded-full ring-4 ring-black" style={{backgroundColor: '#9929EA'}}></span>

              <div className="-mt-2 space-y-3">
                <time className="text-sm font-medium text-gray-700 dark:text-gray-200">5/03/2025</time>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white">First Milestone</h3>

                <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga officiis tempora ipsum
                  adipisci tenetur sunt quae exercitationem sed pariatur porro!
                </p>
              </div>
            </div>

            <div aria-hidden="true"></div>
          </li>

          <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
            <div
              className="relative flex items-start gap-6 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
            >
              <span className="size-4 shrink-0 rounded-full ring-4 ring-black" style={{backgroundColor: '#9929EA'}}></span>

              <div className="-mt-2 space-y-3">
                <time className="text-sm font-medium text-gray-700 dark:text-gray-200">24/04/2025</time>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Launch</h3>

                <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga officiis tempora ipsum
                  adipisci tenetur sunt quae exercitationem sed pariatur porro!
                </p>
              </div>
            </div>

            <div aria-hidden="true"></div>
          </li>
        </ol>
      </div>
    </section>
  )
}

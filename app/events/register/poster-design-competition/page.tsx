export default function PosterDesignRegistration() {
  return (
    <div className="min-h-screen bg-[#101c29] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl md:text-6xl font-extrabold text-[#97ffb0] mb-2">
            Poster Design Competition
          </h1>
          <p className="font-sans text-lg text-[#b6e7c9]">
            Annual IUT Seerah Fest 1446
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Intro Section */}
          <section className="bg-white/90 dark:bg-gray-800/90 shadow-xl rounded-3xl p-8 border border-green-100 dark:border-gray-700">
            <p className="font-sans text-lg text-gray-800 dark:text-gray-100 mb-4 text-center">
              Welcome to the official registration for{" "}
              <span className="font-bold font-serif text-green-800 dark:text-green-200">
                Poster Design Competition
              </span>{" "}
              at{" "}
              <span className="font-bold text-green-900 dark:text-green-100">
                IUT Seerah Fest 1446
              </span>
              , organized by the{" "}
              <span className="font-semibold text-green-700 dark:text-green-300">
                IUT Society of Islamic Knowledge Seekers (SIKS)
              </span>
              .
            </p>
            <p className="font-serif text-base text-gray-700 dark:text-gray-200 mb-4 text-center italic">
              Showcase your creativity by designing a poster that visually communicates an Islamic theme or message. Focus on clarity, originality, and impactful presentation—let your artwork inspire and educate!
            </p>
          </section>
          {/* Event Details Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-4 border border-[#2bff88]/20 inline-block w-fit">
            <h2 className="font-serif text-2xl md:text-3xl text-[#6fff8b] mb-2 text-center">
              Event Details
            </h2>
            <ul className="font-mono text-lg text-[#ffffff] list-disc list-inside space-y-1">
              <li>Eligibility: Students of IUT-OIC</li>
              <li>Poster Size: 12 x 18 inches</li>
              <li>Do not include human or animal faces</li>
              <li>AI-generated designs will be disqualified</li>
              <li>Registration Fee: Free</li>
            </ul>
          </section>

          {/* How It Works Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-4 border border-[#2bff88]/20 inline-block w-fit">
            <h2 className="font-serif text-2xl md:text-3xl text-[#6fff8b] mb-2 text-center">
              How It Works
            </h2>
            <ul className="font-mono text-lg text-[#ffffff] list-decimal list-inside space-y-1">
              <li>Design your poster according to the competition rules.</li>
              <li>Submit your poster before the deadline.</li>
              <li>Wait for the results and see if your creativity stands out!</li>
            </ul>
            <p className="font-serif text-lg text-[#b6e7c9] mt-2 text-center">
              Inspire others with your art and win amazing prizes!
            </p>
          </section>

          {/* Winners Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-8 border border-[#2bff88]/20">
            <h2 className="font-serif text-2xl md:text-3xl text-[#ff811a] mb-4 text-center">
              Winners
            </h2>
            <p className="font-mono text-lg text-[#b6e7c9] mb-4 text-center">
              Congratulations to the top participants of Poster Design Competition!
            </p>
            <div className="text-center">
              <ul className="font-mono text-xl text-whit space-y-2">
                <li>1st: ID - 210012130</li>
                <li>2nd: Mehedi Hasan Pranto</li>
                <li>3rd: Atik Shahriar</li>
                <li>4th: Abdullah al Roman</li>
                <li>5th: Md Shahamat Irtisham</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <section className="bg-[#162235] shadow-xl rounded-3xl p-8 border border-[#2bff88]/20 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-[#6fff8b] mb-4">
              Contact Us
            </h2>
            <p className="font-mono text-lg text-[#b6e7c9] mb-4">
              For any queries, feel free to reach out:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1b2a3d] p-4 rounded-lg shadow-md">
                <h3 className="font-serif text-xl text-[#6fff8b] mb-2">Mohammad Illin Rahman</h3>
                <p className="font-mono text-lg text-[#b6e7c9]">
                  ✉️ <a href="mailto:illinrahman@iut-dhaka.edu" className="text-[#6fff8b] underline">illinrahman@iut-dhaka.edu</a><br />
                  📞 +8801751636585<br />
                  📱 WhatsApp: +8801576608666
                </p>
              </div>
              <div className="bg-[#1b2a3d] p-4 rounded-lg shadow-md">
                <h3 className="font-serif text-xl text-[#6fff8b] mb-2">Mahmudul Hasan Mahi</h3>
                <p className="font-mono text-lg text-[#b6e7c9]">
                  ✉️ <a href="mailto:mahmudulmahi@iut-dhaka.edu" className="text-[#6fff8b] underline">mahmudulmahi@iut-dhaka.edu</a><br />
                  📞 +8801316171120<br />
                  📱 WhatsApp: +8801316171120
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
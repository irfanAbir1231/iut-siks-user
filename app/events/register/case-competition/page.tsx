export default function CaseCompetitionRegistration() {
  return (
    <div className="min-h-screen bg-[#101c29] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl md:text-6xl font-extrabold text-[#97ffb0] mb-2">
            Case Competition
          </h1>
          <p className="font-sans text-lg text-[#b6e7c9]">
            Annual IUT Seerah Fest 1446
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Intro Section */}
          <section className="bg-white/90 dark:bg-gray-800/90 shadow-xl rounded-3xl p-8 border border-green-100 dark:border-gray-700">
            <p className="font-sans text-lg text-gray-800 dark:text-gray-100 mb-4 text-center">
              Welcome to the official registration for the{" "}
              <span className="font-bold font-serif text-green-800 dark:text-green-200">
                Case Competition
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
              Dive into a unique competition where you’ll address real-world challenges or craft innovative, ethical business models, all through the lens of Islamic values—showcase your creativity, teamwork, and problem-solving skills while making a positive impact on society.
            </p>
          </section>
          {/* Event Details Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-4 border border-[#2bff88]/20 inline-block w-fit">
            <h2 className="font-serif text-2xl md:text-3xl text-[#6fff8b] mb-2 text-center">
              Event Details
            </h2>
            <ul className="font-mono text-lg text-[#ffffff] list-disc list-inside space-y-1">
              <li>Eligibility: Students of IUT-OIC</li>
              <li>Team Size: Up to 4 members</li>
              <li>Gender Segregation: Only all-male or all-female teams</li>
              <li>Registration Fee: Free</li>
            </ul>
          </section>

          {/* How It Works Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-4 border border-[#2bff88]/20 inline-block w-fit">
            <h2 className="font-serif text-2xl md:text-3xl text-[#6fff8b] mb-2 text-center">
              How It Works
            </h2>
            <ol className="font-mono text-lg text-[#ffffff] list-decimal list-inside space-y-1">
              <li>Form a team of up to 4 members (all-male or all-female).</li>
              <li>Register your team using the form below.</li>
              <li>Phase 1: Submit your solution document by the deadline.</li>
              <li>Phase 2: If shortlisted, present your solution and updated documents in the final round.</li>
              <li>Winners will be selected based on creativity, feasibility, and alignment with Islamic values.</li>
            </ol>
            <div className="mt-4 text-center">
              <h2 className="font-serif text-2xl md:text-3xl text-[#6fff8b] mb-2 text-center">
                Rulebook
              </h2>
              <a
                href="https://drive.google.com/drive/folders/1nWb_8B1N9kmQF1-ggzzX45etV9Tn3Ych?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg bg-[#1aff7c] text-[#101c29] font-bold shadow hover:bg-[#00e36a] transition-all text-center"
              >
                📄 View Rulebook
              </a>
            </div>
          </section>

          {/* Winners Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-8 border border-[#2bff88]/20">
            <h2 className="font-serif text-2xl md:text-3xl text-[#ff811a] mb-4 text-center">
              Winners
            </h2>
            <p className="font-mono text-lg text-[#b6e7c9] mb-4">
              Congratulations to the top teams of the Case Competition!
            </p>
            <div className="text-center">
              <ul className="font-mono text-xl text-white space-y-6">
                <li>
                  <span className="font-bold text-[#97ffb0] ">1st - Team Redemptiom</span><br />
                  <b> Case Title - Salah-Mate: Shariah compliant travel kit for muslim travellers  </b>
                  <br />
                  Shaker Abdullah <br />
                  Shahriar Zeem <br />
                  Fazle Ahnaf Khan<br />
                  Tahmid Islam Bhuiyan 
                </li>
                <li>
                  <span className="font-bold text-[#97ffb0] ">2nd - Team Ababil</span><br />
                  <b> Case Title - Branding with Barakah  </b>
                  210061129<br />
                  210012162<br />
                  210012130<br />
                  210012161
                </li>
                <li>
                  <span className="font-bold text-[#97ffb0] ">3rd - Team Nahwa Al-Fitrah</span><br />
                  <b> Case Title - A gender based values curriculumn  </b>
                  200041132<br />
                  200061102<br />
                </li>
                <li>
                  <span className="font-bold text-[#97ffb0] ">4th - Team Lote Tree</span><br />
                  <b> Case Title - Addiction: From Saqr to Qalb </b>
                  220041228<br />
                  220041241<br />
                </li>
                <li>
                  <span className="font-bold text-[#97ffb0] ">5th - Team One Tech</span><br />
                  <b> Case Title - One App : A Digital Solution for Muslim Ummah </b> 
                  <br />
                  Atik Shahriar<br />
                  Muammar Tajwar<br />
                  Sieam Shahriar<br />
                  Amir Al Razin<br />
                </li>
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
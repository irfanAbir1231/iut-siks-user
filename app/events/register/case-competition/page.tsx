export default function CaseCompetitionRegistration() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        {/* Left Section */}
        <div className="flex-1 flex flex-col space-y-8">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-extrabold text-green-900 dark:text-green-200 mb-2">
              Case Competition
            </h1>
            <h2 className="font-mono text-2xl md:text-3xl text-green-700 dark:text-green-300 mb-1">
              Registration
            </h2>
            <p className="font-sans text-lg text-gray-700 dark:text-gray-200">
              Annual IUT Seerah Fest 1446
            </p>
          </div>

          {/* Event Overview Section */}
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
              Explore real-world issues through the lens of Islam—address a
              social issue or design a Shariah-compliant business model.
            </p>
          </section>

          {/* Details Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-100 dark:bg-gray-900 rounded-2xl p-6 shadow border border-green-200 dark:border-gray-700">
              <h3 className="font-mono text-xl text-green-800 dark:text-green-200 mb-3 font-bold">
                Event Details
              </h3>
              <ul className="font-sans text-base text-gray-800 dark:text-gray-100 space-y-2 list-disc list-inside">
                <li>
                  <span className="font-bold">Eligibility:</span> Students of
                  IUT-OIC
                </li>
                <li>
                  <span className="font-bold">Team Size:</span> Up to 4 members
                </li>
                <li>
                  <span className="font-bold">Gender Segregation:</span> Only
                  all-male or all-female teams
                </li>
                <li>
                  <span className="font-bold">Registration Fee:</span> Free
                </li>
              </ul>
              <div className="mt-4">
                <h4 className="font-mono text-green-700 dark:text-green-300 font-semibold mb-1">
                  Case Options
                </h4>
                <ul className="ml-4 font-serif text-base text-gray-700 dark:text-gray-200 list-disc">
                  <li>
                    <span className="font-bold">A) Social Case</span> – Solve a
                    social issue with Islamic insight
                  </li>
                  <li>
                    <span className="font-bold">B) Business Case</span> –
                    Propose a Shariah-compliant business initiative
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-gray-800 rounded-2xl p-6 shadow border border-green-100 dark:border-gray-700 flex flex-col justify-between">
              <h3 className="font-mono text-xl text-green-800 dark:text-green-200 mb-3 font-bold">
                Competition Phases
              </h3>
              <ol className="font-sans text-base text-gray-800 dark:text-gray-100 list-decimal list-inside space-y-1">
                <li>
                  <span className="font-bold">Phase 1:</span> Document
                  submission
                </li>
                <li>
                  <span className="font-bold">Phase 2:</span> Final round:
                  Presentation & updated documents
                </li>
              </ol>
              <div className="mt-6 text-center">
                <a
                  href="https://drive.google.com/drive/folders/1nWb_8B1N9kmQF1-ggzzX45etV9Tn3Ych?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition-colors duration-150 text-base mt-2"
                >
                  📄 View Rulebook
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col space-y-8">
          {/* Deadline Section */}
          <section className="bg-gradient-to-r from-green-200 via-green-50 to-green-100 dark:from-green-900 dark:via-gray-800 dark:to-green-900 rounded-2xl p-6 shadow border border-green-100 dark:border-gray-700 flex items-center justify-center">
            <span className="font-mono text-lg md:text-xl text-green-900 dark:text-green-200 font-bold tracking-wide">
              🕒 Registration Deadline:{" "}
              <span className="underline decoration-green-600 dark:decoration-green-300">
                May 18, 2025
              </span>
            </span>
          </section>

          {/* Contact Section */}
          <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-green-100 dark:border-gray-700">
            <h3 className="font-serif text-2xl md:text-3xl text-green-800 dark:text-green-200 font-extrabold mb-8 text-center tracking-wide">
              Contact
            </h3>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
              {/* Contact Card 1 */}
              <div className="flex-1 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-md border border-green-200 dark:border-green-700 flex flex-col items-center mb-4 md:mb-0">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-2 shadow">
                    <span className="text-3xl font-bold text-green-700 dark:text-green-300">
                      MI
                    </span>
                  </div>
                  <span className="font-semibold font-mono text-green-800 dark:text-green-200 text-lg">
                    Mohammad Illin Rahman
                  </span>
                  <div className="flex flex-col gap-1 mt-2 text-center">
                    <a
                      href="mailto:illinrahman@iut-dhaka.edu"
                      className="inline-flex items-center gap-1 text-green-700 dark:text-green-300 underline font-sans hover:text-green-900 dark:hover:text-green-100 transition-colors"
                    >
                      <span>✉️</span> illinrahman@iut-dhaka.edu
                    </a>
                    <a
                      href="tel:+8801751636585"
                      className="inline-flex items-center gap-1 underline font-sans text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                    >
                      <span>📞</span> +8801751636585
                    </a>
                    <a
                      href="https://wa.me/8801576608666"
                      className="inline-flex items-center gap-1 underline font-sans text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors"
                    >
                      <span>📱</span> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
              {/* Contact Card 2 */}
              <div className="flex-1 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-md border border-green-200 dark:border-green-700 flex flex-col items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-2 shadow">
                    <span className="text-3xl font-bold text-green-700 dark:text-green-300">
                      MM
                    </span>
                  </div>
                  <span className="font-semibold font-mono text-green-800 dark:text-green-200 text-lg">
                    Mahmudul Hasan Mahi
                  </span>
                  <div className="flex flex-col gap-1 mt-2 text-center">
                    <a
                      href="mailto:mahmudulmahi@iut-dhaka.edu"
                      className="inline-flex items-center gap-1 text-green-700 dark:text-green-300 underline font-sans hover:text-green-900 dark:hover:text-green-100 transition-colors"
                    >
                      <span>✉️</span> mahmudulmahi@iut-dhaka.edu
                    </a>
                    <a
                      href="tel:+8801316171120"
                      className="inline-flex items-center gap-1 underline font-sans text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                    >
                      <span>📞</span> +8801316171120
                    </a>
                    <a
                      href="https://wa.me/8801316171120"
                      className="inline-flex items-center gap-1 underline font-sans text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors"
                    >
                      <span>📱</span> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Register Button Section */}
          <div className="mt-8 text-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSckt-mY7kJm7oo7Kd5m0bmh-74asYhM9_3SMLNCwB1_fPLsPw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-white font-extrabold font-serif shadow-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 text-2xl tracking-wide border-4 border-green-200 dark:border-green-800"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function CaseCompetitionRegistration() {
  return (
    <div className="min-h-screen bg-[#101c29] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl md:text-6xl font-extrabold text-[#97ffb0] mb-2">
            Case Competition
          </h1>
          <h2 className="font-mono text-2xl md:text-3xl text-[#6fff8b] mb-1">
            Registration
          </h2>
          <p className="font-sans text-lg text-[#b6e7c9]">
            Annual IUT Seerah Fest 1446
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Intro Section */}
          {/* <section className="bg-white/90 dark:bg-gray-800/90 shadow-xl rounded-3xl p-4 border border-green-100 dark:border-gray-700 inline-block w-fit text-center">
            <p className="font-sans text-lg text-gray-800 dark:text-gray-100 mb-2">
              Welcome to the official registration for the
              <span className="font-bold font-serif text-green-800 dark:text-green-200">
                Case Competition
              </span>
              at
              <span className="font-bold text-green-900 dark:text-green-100">
                IUT Seerah Fest 1446
              </span>
              , organized by the
              <span className="font-semibold text-green-700 dark:text-green-300">
                IUT Society of Islamic Knowledge Seekers (SIKS)
              </span>
              .
            </p>
            <p className="font-serif text-base text-gray-700 dark:text-gray-200 italic">
              Explore real-world issues through the lens of Islam—address a social issue or design a Shariah-compliant business model.
            </p>
          </section> */}
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
            <p className="font-serif text-lg text-[#b6e7c9] mt-2 text-center">
              Submission Deadline: <strong className="text-[#ff811a]">26 May 2025</strong>
            </p>
          </section>

          {/* Competition Phases Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-4 border border-[#2bff88]/20 inline-block w-fit">
            <h2 className="font-serif text-2xl md:text-3xl text-[#6fff8b] mb-2 text-center">
              Competition Phases
            </h2>
            <ul className="font-mono text-lg text-[#ffffff] list-decimal list-inside space-y-1">
              <li>Phase 1: Document submission</li>
              <li>Phase 2: Final round: Presentation & updated documents</li>
            </ul>
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

          {/* Deadline Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-8 border border-[#2bff88]/20">
            <h2 className="font-serif text-2xl md:text-3xl text-[#ff811a] mb-4 text-center">
              Submit Now
            </h2>
            <p className="font-mono text-lg text-[#b6e7c9] mb-4 text-center">
              Click the button below to access the submission form.
            </p>
            <div className="text-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfsqayt3JCta-IL4vf8Mj1Y9IwsxX9IgiYfuNOOCUzPZZJHVg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg bg-[#ff811a] text-[#101c29] font-bold shadow hover:bg-[#00e36a] transition-all"
              >
                Register
              </a>
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
            <ul className="font-mono text-lg text-[#b6e7c9] list-disc list-inside space-y-2">
              <li>Email: <a href="mailto:siks@iut-dhaka.edu" className="text-[#6fff8b] underline">siks@iut-dhaka.edu</a></li>
              <li>Phone: +880-1234-567890</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
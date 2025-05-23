export default function PosterDesignRegistration() {
  return (
    <div className="min-h-screen bg-[#101c29] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl md:text-6xl font-extrabold text-[#97ffb0] mb-2">
            Poster Design Competition
          </h1>
          <h2 className="font-mono text-2xl md:text-3xl text-[#6fff8b] mb-1">
            Registration
          </h2>
          <p className="font-sans text-lg text-[#b6e7c9]">
            Annual IUT Seerah Fest 1446
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Instructions Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-8 border border-[#2bff88]/20">
            <p className="font-serif text-lg text-[#e6fff1] mb-4 text-center">
              Welcome to the official registration for the Poster Designing Competition of Annual Seerah Fest 1446, organized by the IUT Society of Islamic Knowledge Seekers (SIKS).
            </p>
            <ul className="font-mono text-lg text-[#b6e7c9] list-disc list-inside space-y-2">
              <li>Eligibility: Students of IUT-OIC</li>
              <li>Registration Fee: Free</li>
              <li>Poster Size: 12 x 18 inches</li>
              <li>Do not include human or animal faces</li>
              <li>AI-generated designs will be disqualified</li>
            </ul>
            <p className="font-serif text-lg text-[#b6e7c9] mt-4 text-center">
              Submission Deadline: <strong className="text-[#6fff8b]">26 May 2025</strong>
            </p>
          </section>

          {/* Registration Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-8 border border-[#2bff88]/20">
            <h2 className="font-serif text-2xl md:text-3xl text-[#6fff8b] mb-4 text-center">
              Register Now
            </h2>
            <p className="font-mono text-lg text-[#b6e7c9] mb-4 text-center">
              Click the button below to access the registration form.
            </p>
            <div className="text-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfjdIvTYsrOLOB8fVxhzWsUsSbKa0c8k2RpCqwqBT-shgOhvg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg bg-[#1aff7c] text-[#101c29] font-bold shadow hover:bg-[#00e36a] transition-all"
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
export default function SeerahQuizRegistration() {
  return (
    <div className="min-h-screen bg-[#101c29] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl md:text-6xl font-extrabold text-[#97ffb0] mb-2">
            Seerah Quiz
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
          <section className="bg-white/90 dark:bg-gray-800/90 shadow-xl rounded-3xl p-8 border border-green-100 dark:border-gray-700">
            <p className="font-sans text-lg text-gray-800 dark:text-gray-100 mb-4 text-center">
              Welcome to the official registration for the{' '}
              <span className="font-bold font-serif text-green-800 dark:text-green-200">
                Seerah Quiz
              </span>{' '}
              at{' '}
              <span className="font-bold text-green-900 dark:text-green-100">
                IUT Seerah Fest 1446
              </span>, organized by the{' '}
              <span className="font-semibold text-green-700 dark:text-green-300">
                IUT Society of Islamic Knowledge Seekers (SIKS)
              </span>.
            </p>
            <p className="font-serif text-base text-gray-700 dark:text-gray-200 mb-4 text-center italic">
              Test your knowledge about the life and teachings of Prophet Muhammad
              (PBUH) in this engaging and competitive quiz. Sharpen your
              understanding of Seerah and compete for exciting prizes!
            </p>
          </section>
          {/* Event Details Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-4 border border-[#2bff88]/20 inline-block w-fit">
            <h2 className="font-serif text-2xl md:text-3xl text-[#6fff8b] mb-2 text-center">
              Event Details
            </h2>
            <ul className="font-mono text-lg text-[#ffffff] list-disc list-inside space-y-1">
              <li>Eligibility: Students of IUT-OIC</li>
              <li>Format: Individual participation</li>
              <li>Registration Fee: Free</li>
              <li>Prizes for top scorers</li>
            </ul>
            
          </section>

          {/* How It Works Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-4 border border-[#2bff88]/20 inline-block w-fit">
            <h2 className="font-serif text-2xl md:text-3xl text-[#6fff8b] mb-2 text-center">
              How It Works
            </h2>
            <ul className="font-mono text-lg text-[#ffffff] list-decimal list-inside space-y-1">
              <li>Register online using the form below.</li>
              <li>Attend the quiz session on the event date.</li>
              <li>Answer questions based on the Seerah of Prophet Muhammad (PBUH).</li>
              <li>Top scorers will be awarded exciting prizes.</li>
            </ul>
            <p className="font-serif text-lg text-[#b6e7c9] mt-2 text-center">
              Prepare well and give your best effort!
            </p>
          </section>

          {/* Winners Section */}
          <section className="bg-[#162235] shadow-xl rounded-3xl p-8 border border-[#2bff88]/20">
            <h2 className="font-serif text-2xl md:text-3xl text-[#ff811a] mb-4 text-center">
              Winners
            </h2>
            <p className="font-mono text-lg text-[#b6e7c9] mb-4 text-center">
              Congratulations to the top participants of Seerah Quiz!
            </p>
            <div className="text-center">
              <ul className="font-mono text-xl text-white space-y-2">
                <li>1st - Rafid Waihan Abid</li>
                <li>2nd - Hasan Ul Akib </li>
                <li>3rd - Md. Mushfiqul Islam </li>
                <li>4rd - Md Sajib Mahmud </li>
                <li>5th - Md Shahriar Hossain Shohag </li>
                <li>6th - Mahajib Tabassum </li>
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
            <p className="font-mono text-lg text-[#b6e7c9]">
              For any queries, reach out to the SIKS team:<br />
              <span className="font-bold">Email:</span> siks@iut-dhaka.edu<br />
              <span className="font-bold">Phone:</span> +880 1234-567890
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
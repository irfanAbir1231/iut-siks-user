export default function SeerahQuizRegistration() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Register for Seerah Quiz
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 mb-8">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdbmTh8DlKfbqbpiYiD7frKNLZNleut0q5QLyAZOGhxFZCjlw/viewform?embedded=true&hl=en"
            style={{ minHeight: 900, width: '100%', height: 1100 }}
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            title="Seerah Quiz Registration - Google Form"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
}
"use client";
// import { useUser, SignInButton } from "@clerk/nextjs";
import Image from "next/image";

export default function ProfilePage() {
  // Mocked user data to bypass authentication
  const { isSignedIn, user } = {
    isSignedIn: true,
    user: {
      fullName: "Mock User",
      username: "mockuser",
      imageUrl: "/iut-siks-logo.jpg", // Using a local asset as a placeholder
      emailAddresses: [{ emailAddress: "mock@example.com" }],
    },
  };

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
        {/* <SignInButton> */}
        <button className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition text-lg">
          Login
        </button>
        {/* </SignInButton> */}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-10">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        {user.imageUrl && (
          <Image
            src={user.imageUrl}
            alt="Profile picture"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full mb-4 border-4 border-green-200 dark:border-green-800 shadow"
            unoptimized
          />
        )}
        <h2 className="text-2xl font-bold mb-2 text-green-800 dark:text-green-200">
          {user.fullName || user.username || "User"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          {user.emailAddresses?.[0]?.emailAddress}
        </p>
        <div className="mt-6 w-full flex flex-col gap-2">
          {/* You can add more profile information or actions here in the future */}
        </div>
      </div>
    </div>
  );
}

import { NextResponse } from "next/server";

// Define an interface for the reminder.dev response
interface ReminderDevResponse {
  date: string;
  reminder?: {
    reminder?: string;
    nameOfAllah?: string;
  };
}

// Define an interface for the qurani.ai response
interface QuraniAIResponse {
  data?: {
    surah?: {
      name?: string;
    };
    numberInSurah?: number;
    text?: string;
    translation?: string;
  };
}

// Define an interface for the islamic-api response
interface HadithAPIResponse {
  hadith?: string;
}

export async function GET() {
  try {
    // Fetch all resources in parallel for better performance
    const [reminderRes, ayahRes, hadithRes] = await Promise.all([
      fetch("https://reminder.dev/api/daily", { cache: "no-store" }),
      fetch("https://api.qurani.ai/v1/ayah/random", { cache: "no-store" }),
      fetch("https://islamic-api-lyart.vercel.app/api/v1/hadith/random", {
        cache: "no-store",
      }),
    ]);

    // Check if any request failed
    if (!reminderRes.ok || !ayahRes.ok || !hadithRes.ok) {
      console.error("Failed to fetch from one or more services:", {
        reminder: reminderRes.status,
        quran: ayahRes.status,
        hadith: hadithRes.status,
      });
      throw new Error("One or more external API requests failed.");
    }

    // Parse JSON with the defined types
    const reminder = (await reminderRes.json()) as ReminderDevResponse;
    const ayah = (await ayahRes.json()) as QuraniAIResponse;
    const hadith = (await hadithRes.json()) as HadithAPIResponse;

    // Construct the final response with fallbacks for safety
    return NextResponse.json({
      date: reminder.date,
      suggestion:
        reminder.reminder?.reminder || "Keep your prayers consistent.",
      nameOfAllah: reminder.reminder?.nameOfAllah || "Ar-Rahman",
      quran: {
        surah_name: ayah?.data?.surah?.name || "Al-Fatiha",
        verse_number: ayah?.data?.numberInSurah || 1,
        text_arabic:
          ayah?.data?.text || "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation:
          ayah?.data?.translation ||
          "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      },
      hadith:
        hadith?.hadith ||
        'The Prophet (ﷺ) said, "The seeking of knowledge is obligatory for every Muslim."',
      source: {
        reminder: "reminder.dev",
        quran: "qurani.ai",
        hadith: "islamic-api-lyart.vercel.app",
      },
    });
  } catch (error) {
    // Correctly handle the error without using 'any'
    console.error("API Route Error:", error);
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        error: "Failed to fetch Islamic daily content",
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}

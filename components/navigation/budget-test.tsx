"use client";

import { useState } from "react";
import { BudgetPopup } from "./budget-popup";

const testItinerary = {
  title: "Delhi–Bikaner–Jaisalmer–Jodhpur 6N/7D",
  duration: 6,
  days: [
    {
      day: 1,
      title: "New Delhi to Jodhpur — Begin the Rajasthan Journey",
      description:
        "Start your journey from New Delhi and take a train to Jodhpur. After reaching the Blue City, check in to your stay and begin exploring the old city.",
      locations: [
        "New Delhi",
        "Jodhpur",
        "Clock Tower",
        "Sardar Market",
        "Blue City",
      ],
    },
    {
      day: 2,
      title: "Jodhpur — Mehrangarh Fort & Blue City",
      description:
        "Start the morning with a visit to Mehrangarh Fort and explore its grand palaces, courtyards and panoramic viewpoints overlooking Jodhpur.",
      locations: [
        "Mehrangarh Fort",
        "Jaswant Thada",
        "Blue City",
        "Jodhpur Old City",
      ],
    },
    {
      day: 3,
      title: "Jaisalmer — Golden Fort & Historic Old City",
      description:
        "Reach Jaisalmer and check in to your stay. Explore Jaisalmer Fort, Jain temples, Patwon Ki Haveli and Gadisar Lake.",
      locations: [
        "Jaisalmer",
        "Jaisalmer Fort",
        "Jain Temples",
        "Patwon Ki Haveli",
        "Gadisar Lake",
      ],
    },
    {
      day: 4,
      title: "Jaisalmer — Thar Desert Sunset & Camping",
      description:
        "Spend the morning exploring Jaisalmer before heading towards Sam Sand Dunes. Enjoy the desert sunset, camel ride or jeep safari and an overnight desert camp.",
      locations: [
        "Thar Desert",
        "Sam Sand Dunes",
        "Camel Safari",
        "Jeep Safari",
        "Desert Camp",
      ],
    },
    {
      day: 5,
      title: "Desert Sunrise, Kuldhara & Bada Bagh",
      description:
        "Wake up early for sunrise over the dunes. After breakfast, visit Kuldhara and Bada Bagh before continuing towards Bikaner.",
      locations: [
        "Sam Sand Dunes",
        "Kuldhara Village",
        "Bada Bagh",
        "Bikaner",
      ],
    },
    {
      day: 6,
      title: "Bikaner — Junagarh Fort & Old City",
      description:
        "Explore Junagarh Fort, Rampuria Havelis and the old city of Bikaner. Spend the evening exploring local markets and trying famous Bikaneri snacks.",
      locations: [
        "Bikaner",
        "Junagarh Fort",
        "Rampuria Havelis",
        "Bikaner Old City",
      ],
    },
    {
      day: 7,
      title: "Bikaner to New Delhi — Journey Home",
      description:
        "Start the final morning with a visit to Karni Mata Temple if your train schedule allows. Return to Bikaner and take a train back to New Delhi.",
      locations: [
        "Bikaner",
        "Karni Mata Temple",
        "Deshnok",
        "New Delhi",
      ],
    },
  ],
};

export function BudgetTest() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
      >
        Test Budget Planner
      </button>

      <BudgetPopup
        open={open}
        onClose={() => setOpen(false)}
        itinerary={testItinerary}
      />
    </>
  );
}
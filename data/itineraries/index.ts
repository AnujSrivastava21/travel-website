import type { Itinerary } from "../../types/itinerary";

export const itineraries: Itinerary[] = [
  // Delhi-Bikaner-Jaisalmer-Jodhpur-6n7d
  {
    id: "Delhi-Jodhpur-Jaisalmer-Bikaner-6n7d",
    slug: "Delhi-Bikaner-Jaisalmer-Jodhpur-6n7d",
    title: "Delhi–Bikaner–Jaisalmer–Jodhpur 6N/7D",
    destination: "Rajasthan",
    duration: 6,
    description:
      "A perfect one-week Rajasthan road-and-rail journey from New Delhi covering Bikaner, Jaisalmer and Jodhpur, with grand forts, royal havelis, desert landscapes, golden sunsets, local markets and the unique culture of western Rajasthan.",
    coverImage: "/images/iternery/jodhpurs.jpg",
    isPremium: false,
    price: 149,

     days: [
    {
      day: 1,
      title: "New Delhi to Jodhpur — Begin the Rajasthan Journey",
      description:
        "Start your journey from New Delhi and take a train to Jodhpur. After reaching the Blue City, check in to your stay and begin exploring the old city. Visit the Clock Tower and Sardar Market, walk through the famous blue lanes and enjoy local Rajasthani food. End the evening with a beautiful view of the Blue City before returning to your stay.",
      locations: [
        "New Delhi",
        "Jodhpur",
        "Clock Tower",
        "Sardar Market",
        "Blue City",
        "Jodhpur Old City",
      ],
    },

    {
      day: 2,
      title: "Jodhpur — Mehrangarh Fort & Blue City",
      description:
        "Start the morning with a visit to the magnificent Mehrangarh Fort and explore its grand palaces, courtyards, museums and panoramic viewpoints overlooking Jodhpur. Continue to Jaswant Thada and then explore more of the old blue lanes around the fort. Spend the afternoon at a local café or exploring the markets before taking an evening train or bus towards Jaisalmer.",
      locations: [
        "Jodhpur",
        "Mehrangarh Fort",
        "Jaswant Thada",
        "Blue City",
        "Jodhpur Old City",
        "Jaisalmer",
      ],
    },

    {
      day: 3,
      title: "Jaisalmer — Golden Fort & Historic Old City",
      description:
        "Reach Jaisalmer and check in to your stay. Begin exploring the Golden City with a visit to Jaisalmer Fort and its narrow golden lanes. Explore the beautiful Jain temples inside the fort before visiting Patwon Ki Haveli and other historic streets of the old city. In the evening, head towards Gadisar Lake and enjoy the golden-hour views before experiencing Jaisalmer's local food and atmosphere.",
      locations: [
        "Jaisalmer",
        "Jaisalmer Fort",
        "Jain Temples",
        "Patwon Ki Haveli",
        "Old Jaisalmer",
        "Gadisar Lake",
      ],
    },

    {
      day: 4,
      title: "Jaisalmer — Thar Desert Sunset & Camping",
      description:
        "Spend the morning exploring Jaisalmer at a relaxed pace before leaving for the Thar Desert in the afternoon. Head towards Sam Sand Dunes and experience the desert during golden hour. Enjoy a camel ride or jeep safari, watch the sunset over the dunes and stay overnight at a desert camp. Enjoy traditional Rajasthani food, folk music and dance before spending the night under the desert sky.",
      locations: [
        "Jaisalmer",
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
        "Wake up early for sunrise over the dunes and enjoy the peaceful desert morning. After breakfast, return towards Jaisalmer and visit Kuldhara, the famous abandoned village surrounded by the desert. Continue to Bada Bagh to see its beautiful royal cenotaphs before returning to Jaisalmer. Later, take an evening train or bus towards Bikaner.",
      locations: [
        "Sam Sand Dunes",
        "Jaisalmer",
        "Kuldhara Village",
        "Bada Bagh",
        "Bikaner",
      ],
    },

    {
      day: 6,
      title: "Bikaner — Junagarh Fort & Old City",
      description:
        "After reaching Bikaner, check in and leave your bags before exploring the city. Visit the impressive Junagarh Fort and explore its royal palaces, courtyards and museums. Later, walk through the old city and discover the beautiful Rampuria Havelis. Spend the evening exploring Bikaner's local markets and trying famous Bikaneri snacks before enjoying your final night in Rajasthan.",
      locations: [
        "Bikaner",
        "Junagarh Fort",
        "Rampuria Havelis",
        "Bikaner Old City",
        "Bikaneri Local Market",
      ],
    },

    {
      day: 7,
      title: "Bikaner to New Delhi — Journey Home",
      description:
        "Start the final morning with a visit to Karni Mata Temple at Deshnok if your train schedule allows. Return to Bikaner, have breakfast and pick up some famous Bikaneri snacks before checking out. Take a train back to New Delhi and end your Rajasthan journey after exploring three of western Rajasthan's most iconic cities.",
      locations: [
        "Bikaner",
        "Karni Mata Temple",
        "Deshnok",
        "Bikaner",
        "New Delhi",
      ],
    },
  ],
  },
// Jaisalmer-Winter-4n5d
  {
    id: "Jaisalmer-Winter-4n5d",
    slug: "Jaisalmer-Winter-4n5d",
    title: "Jaisalmer Winter 4N/5D",
    destination: "Jaisalmer, Rajasthan",
    duration: 4,
    description:
      "A perfect winter escape through the Golden City of Jaisalmer, covering historic havelis, the magnificent Jaisalmer Fort, desert landscapes, golden-hour sunsets, Sam Sand Dunes and an unforgettable night under the stars.",
    coverImage: "/images/iternery/jaislmer_winter.jpg",
    isPremium: false,
    price: 149,

    days: [
      {
        day: 1,
        title: "Explore the Golden City — Fort, Havelis & Ghats",
        description:
          "Reach Jaisalmer in the morning, check in and leave your bags at the hostel or hotel. Start your first day around noon with Jaisalmer Fort, one of the few living forts in the world. Explore the narrow lanes, Jain temples and beautiful viewpoints inside the fort. Later, walk through the old city and visit Patwon Ki Haveli, Nathmal Ki Haveli and Salim Singh Ki Haveli. End the evening at Gadisar Lake and watch the golden sunset over the water.",
        locations: [
          "Jaisalmer",
          "Jaisalmer Fort",
          "Jain Temples",
          "Patwon Ki Haveli",
          "Nathmal Ki Haveli",
          "Salim Singh Ki Haveli",
          "Gadisar Lake",
        ],
      },

      {
        day: 2,
        title: "Desert Adventure — Sam Sand Dunes Sunset & Camping",
        description:
          "Start the day slowly and explore a few local streets, cafes and markets before leaving for the Thar Desert in the afternoon. Head towards Sam Sand Dunes and experience the desert during golden hour. Enjoy a camel ride or jeep safari across the dunes and watch the sunset from the desert. Stay overnight at a desert camp, enjoy traditional Rajasthani food and folk performances, and spend some time under the winter night sky.",
        locations: [
          "Jaisalmer",
          "Thar Desert",
          "Sam Sand Dunes",
          "Camel Safari",
          "Jeep Safari",
          "Desert Camp",
        ],
      },

      {
        day: 3,
        title: "Desert Sunrise & Kuldhara Village",
        description:
          "Wake up early to watch the sunrise over the dunes before returning to Jaisalmer. After breakfast, visit the abandoned village of Kuldhara and explore its old ruins and desert surroundings. Continue towards Khuri Village for a quieter desert experience away from the busiest tourist areas. Return to Jaisalmer by evening and spend the night exploring the local market and trying traditional Rajasthani food.",
        locations: [
          "Sam Sand Dunes",
          "Kuldhara Village",
          "Khuri Village",
          "Jaisalmer",
          "Jaisalmer Local Market",
        ],
      },

      {
        day: 4,
        title: "Slow Jaisalmer — Bada Bagh & Sunset Views",
        description:
          "Keep the morning relaxed and explore any places you missed in the old city. Later, head towards Bada Bagh to see the beautiful royal cenotaphs surrounded by the desert landscape. Spend the afternoon exploring the outskirts of Jaisalmer and return to the city before sunset. End your final evening with a rooftop dinner overlooking the illuminated Jaisalmer Fort.",
        locations: [
          "Jaisalmer",
          "Bada Bagh",
          "Royal Cenotaphs",
          "Jaisalmer Fort",
          "Jaisalmer Rooftop Cafes",
        ],
      },

      {
        day: 5,
        title: "Golden Morning & Departure",
        description:
          "Wake up early for one final walk through the quiet streets of Jaisalmer. Enjoy breakfast, pick up some local handicrafts or snacks from the market, check out and begin your journey back home.",
        locations: ["Jaisalmer", "Jaisalmer Fort", "Local Market"],
      },
    ],
  },

  //kashmir-autumn"
  {
    id: "kashmir-autumn",
    slug: "kashmir-slow-travel",
    title: "Kashmir in Autumn",
    destination: "Kashmir",
    duration: 5,
    description:
      "A slow autumn journey through Srinagar and Kargil, planned around golden chinar trees, peaceful mornings, Dal Lake and the changing landscapes of Kashmir.",

    coverImage: "/images/iternery/kashmirs.jpg",

    isPremium: true,
    price: 199,

    days: [
      {
        day: 1,
        title: "Delhi → Jammu → Srinagar",
        description:
          "Take an overnight train from New Delhi to Jammu Tawi and continue towards Srinagar by Vande Bharat. Depending on the train you choose, you can reach Srinagar around midday or in the evening. Check into a hotel near Dal Lake or Dal Gate so you can easily explore the lake and catch the next morning’s views.",
        locations: ["New Delhi", "Jammu Tawi", "Srinagar", "Dal Lake"],
      },

      {
        day: 2,
        title: "Srinagar — Autumn Morning",
        description:
          "Start early, ideally before sunrise, to experience Srinagar at its most peaceful. Visit Dal Lake and the nearby Mughal gardens such as Nishat Bagh and Shalimar Bagh, where autumn brings golden and reddish tones to the chinar trees. Spend some time around the local markets and lakefront, and keep the afternoon relaxed for exploring Srinagar at your own pace.",
        locations: ["Srinagar", "Dal Lake", "Nishat Bagh", "Shalimar Bagh"],
      },

      {
        day: 3,
        title: "Srinagar — Chinar & Local Exploration",
        description:
          "Use the morning for another photography session if the previous day’s light or autumn colours were not perfect. Explore areas around Srinagar with beautiful chinar trees, quiet streets and local markets. The idea is to keep this day flexible rather than rushing between places, giving you more chances to capture the reddish autumn colours and peaceful side of Kashmir.",
        locations: ["Srinagar", "Dal Lake", "Old Srinagar"],
      },

      {
        day: 4,
        title: "Srinagar → Kargil",
        description:
          "Take an early morning bus from Srinagar towards Kargil. The journey itself becomes part of the experience as the landscape gradually changes from the green Kashmir Valley to the dramatic mountains around Sonamarg, Zoji La, Drass and Kargil. Spend the evening exploring Kargil locally and stay overnight.",
        locations: ["Srinagar", "Sonamarg", "Zoji La", "Drass", "Kargil"],
      },

      {
        day: 5,
        title: "Kargil → Srinagar → Jammu → Delhi",
        description:
          "Start the return journey early from Kargil towards Srinagar and continue to Jammu Tawi. From Jammu, take a late-night train towards New Delhi. This makes the final day a long travel day, but it allows you to complete the Kashmir and Kargil route within five days and return to Delhi without adding another night.",
        locations: ["Kargil", "Srinagar", "Jammu Tawi", "New Delhi"],
      },
    ],
  },

  //delhi-Varanasi-2n3d
  {
    id: "Delhi-Varanasi-2n3d",
    slug: "Delhi-Varanasi-2n3d",
    title: "Delhi–Varanasi 2N/3D",
    destination: "Varanasi, Uttar Pradesh",
    duration: 2,
    description:
      "A soulful 3-day journey from New Delhi to Varanasi, exploring the ancient ghats, narrow lanes, temples, Ganga Aarti, sunrise boat rides, local markets and the spiritual heart of Kashi.",
    coverImage: "/images/iternery/kashi.jpg",
    isPremium: false,
    price: 149,

    days: [
      {
        day: 1,
        title: "Arrive in Varanasi — Ghats, Old City & Ganga Aarti",
        description:
          "Take an overnight train from New Delhi and reach Varanasi in the morning. Check in, leave your bags and start exploring the old city around noon. Walk through the narrow lanes of Kashi and explore Kashi Vishwanath Temple and the nearby ghats. In the evening, walk towards Dashashwamedh Ghat to witness the famous Ganga Aarti. After the aarti, explore the lively Godowlia market and try some local Banarasi food.",
        locations: [
          "New Delhi",
          "Varanasi",
          "Kashi Vishwanath Temple",
          "Dashashwamedh Ghat",
          "Godowlia Market",
          "Old Varanasi",
        ],
      },

      {
        day: 2,
        title: "Banaras at Sunrise — Boat Ride",
        description:
          "Wake up before sunrise and take a boat ride along the Ganga as the ghats slowly come alive. Start your morning at Assi Ghat and experience the peaceful atmosphere and morning Aarti. After the boat ride, explore the ghats on foot through the old lanes of Kashi. Don’t miss Lalita Ghat, Panchganga Ghat, Ganesh Ghat, Manikarnika Ghat, Harishchandra Ghat and Namo Ghat, each offering a different glimpse of life along the Ganga. In the evening, head to Godowlia Market and experience the energy of the busy lanes at night. And while exploring the ghats, don’t miss a hot glass of lemon tea — a simple but unforgettable part of the Kashi experience.",
        locations: [
          "Assi Ghat",
          "Ganga Sunrise Boat Ride",
          "Manikarnika Ghat",
          "Lalita Ghat",
          "Namo Ghat",
        ],
      },

      {
        day: 3,
        title: "Morning Bliss in Banaras & Departure",
        description:
          "Wake up early once again and spend a quiet morning around Assi Ghat. Experience the morning rituals, walk along the riverside and enjoy a traditional Banarasi breakfast. Take one final walk through the old lanes and pick up Banarasi silk, handicrafts or local sweets before checking out. Begin your journey back to New Delhi in the afternoon or evening.",
        locations: [
          "Assi Ghat",
          "Ganga Ghats",
          "Banarasi Breakfast",
          "Godowlia Market",
          "Varanasi",
          "New Delhi",
        ],
      },
    ],
  },

  //delhi-zanskar-4-days
  {
    id: "delhi-zanskar-4-days",
    slug: "delhi-zanskar-4-days",
    title: "Delhi to Zanskar — 3N/4D Road Trip Under 10K",
    destination: "Zanskar, Ladakh",
    duration: 4,
    description:
      "A high-altitude road journey from Delhi through Sissu, Jispa and Keylong, continuing towards the dramatic landscapes of Zanskar.",
    coverImage: "/images/iternery/zanskar.jpg",
    isPremium: true,
    price: 149,

    days: [
      {
        day: 1,
        title: "Delhi to Manali",
        description:
          "Take an overnight bus from Delhi to Manali. Give your body some time to acclimatize, so there is no need to rush. Relax and explore Manali, Old Manali, the temples, and the riverside views.",
        locations: ["Delhi", "Manali"],
      },
      {
        day: 2,
        title: "Towards Zanskar — Stay at Gonbo Rongjon Base Camp",
        description:
          "Start your journey early in the morning from Manali. The ride is around 150 km and takes approximately 6–7 hours, so start early. Stay at the Gonbo Rongjon Base Camp and experience the real beauty of the mountains. Don't miss the stargazing after midnight. Temperatures can drop below zero, so bring warm clothes. The camp costs around ₹1,500 per person, and there is no internet connection, so carry enough cash.",
        locations: ["Manali", "Zanskar"],
      },
      {
        day: 3,
        title: "Zanskar to Manali",
        description:
          "Start your journey early from the camp so you have enough time to explore the hidden gem of Jispa. Visit Keylong and its monastery, and don't forget to stop for a coffee while enjoying the beautiful views around Sissu Lake.",
        locations: ["Zanskar", "Jispa", "Keylong", "Sissu"],
      },
      {
        day: 4,
        title: "Manali to Delhi",
        description:
          "Return your rented Bullet at around 5 PM. After covering nearly 10 hours of riding, you can either stay in Manali for another night or, if you still have time and energy, take an overnight bus back to Delhi.",
        locations: ["Manali", "Delhi"],
      },
    ],
  },
  //udaipur-weekend-plan
  {
    id: "udaipur-weekend-plan",
    slug: "udaipur-weekend",
    title: "Udaipur — 3 Day Weekend Itinerary",
    destination: "Udaipur, Rajasthan",
    duration: 3,
    description:
      "A relaxed three-day itinerary covering Udaipur's lakes, old streets and cultural experiences.",
    coverImage: "/images/iternery/udaipurs.jpg",
    isPremium: false,
    days: [
  {
    day: 1,
    title: "Udaipur — Ghats, Lakes & City Palace",
    description:
      "Start your morning at Gangaur Ghat and then walk towards Ambrai Ghat to enjoy beautiful views of Lake Pichola and the City Palace. Spend some time around the old streets and lake area before taking a break for local food. In the evening, make sure you reach City Palace around 5 PM so you can explore the palace museum and experience the beautiful sunset shades over Udaipur. After sunset, spend some time around the nearby lake area before wrapping up your first day.",
    locations: ["Gangaur Ghat", "Ambrai Ghat", "Lake Pichola", "City Palace"],
  },

  {
    day: 2,
    title: "Bahubali Hills, Monsoon & Kumbhalgarh",
    description:
      "Start early and rent a scooty or take a cab towards Bahubali Hills for beautiful panoramic views over the surrounding lakes and hills. After spending some time there, continue towards the Monsoon Palace and enjoy the changing landscapes around Udaipur. Later, head towards Kumbhalgarh and explore the magnificent Kumbhalgarh Fort and its historic palace complex. Take your time exploring the fort before returning to Udaipur by evening.",
    locations: ["Bahubali Hills", "Monsoon Palace", "Kumbhalgarh Fort", "Udaipur"],
  },

  {
    day: 3,
    title: "Local Streets, Food & Departure",
    description:
      "Spend your final morning exploring the local markets and colourful streets of Udaipur. Take your time trying authentic Rajasthani food, shopping for local items and visiting any nearby places you may have missed. Keep the day relaxed so you can enjoy the city without rushing, and later begin your journey back to your hometown.",
    locations: ["Udaipur Local Market", "Udaipur"],
  },
],
  },
// spiti-valley-10-days
  {
    id: "spiti-valley-10-days",
    slug: "spiti-valley-10-days",
    title: "Spiti Valley — 10 Day Complete Itinerary",
    destination: "Spiti Valley, Himachal Pradesh",
    duration: 10,
    description:
      "A practical road-trip itinerary covering the major villages, landscapes and experiences of Spiti Valley.",
    coverImage: "/images/destinations/spiti.jpg",
    isPremium: true,
    days: [
      {
        day: 1,
        title: "Delhi to Shimla",
        description:
          "Start the journey from Delhi and reach Shimla by overnight bus.",
        locations: ["Delhi", "Shimla"],
      },
      {
        day: 2,
        title: "Shimla to Chitkul",
        description:
          "Travel towards Kinnaur and explore the beautiful village of Chitkul.",
        locations: ["Shimla", "Rampur", "Sangla", "Chitkul"],
      },
      {
        day: 3,
        title: "Chitkul to Kalpa",
        description: "Continue through the Kinnaur Valley towards Kalpa.",
        locations: ["Chitkul", "Sangla", "Kalpa"],
      },
      {
        day: 4,
        title: "Kalpa to Nako",
        description:
          "Enter the high-altitude landscape of Spiti through Kinnaur.",
        locations: ["Kalpa", "Kinnaur", "Nako"],
      },
      {
        day: 5,
        title: "Nako to Kaza",
        description: "Explore Tabo and Dhankar before reaching Kaza.",
        locations: ["Nako", "Tabo", "Dhankar", "Kaza"],
      },
      {
        day: 6,
        title: "Kaza Exploration",
        description:
          "Explore Kaza and experience the local side of Spiti Valley.",
        locations: ["Kaza"],
      },
      {
        day: 7,
        title: "Komic, Hikkim & Langza",
        description: "Visit some of Spiti's famous high-altitude villages.",
        locations: ["Komic", "Hikkim", "Langza"],
      },
      {
        day: 8,
        title: "Key, Kibber & Chicham",
        description:
          "Explore the famous monastery, villages and one of the world's highest bridges.",
        locations: ["Key Monastery", "Kibber", "Chicham"],
      },
      {
        day: 9,
        title: "Kaza to Chandratal",
        description: "Travel towards the spectacular Chandratal Lake.",
        locations: ["Kaza", "Losar", "Chandratal"],
      },
      {
        day: 10,
        title: "Chandratal to Manali",
        description: "Complete the Spiti circuit and travel towards Manali.",
        locations: ["Chandratal", "Batal", "Rohtang", "Manali"],
      },
    ],
  },
// kerala-7-day
  // {
  //   id: "kerala-7-days",
  //   slug: "kerala-7-days",
  //   title: "Kerala — 7 Day Complete Itinerary",
  //   destination: "Kerala",
  //   duration: 7,
  //   description:
  //     "A relaxed Kerala journey covering backwaters, beaches, villages and local experiences.",
  //   coverImage: "/images/iternery/kerla.jpg",
  //   isPremium: false,
  //   price: 149,

  //   days: [
  //     {
  //       day: 1,
  //       title: "Arrive in Kochi",
  //       description: "Arrive in Kochi and explore the local surroundings.",
  //       locations: ["Kochi"],
  //     },

  //     {
  //       day: 2,
  //       title: "Kochi to Alleppey",
  //       description: "Travel towards Alleppey and experience the backwaters.",
  //       locations: ["Kochi", "Alleppey"],
  //     },

  //     // Add remaining days...
  //   ],
  // },
// delhi-kalpa-4-days
  {
    id: "delhi-kalpa-4-days",
    slug: "delhi-kalpa-4-days",
    title: "Delhi to Kalpa — 3N/4D Road Trip",
    destination: "Kalpa, Himachal Pradesh",
    duration: 4,
    description:
      "A scenic road trip from Delhi to Kalpa through Shimla and Kinnaur, featuring mountain roads, Kinnaur Kailash views, local food, temples, villages, and unforgettable Himalayan landscapes.",
    coverImage: "/images/iternery/kalpa.jpg",
    isPremium: false,
    price: 149,

    days: [
      {
        day: 1,
        title: "Delhi to Shimla",
        description:
          "Travel from Delhi to Shimla and spend the evening exploring Mall Road, Christ Church, and the local streets. Grab a pastry and enjoy the mountain vibe, but don't explore too much—you have a long journey ahead the next day.",
        locations: ["Delhi", "Shimla"],
      },

      {
        day: 2,
        title: "Shimla to Kalpa via Kinnaur Gateway",
        description:
          "Start your journey early so you can reach Kalpa by evening. Don't forget to stop at the famous Kinnaur Gateway and capture some pictures. The dramatic mountain roads make this journey an adventurous and thrilling experience. Once you arrive in Kalpa, stay at a homestay or hotel. Pre-booking is recommended, while Zostel Kalpa is a great option for its views of the Kinnaur Kailash Shivling when the weather is clear.",
        locations: ["Shimla", "Kinnaur Gateway", "Kalpa"],
      },

      {
        day: 3,
        title: "Explore Kalpa & Roghi Village",
        description:
          "Start your day by visiting the Kalpa temple, where the famous Rukmini/Raulane festival is celebrated, followed by the monastery. Stop at Negi's Sister's Cafe for momos and try traditional Himachali food such as siddu. Later, visit Roghi Village and the famous Suicide Point. You can also explore the local temple and surrounding village. Most of Kalpa's main attractions can be covered comfortably in one day.",
        locations: ["Kalpa", "Roghi Village"],
      },

      {
        day: 4,
        title: "Kalpa to Delhi",
        description:
          "Start your journey early for the return trip to Delhi. If you want to avoid a long and tiring journey in one go, you can stay overnight in Narkanda or Kufri and continue towards Delhi the next day. Otherwise, take the direct route back to Delhi.",
        locations: ["Kalpa", "Narkanda", "Kufri", "Delhi"],
      },
    ],
  },
// udaipur-chittorgarh-kumbhalgarh-4-days
  // {
  //   id: "udaipur-chittorgarh-kumbhalgarh-4-days",
  //   slug: "udaipur-chittorgarh-kumbhalgarh-4-days",
  //   title:
  //     "Skip Jaipur Try Udaipur, Chittorgarh & Kumbhalgarh — 3N/4D Weekend Plan",
  //   destination: "Udaipur, Rajasthan",
  //   duration: 4,
  //   description:
  //     "A perfect long-weekend journey through Udaipur, Kumbhalgarh and Chittorgarh, covering lakes, palaces, forts, temples, local food and unforgettable sunset views.",
  //   coverImage: "/images/iternery/chittaurgarh.jpg",
  //   isPremium: false,
  //   price: 149,
  //   days: [
  //     {
  //       day: 1,
  //       title: "Explore Udaipur — Ghats, Bahubali Hills & City Palace",
  //       description:
  //         "Reach Udaipur early in the morning, drop your bags at the hotel, and start exploring around 12 PM. Begin with Gangaur Ghat and Ambrai Ghat, and don't forget to try some local Rajasthani food. Later, head to Bahubali Hills and Monsoon Palace. Try to finish these spots by around 5 PM and make sure you are back in the city before sunset. Watch the sunset from City Palace—the palace looks especially beautiful during golden hour.",
  //       locations: [
  //         "Udaipur",
  //         "Gangaur Ghat",
  //         "Ambrai Ghat",
  //         "Bahubali Hills",
  //         "Monsoon Palace",
  //         "City Palace",
  //       ],
  //     },
  //     {
  //       day: 2,
  //       title: "Kumbhalgarh & Haldighati Day Trip",
  //       description:
  //         "Start your journey early and head towards Kumbhalgarh. On the way, explore Haldighati, including the Haldighati Museum and Chetak Smarak. Continue to Kumbhalgarh Fort and explore its impressive walls and mountain surroundings. After sightseeing, return to Udaipur and spend the evening exploring a local temple or the city.",
  //       locations: [
  //         "Udaipur",
  //         "Haldighati",
  //         "Haldighati Museum",
  //         "Chetak Smarak",
  //         "Kumbhalgarh Fort",
  //       ],
  //     },
  //     {
  //       day: 3,
  //       title: "Udaipur to Chittorgarh by Train",
  //       description:
  //         "Leave Udaipur early and take a train to Chittorgarh. The journey is around 80 km. From Chittorgarh Railway Station, take a local auto to the fort. Explore the massive Chittorgarh Fort and its historic landmarks, including Meera Bai Temple, Rana Ratan Singh Palace, Rani Padmini's Palace, and the Gora-Badal Palace. Don't miss the sunset inside the fort. After exploring, return to the railway station and take your train back.",
  //       locations: [
  //         "Udaipur",
  //         "Chittorgarh",
  //         "Chittorgarh Fort",
  //         "Meera Bai Temple",
  //         "Rana Ratan Singh Palace",
  //         "Rani Padmini Palace",
  //         "Gora-Badal Palace",
  //       ],
  //     },
  //     {
  //       day: 4,
  //       title: "Slow Morning in Udaipur & Departure",
  //       description:
  //         "Keep the final morning relaxed. Enjoy breakfast, explore any nearby place you missed, grab some local food, and then begin your journey back home.",
  //       locations: ["Udaipur"],
  //     },
  //   ],
  // },
  // madurai-kanyakumari-rameshwaram-7-days
  // {
  //   id: "madurai-kanyakumari-rameshwaram-7-days",
  //   slug: "madurai-kanyakumari-rameshwaram-7-days",
  //   title: "Madurai-Kanyakumari-Rameshwaram 1 Week Plan",
  //   destination: "Rameshwaram,Madurai,Kanyakumari, Tamil Nadu",
  //   duration: 4,
  //   description:
  //     "A perfect long-weekend journey through Udaipur, Kumbhalgarh and Chittorgarh, covering lakes, palaces, forts, temples, local food and unforgettable sunset views.",
  //   coverImage: "/images/iternery/rameshwarams.jpg",
  //   isPremium: false,
  //   price: 149,

  //   days: [
  //     {
  //       day: 1,
  //       title: "Explore Udaipur — Ghats, Bahubali Hills & City Palace",
  //       description:
  //         "Reach Udaipur early in the morning, drop your bags at the hotel, and start exploring around 12 PM. Begin with Gangaur Ghat and Ambrai Ghat, and don't forget to try some local Rajasthani food. Later, head to Bahubali Hills and Monsoon Palace. Try to finish these spots by around 5 PM and make sure you are back in the city before sunset. Watch the sunset from City Palace—the palace looks especially beautiful during golden hour.",
  //       locations: [
  //         "Udaipur",
  //         "Gangaur Ghat",
  //         "Ambrai Ghat",
  //         "Bahubali Hills",
  //         "Monsoon Palace",
  //         "City Palace",
  //       ],
  //     },

  //     {
  //       day: 2,
  //       title: "Kumbhalgarh & Haldighati Day Trip",
  //       description:
  //         "Start your journey early and head towards Kumbhalgarh. On the way, explore Haldighati, including the Haldighati Museum and Chetak Smarak. Continue to Kumbhalgarh Fort and explore its impressive walls and mountain surroundings. After sightseeing, return to Udaipur and spend the evening exploring a local temple or the city.",
  //       locations: [
  //         "Udaipur",
  //         "Haldighati",
  //         "Haldighati Museum",
  //         "Chetak Smarak",
  //         "Kumbhalgarh Fort",
  //       ],
  //     },

  //     {
  //       day: 3,
  //       title: "Udaipur to Chittorgarh by Train",
  //       description:
  //         "Leave Udaipur early and take a train to Chittorgarh. The journey is around 80 km. From Chittorgarh Railway Station, take a local auto to the fort. Explore the massive Chittorgarh Fort and its historic landmarks, including Meera Bai Temple, Rana Ratan Singh Palace, Rani Padmini's Palace, and the Gora-Badal Palace. Don't miss the sunset inside the fort. After exploring, return to the railway station and take your train back.",
  //       locations: [
  //         "Udaipur",
  //         "Chittorgarh",
  //         "Chittorgarh Fort",
  //         "Meera Bai Temple",
  //         "Rana Ratan Singh Palace",
  //         "Rani Padmini Palace",
  //         "Gora-Badal Palace",
  //       ],
  //     },

  //     {
  //       day: 4,
  //       title: "Slow Morning in Udaipur & Departure",
  //       description:
  //         "Keep the final morning relaxed. Enjoy breakfast, explore any nearby place you missed, grab some local food, and then begin your journey back home.",
  //       locations: ["Udaipur"],
  //     },
  //   ],
  // },
// guwahati-shillong-dawki-7-days
  // {
  //   id: "guwahati-shillong-dawki-7-days",
  //   slug: "guwahati-shillong-dawki-7-days",
  //   title: "Guwahati Shillong Dawki in 1 Week",
  //   destination: "Guwahati, Meghalaya",
  //   duration: 4,
  //   description:
  //     "A perfect long-weekend journey through Udaipur, Kumbhalgarh and Chittorgarh, covering lakes, palaces, forts, temples, local food and unforgettable sunset views.",
  //   coverImage: "/images/iternery/shillong.jpg",
  //   isPremium: false,
  //   price: 149,

  //   days: [
  //     {
  //       day: 1,
  //       title: "Explore Udaipur — Ghats, Bahubali Hills & City Palace",
  //       description:
  //         "Reach Udaipur early in the morning, drop your bags at the hotel, and start exploring around 12 PM. Begin with Gangaur Ghat and Ambrai Ghat, and don't forget to try some local Rajasthani food. Later, head to Bahubali Hills and Monsoon Palace. Try to finish these spots by around 5 PM and make sure you are back in the city before sunset. Watch the sunset from City Palace—the palace looks especially beautiful during golden hour.",
  //       locations: [
  //         "Udaipur",
  //         "Gangaur Ghat",
  //         "Ambrai Ghat",
  //         "Bahubali Hills",
  //         "Monsoon Palace",
  //         "City Palace",
  //       ],
  //     },

  //     {
  //       day: 2,
  //       title: "Kumbhalgarh & Haldighati Day Trip",
  //       description:
  //         "Start your journey early and head towards Kumbhalgarh. On the way, explore Haldighati, including the Haldighati Museum and Chetak Smarak. Continue to Kumbhalgarh Fort and explore its impressive walls and mountain surroundings. After sightseeing, return to Udaipur and spend the evening exploring a local temple or the city.",
  //       locations: [
  //         "Udaipur",
  //         "Haldighati",
  //         "Haldighati Museum",
  //         "Chetak Smarak",
  //         "Kumbhalgarh Fort",
  //       ],
  //     },

  //     {
  //       day: 3,
  //       title: "Udaipur to Chittorgarh by Train",
  //       description:
  //         "Leave Udaipur early and take a train to Chittorgarh. The journey is around 80 km. From Chittorgarh Railway Station, take a local auto to the fort. Explore the massive Chittorgarh Fort and its historic landmarks, including Meera Bai Temple, Rana Ratan Singh Palace, Rani Padmini's Palace, and the Gora-Badal Palace. Don't miss the sunset inside the fort. After exploring, return to the railway station and take your train back.",
  //       locations: [
  //         "Udaipur",
  //         "Chittorgarh",
  //         "Chittorgarh Fort",
  //         "Meera Bai Temple",
  //         "Rana Ratan Singh Palace",
  //         "Rani Padmini Palace",
  //         "Gora-Badal Palace",
  //       ],
  //     },

  //     {
  //       day: 4,
  //       title: "Slow Morning in Udaipur & Departure",
  //       description:
  //         "Keep the final morning relaxed. Enjoy breakfast, explore any nearby place you missed, grab some local food, and then begin your journey back home.",
  //       locations: ["Udaipur"],
  //     },
  //   ],
  // },
// gangtok-darjeeling-yumthang-7-days
  // {
  //   id: "gangtok-darjeeling-yumthang-7-days",
  //   slug: "gangtok-darjeeling-yumthang-7-days",
  //   title: "Gangtok - Darjeeling - Yumthang Valley — 1 Week Plan",
  //   destination: "Sikkim,West Bengal, Sikkim",
  //   duration: 4,
  //   description:
  //     "A perfect long-weekend journey through Udaipur, Kumbhalgarh and Chittorgarh, covering lakes, palaces, forts, temples, local food and unforgettable sunset views.",
  //   coverImage: "/images/iternery/gangtok.jpg",
  //   isPremium: false,
  //   price: 149,

  //   days: [
  //     {
  //       day: 1,
  //       title: "Explore Udaipur — Ghats, Bahubali Hills & City Palace",
  //       description:
  //         "Reach Udaipur early in the morning, drop your bags at the hotel, and start exploring around 12 PM. Begin with Gangaur Ghat and Ambrai Ghat, and don't forget to try some local Rajasthani food. Later, head to Bahubali Hills and Monsoon Palace. Try to finish these spots by around 5 PM and make sure you are back in the city before sunset. Watch the sunset from City Palace—the palace looks especially beautiful during golden hour.",
  //       locations: [
  //         "Udaipur",
  //         "Gangaur Ghat",
  //         "Ambrai Ghat",
  //         "Bahubali Hills",
  //         "Monsoon Palace",
  //         "City Palace",
  //       ],
  //     },

  //     {
  //       day: 2,
  //       title: "Kumbhalgarh & Haldighati Day Trip",
  //       description:
  //         "Start your journey early and head towards Kumbhalgarh. On the way, explore Haldighati, including the Haldighati Museum and Chetak Smarak. Continue to Kumbhalgarh Fort and explore its impressive walls and mountain surroundings. After sightseeing, return to Udaipur and spend the evening exploring a local temple or the city.",
  //       locations: [
  //         "Udaipur",
  //         "Haldighati",
  //         "Haldighati Museum",
  //         "Chetak Smarak",
  //         "Kumbhalgarh Fort",
  //       ],
  //     },

  //     {
  //       day: 3,
  //       title: "Udaipur to Chittorgarh by Train",
  //       description:
  //         "Leave Udaipur early and take a train to Chittorgarh. The journey is around 80 km. From Chittorgarh Railway Station, take a local auto to the fort. Explore the massive Chittorgarh Fort and its historic landmarks, including Meera Bai Temple, Rana Ratan Singh Palace, Rani Padmini's Palace, and the Gora-Badal Palace. Don't miss the sunset inside the fort. After exploring, return to the railway station and take your train back.",
  //       locations: [
  //         "Udaipur",
  //         "Chittorgarh",
  //         "Chittorgarh Fort",
  //         "Meera Bai Temple",
  //         "Rana Ratan Singh Palace",
  //         "Rani Padmini Palace",
  //         "Gora-Badal Palace",
  //       ],
  //     },

  //     {
  //       day: 4,
  //       title: "Slow Morning in Udaipur & Departure",
  //       description:
  //         "Keep the final morning relaxed. Enjoy breakfast, explore any nearby place you missed, grab some local food, and then begin your journey back home.",
  //       locations: ["Udaipur"],
  //     },
  //   ],
  // },
// chandratal-3n4d
  // {
  //   id: "chandratal-3n4d",
  //   slug: "chandratal-3n4d",
  //   title: "Skip Manali - Sissu, Try Chandratal Lake — 3N/4D Weekend Plan",
  //   destination: "Chandratal,Himachal Pradesh",
  //   duration: 4,
  //   description:
  //     "A perfect long-weekend journey through Udaipur, Kumbhalgarh and Chittorgarh, covering lakes, palaces, forts, temples, local food and unforgettable sunset views.",
  //   coverImage: "/images/iternery/manalis.jpg",
  //   isPremium: true,
  //   price: 149,

  //   days: [
  //     {
  //       day: 1,
  //       title: "Explore Udaipur — Ghats, Bahubali Hills & City Palace",
  //       description:
  //         "Reach Udaipur early in the morning, drop your bags at the hotel, and start exploring around 12 PM. Begin with Gangaur Ghat and Ambrai Ghat, and don't forget to try some local Rajasthani food. Later, head to Bahubali Hills and Monsoon Palace. Try to finish these spots by around 5 PM and make sure you are back in the city before sunset. Watch the sunset from City Palace—the palace looks especially beautiful during golden hour.",
  //       locations: [
  //         "Udaipur",
  //         "Gangaur Ghat",
  //         "Ambrai Ghat",
  //         "Bahubali Hills",
  //         "Monsoon Palace",
  //         "City Palace",
  //       ],
  //     },

  //     {
  //       day: 2,
  //       title: "Kumbhalgarh & Haldighati Day Trip",
  //       description:
  //         "Start your journey early and head towards Kumbhalgarh. On the way, explore Haldighati, including the Haldighati Museum and Chetak Smarak. Continue to Kumbhalgarh Fort and explore its impressive walls and mountain surroundings. After sightseeing, return to Udaipur and spend the evening exploring a local temple or the city.",
  //       locations: [
  //         "Udaipur",
  //         "Haldighati",
  //         "Haldighati Museum",
  //         "Chetak Smarak",
  //         "Kumbhalgarh Fort",
  //       ],
  //     },

  //     {
  //       day: 3,
  //       title: "Udaipur to Chittorgarh by Train",
  //       description:
  //         "Leave Udaipur early and take a train to Chittorgarh. The journey is around 80 km. From Chittorgarh Railway Station, take a local auto to the fort. Explore the massive Chittorgarh Fort and its historic landmarks, including Meera Bai Temple, Rana Ratan Singh Palace, Rani Padmini's Palace, and the Gora-Badal Palace. Don't miss the sunset inside the fort. After exploring, return to the railway station and take your train back.",
  //       locations: [
  //         "Udaipur",
  //         "Chittorgarh",
  //         "Chittorgarh Fort",
  //         "Meera Bai Temple",
  //         "Rana Ratan Singh Palace",
  //         "Rani Padmini Palace",
  //         "Gora-Badal Palace",
  //       ],
  //     },

  //     {
  //       day: 4,
  //       title: "Slow Morning in Udaipur & Departure",
  //       description:
  //         "Keep the final morning relaxed. Enjoy breakfast, explore any nearby place you missed, grab some local food, and then begin your journey back home.",
  //       locations: ["Udaipur"],
  //     },
  //   ],
  // },
//Prayagraj-Varansi-Ayodhya-Vindhyachal-4n5d
  {
    id: "Prayagraj-Varansi-Ayodhya-Vindhyachal-4n5d",
    slug: "Prayagraj-Varansi-Ayodhya-Vindhyachal-4n5d",
    title: "Prayagraj-Varansi-Ayodhya-Vindhyachal 4N/5D",
    destination: "Prayagraj,Uttar Pradesh",
    duration: 4,
    description:
      "A perfect long-weekend journey through Udaipur, Kumbhalgarh and Chittorgarh, covering lakes, palaces, forts, temples, local food and unforgettable sunset views.",
    coverImage: "/images/iternery/mahakumbh.jpg",
    isPremium: false,
    price: 149,

    days: [
  {
    day: 1,
    title: "Prayagraj — Triveni Sangam & Heritage",
    description:
      "Start your journey in Prayagraj with an early visit to Triveni Sangam and take a holy dip in the confluence of the Ganga, Yamuna and Saraswati. From there, visit Hanuman Mandir and Akshay Vat, both located within a short distance of the Sangam area. Return towards Daraganj and visit Veni Madhav Temple and Alopi Shankari Temple. Take some time for breakfast or lunch and rest for a few hours before heading out again. In the afternoon, take an e-rickshaw or cab to Anand Bhawan Museum and try to reach before 5 PM so you have enough time to explore it. Later, visit Alfred Park, now known as Chandrashekhar Azad Park, before returning to your stay for the night.",
    locations: [
      "Triveni Sangam",
      "Bade Hanuman Mandir",
      "Akshay Vat",
      "Veni Madhav Temple",
      "Alopi Shankari Temple",
      "Anand Bhawan",
      "Chandrashekhar Azad Park",
    ],
  },

  {
    day: 2,
    title: "Prayagraj → Ayodhya → Prayagraj",
    description:
      "Take an early morning train or bus from Prayagraj to Ayodhya and try to reach before 10 AM. Head straight towards Ram Mandir so you have enough time for Ram Lalla’s Darshan before noon. After Darshan, visit Hanuman Garhi and spend some time around the Saryu Ghats. Explore the surroundings at a relaxed pace before taking an afternoon or evening bus or train back to Prayagraj. This keeps Ayodhya as a full-day trip without requiring an overnight stay.",
    locations: [
      "Prayagraj",
      "Ayodhya",
      "Ram Mandir",
      "Hanuman Garhi",
      "Saryu Ghat",
    ],
  },

  {
    day: 3,
    title: "Prayagraj → Varanasi — Ghats & Kashi",
    description:
      "Take an early morning train or bus from Prayagraj to Varanasi and try to reach before 10 AM. Check into your room, freshen up and start exploring the famous ghats of Kashi. Walk along Dashashwamedh Ghat, Lalita Ghat, Panchganga Ghat, Ganesh Ghat, Manikarnika Ghat and Namo Ghat, and don’t miss Assi Ghat as well. You can also take a boat ride on the Ganga to experience several of these ghats from the river, with shared boat rides available at affordable prices. In the evening, try to visit Kashi Vishwanath Temple before the evening rush, or plan your Darshan around the aarti. If you want a more special experience, you can also try for Shayan Aarti and Baba Vishwanath’s Darshan before 11 PM.",
    locations: [
      "Varanasi",
      "Dashashwamedh Ghat",
      "Lalita Ghat",
      "Panchganga Ghat",
      "Ganesh Ghat",
      "Manikarnika Ghat",
      "Namo Ghat",
      "Assi Ghat",
      "Kashi Vishwanath Temple",
    ],
  },

  {
    day: 4,
    title: "Assi Ghat → Vindhyachal Dham → Home",
    description:
      "Wake up around 5 AM and don’t miss the peaceful morning atmosphere and Aarti at Assi Ghat. After spending some time at the ghats, start your journey towards Vindhyachal Dham. Visit the Vindhyavasini Temple and explore the nearby sacred places before returning towards Prayagraj. If your schedule allows, you can book a train from Prayagraj for the same night and continue your journey back to your hometown, completing a four-day spiritual journey through Prayagraj, Ayodhya, Varanasi and Vindhyachal.",
    locations: [
      "Assi Ghat",
      "Vindhyachal Dham",
      "Vindhyavasini Temple",
      "Prayagraj",
    ],
  },
],
  },
];

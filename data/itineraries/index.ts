import type { Itinerary } from "../../types/itinerary";

export const itineraries: Itinerary[] = [
  // 1. Rajasthan: Jodhpur, Jaisalmer and Bikaner
//   {
//     id: "Delhi-Jodhpur-Jaisalmer-Bikaner-6n7d",
//     slug: "Delhi-Bikaner-Jaisalmer-Jodhpur-6n7d",
//     title: "Delhi–Bikaner–Jaisalmer–Jodhpur 6N/7D",
//     destination: "Rajasthan",
//     duration: 7,
//     description:
//       "Explore Jodhpur's blue lanes, Jaisalmer's golden fort and the Thar Desert, followed by Bikaner's royal forts and historic havelis.",
//     coverImage: "/images/Itinerary/jodhpur.jpg",
//     isPremium: false,
//     price: 0,
//     direction: "west",
//     budget: { min: 6000, max: 12000, currency: "INR" },
//     occasions: ["long-weekend"],
//     travelStyles: ["backpacker", "culture", "history", "road-trip"],
//     cultures: ["heritage", "local-food", "folk-art", "crafts"],
//     seasons: ["winter", "pleasant"],
//     tripTypes: ["desert", "forts", "city-exploration"],
//     theme: {
//       primary: "#285A83",
//       secondary: "#D8E7F0",
//       background: "#F8F4ED",
//       surface: "#FFFFFF",
//       accent: "#C9794B",
//       text: "#263747",
//       muted: "#77736C",
//       border: "#D7E0E5",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Delhi to Jodhpur",
//         description:
//           "Travel from Delhi to Jodhpur by train or overnight transport. After checking in, explore the Clock Tower, Sardar Market and the blue lanes of the old city. Try local Rajasthani food and enjoy the atmosphere around the historic centre.",
//         locations: [
//           "New Delhi",
//           "Jodhpur",
//           "Clock Tower",
//           "Sardar Market",
//           "Blue City",
//         ],
//       },
//       {
//         day: 2,
//         title: "Jodhpur — Mehrangarh Fort and Blue City",
//         description:
//           "Explore Mehrangarh Fort and its palaces, courtyards and panoramic city views. Continue to Jaswant Thada and explore the old blue neighbourhoods. In the evening, travel towards Jaisalmer if your train or bus schedule allows.",
//         locations: [
//           "Mehrangarh Fort",
//           "Jaswant Thada",
//           "Blue City",
//           "Jodhpur Old City",
//           "Jaisalmer",
//         ],
//       },
//       {
//         day: 3,
//         title: "Jaisalmer — Golden Fort and Havelis",
//         description:
//           "Explore Jaisalmer Fort, its historic lanes and Jain temples. Visit Patwon Ki Haveli and discover the old city before spending the evening around Gadisar Lake.",
//         locations: [
//           "Jaisalmer Fort",
//           "Jain Temples",
//           "Patwon Ki Haveli",
//           "Old Jaisalmer",
//           "Gadisar Lake",
//         ],
//       },
//       {
//         day: 4,
//         title: "Thar Desert — Sunset and Camping",
//         description:
//           "Spend the morning at a relaxed pace, then travel towards Sam Sand Dunes. Enjoy the desert landscape at sunset and consider a camel ride or jeep safari. Stay at a desert camp and experience local food and folk performances where available.",
//         locations: [
//           "Jaisalmer",
//           "Thar Desert",
//           "Sam Sand Dunes",
//           "Camel Safari",
//           "Desert Camp",
//         ],
//       },
//       {
//         day: 5,
//         title: "Kuldhara, Bada Bagh and Bikaner",
//         description:
//           "Enjoy the desert morning and return towards Jaisalmer. Visit Kuldhara and Bada Bagh if transport and opening hours permit. Later, travel to Bikaner by train or bus; check schedules before finalising the route.",
//         locations: [
//           "Sam Sand Dunes",
//           "Kuldhara Village",
//           "Bada Bagh",
//           "Jaisalmer",
//           "Bikaner",
//         ],
//       },
//       {
//         day: 6,
//         title: "Bikaner — Junagarh Fort and Old City",
//         description:
//           "Explore Junagarh Fort and its royal architecture. Continue to the historic Rampuria Havelis and the old city markets. Try Bikaner's famous local snacks and enjoy an evening in the city.",
//         locations: [
//           "Junagarh Fort",
//           "Rampuria Havelis",
//           "Bikaner Old City",
//           "Local Markets",
//         ],
//       },
//       {
//         day: 7,
//         title: "Bikaner to Delhi",
//         description:
//           "If time permits, visit Karni Mata Temple in Deshnok before returning to Bikaner. Collect local snacks, check out and take your return train to Delhi.",
//         locations: ["Bikaner", "Karni Mata Temple", "Deshnok", "New Delhi"],
//       },
//     ],
//   },

//   // 2. Jaisalmer
//   {
//     id: "Jaisalmer-Winter-4n5d",
//     slug: "Jaisalmer-Winter-4n5d",
//     title: "Jaisalmer Winter 4N/5D",
//     destination: "Jaisalmer, Rajasthan",
//     duration: 5,
//     description:
//       "A winter escape through Jaisalmer's golden fort, historic havelis, desert villages, Sam Sand Dunes and peaceful desert sunsets.",
//     coverImage: "/images/Itinerary/jaisalmer.jpg",
//     isPremium: false,
//     price: 0,
//     direction: "west",
//     budget: { min: 5000, max: 12000, currency: "INR" },
//     occasions: ["weekend", "long-weekend"],
//     travelStyles: ["backpacker", "culture", "history", "slow-travel"],
//     cultures: ["heritage", "local-food", "folk-art", "crafts"],
//     seasons: ["winter", "pleasant"],
//     tripTypes: ["desert", "forts", "camping"],
//     theme: {
//       primary: "#C58B2A",
//       secondary: "#F4E3BD",
//       background: "#FBF6EB",
//       surface: "#FFFFFF",
//       accent: "#E8B85D",
//       text: "#49351F",
//       muted: "#87745B",
//       border: "#E6D3AE",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Golden City — Fort, Havelis and Lake",
//         description:
//           "Arrive in Jaisalmer, check in and explore the living fort, narrow lanes and Jain temples. Visit Patwon Ki Haveli and other historic havelis before spending the evening at Gadisar Lake.",
//         locations: [
//           "Jaisalmer",
//           "Jaisalmer Fort",
//           "Jain Temples",
//           "Patwon Ki Haveli",
//           "Nathmal Ki Haveli",
//           "Gadisar Lake",
//         ],
//       },
//       {
//         day: 2,
//         title: "Sam Sand Dunes — Desert Sunset",
//         description:
//           "Enjoy a relaxed morning in town before heading to Sam Sand Dunes. Experience the desert landscape around sunset and choose a camel ride or jeep safari if you wish. Stay at a desert camp and check which meals and cultural activities are included.",
//         locations: [
//           "Jaisalmer",
//           "Sam Sand Dunes",
//           "Thar Desert",
//           "Camel Safari",
//           "Desert Camp",
//         ],
//       },
//       {
//         day: 3,
//         title: "Desert Sunrise, Kuldhara and Khuri",
//         description:
//           "Watch the sunrise if weather permits, then return towards Jaisalmer. Explore Kuldhara and continue to Khuri for a quieter village and desert experience. Return to town in the evening.",
//         locations: [
//           "Sam Sand Dunes",
//           "Kuldhara Village",
//           "Khuri Village",
//           "Jaisalmer",
//         ],
//       },
//       {
//         day: 4,
//         title: "Bada Bagh and Slow Jaisalmer",
//         description:
//           "Explore any missed lanes and local markets. Later, visit Bada Bagh and its royal cenotaphs, then return to the city for a relaxed evening overlooking the illuminated fort.",
//         locations: [
//           "Jaisalmer",
//           "Bada Bagh",
//           "Royal Cenotaphs",
//           "Jaisalmer Fort",
//         ],
//       },
//       {
//         day: 5,
//         title: "Local Breakfast and Departure",
//         description:
//           "Enjoy breakfast, take a final walk through the old city and pick up local snacks or handicrafts. Check out and begin your onward journey.",
//         locations: ["Jaisalmer Fort", "Jaisalmer Local Market", "Jaisalmer"],
//       },
//     ],
//   },

//   // 3. Kashmir
//   {
//     id: "kashmir-autumn",
//     slug: "kashmir-slow-travel",
//     title: "Kashmir in Autumn",
//     destination: "Kashmir",
//     duration: 5,
//     description:
//       "A scenic Kashmir journey focused on autumn chinar trees, Dal Lake, Srinagar's old neighbourhoods and the dramatic mountain route towards Kargil.",
//     coverImage: "/images/Itinerary/kashmirs.jpg",
//     isPremium: false,
//     price: 49,
//     direction: "north",
//     budget: { min: 8000, max: 18000, currency: "INR" },
//     occasions: ["long-weekend", "spontaneous"],
//     travelStyles: ["backpacker", "nature", "photography", "slow-travel"],
//     cultures: ["heritage", "local-food", "villages"],
//     seasons: ["autumn"],
//     tripTypes: ["mountains", "lakes", "road-trip"],
//     theme: {
//       primary: "#A64B32",
//       secondary: "#F0D9C4",
//       background: "#FBF5ED",
//       surface: "#FFFFFF",
//       accent: "#C98A45",
//       text: "#49372F",
//       muted: "#88766B",
//       border: "#E6D4C4",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Delhi to Srinagar",
//         description:
//           "Travel from Delhi towards Srinagar using suitable train, flight or bus connections. If travelling by train to Jammu, arrange onward transport separately and confirm current schedules. Check in near Dal Lake or Dal Gate and enjoy a gentle evening walk.",
//         locations: ["New Delhi", "Jammu Tawi", "Srinagar", "Dal Lake"],
//       },
//       {
//         day: 2,
//         title: "Srinagar — Dal Lake and Mughal Gardens",
//         description:
//           "Start early around Dal Lake, then explore Nishat Bagh and Shalimar Bagh. During autumn, the chinar trees can bring beautiful golden and reddish colours, depending on the season. Leave time for local markets and Kashmiri food.",
//         locations: ["Dal Lake", "Nishat Bagh", "Shalimar Bagh", "Srinagar"],
//       },
//       {
//         day: 3,
//         title: "Old Srinagar and Chinar Walks",
//         description:
//           "Explore Srinagar's old neighbourhoods, local markets and historic riverside areas. Keep the day flexible for photography and seasonal foliage, rather than rushing between distant attractions.",
//         locations: ["Srinagar", "Old Srinagar", "Local Markets"],
//       },
//       {
//         day: 4,
//         title: "Srinagar to Kargil",
//         description:
//           "Travel towards Kargil through the mountain landscape via Sonamarg and Zoji La when the road is open. Conditions can change quickly, so verify road status, permits and transport availability before departure. Stay overnight in Kargil.",
//         locations: ["Srinagar", "Sonamarg", "Zoji La", "Drass", "Kargil"],
//       },
//       {
//         day: 5,
//         title: "Return Journey",
//         description:
//           "Begin the return journey according to confirmed transport schedules. Travelling from Kargil to Srinagar and then continuing to Jammu and Delhi in one day may be difficult, so consider adding a buffer night if connections do not line up.",
//         locations: ["Kargil", "Srinagar", "Jammu Tawi", "New Delhi"],
//       },
//     ],
//   },

//   // 4. Zanskar / high-altitude road trip
//   {
//     id: "delhi-zanskar-4-days",
//     slug: "delhi-zanskar-4-days",
//     title: "Delhi to Zanskar — 3N/4D Road Trip Under 10K",
//     destination: "Zanskar, Ladakh",
//     duration: 4,
//     description:
//       "A demanding high-altitude road trip concept via Manali, Sissu, Jispa and the mountain routes towards Zanskar. Verify route access and realistic travel times before booking.",
//     coverImage: "/images/Itinerary/zanskars.jpg",
//     isPremium: false,
//     price: 99,
//     direction: "north",
//     budget: { min: 7000, max: 15000, currency: "INR" },
//     occasions: ["long-weekend", "spontaneous"],
//     travelStyles: ["backpacker", "adventure", "road-trip"],
//     cultures: ["villages", "heritage", "local-food"],
//     seasons: ["pleasant", "summer"],
//     tripTypes: ["mountains", "road-trip", "adventure"],
//     theme: {
//       primary: "#526777",
//       secondary: "#DCE5E9",
//       background: "#F5F7F8",
//       surface: "#FFFFFF",
//       accent: "#C98E56",
//       text: "#293943",
//       muted: "#78858D",
//       border: "#D6E0E5",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Delhi to Manali",
//         description:
//           "Take an overnight bus from Delhi to Manali. Rest after arrival and explore nearby areas only if you feel comfortable. Give yourself time to adjust to the altitude before continuing into the mountains.",
//         locations: ["Delhi", "Manali"],
//       },
//       {
//         day: 2,
//         title: "Manali to Sissu and Jispa",
//         description:
//           "Continue towards the Lahaul Valley, checking road conditions and transport options in advance. Stop around Sissu for the landscape and continue to Jispa if conditions and timing allow. Do not assume that the route into Zanskar can be completed in a few hours.",
//         locations: ["Manali", "Atal Tunnel", "Sissu", "Keylong", "Jispa"],
//       },
//       {
//         day: 3,
//         title: "Explore Lahaul Valley",
//         description:
//           "Spend the day exploring nearby villages and viewpoints around Jispa and Keylong. If your actual route requires travel farther towards Zanskar, plan extra days and confirm road access, vehicle suitability and overnight stops with local operators.",
//         locations: ["Jispa", "Keylong", "Lahaul Valley"],
//       },
//       {
//         day: 4,
//         title: "Return towards Manali and Delhi",
//         description:
//           "Return towards Manali, allowing extra time for mountain roads and changing weather. Take an overnight bus to Delhi only if the arrival time and your onward connection are realistic; otherwise, stay another night.",
//         locations: ["Jispa", "Keylong", "Sissu", "Manali", "Delhi"],
//       },
//     ],
//   },

//   // 5. Udaipur weekend
//   {
//     id: "udaipur-weekend-plan",
//     slug: "udaipur-weekend",
//     title: "Udaipur — 3 Day Weekend Itinerary",
//     destination: "Udaipur, Rajasthan",
//     duration: 3,
//     description:
//       "A relaxed Udaipur escape covering lakeside walks, historic palaces, local food, hilltop viewpoints and the city's colourful old streets.",
//     coverImage: "/images/Itinerary/udaipur.jpg",
//     isPremium: false,
//     price: 0,
//     direction: "west",
//     budget: { min: 4000, max: 9000, currency: "INR" },
//     occasions: ["weekend", "long-weekend"],
//     travelStyles: ["backpacker", "culture", "slow-travel"],
//     cultures: ["heritage", "local-food", "crafts"],
//     seasons: ["winter", "monsoon"],
//     tripTypes: ["lakes", "heritage", "city-exploration"],
//     theme: {
//       primary: "#356B78",
//       secondary: "#D9E8E8",
//       background: "#F7F6EF",
//       surface: "#FFFFFF",
//       accent: "#C59A50",
//       text: "#2C4247",
//       muted: "#778589",
//       border: "#D6E1E1",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Ghats, Lake Pichola and City Palace",
//         description:
//           "Begin at Gangaur Ghat and walk towards Ambrai Ghat for views of Lake Pichola. Explore the old streets and enjoy local Rajasthani food. Visit City Palace with enough time before closing, then spend the evening around the lakefront.",
//         locations: [
//           "Gangaur Ghat",
//           "Ambrai Ghat",
//           "Lake Pichola",
//           "City Palace",
//         ],
//       },
//       {
//         day: 2,
//         title: "Bahubali Hills and Monsoon Palace",
//         description:
//           "Start early for Bahubali Hills and its views over the surrounding lakes. Later, visit Sajjangarh or Monsoon Palace if transport and opening hours permit. Keep enough time for the return journey and enjoy a relaxed evening in Udaipur.",
//         locations: [
//           "Bahubali Hills",
//           "Badi Lake",
//           "Sajjangarh Monsoon Palace",
//           "Udaipur",
//         ],
//       },
//       {
//         day: 3,
//         title: "Local Streets, Food and Departure",
//         description:
//           "Spend your final morning exploring markets, cafés and old streets. Try local dishes, pick up handicrafts if you wish and leave enough time for your onward transport.",
//         locations: ["Udaipur Old City", "Local Markets", "Udaipur"],
//       },
//     ],
//   },

//   // 6. Spiti Valley
//   {
//     id: "spiti-valley-10-days",
//     slug: "spiti-valley-10-days",
//     title: "Spiti Valley — 10 Day Complete Itinerary",
//     destination: "Spiti Valley, Himachal Pradesh",
//     duration: 10,
//     description:
//       "A mountain journey through Kinnaur and Spiti, covering remote villages, monasteries, high-altitude landscapes and the route towards Chandratal and Manali.",
//     coverImage: "/images/Itinerary/spitis.jpg",
//     isPremium: false,
//     price: 0,
//     direction: "north",
//     budget: { min: 12000, max: 25000, currency: "INR" },
//     occasions: ["long-weekend", "spontaneous"],
//     travelStyles: ["backpacker", "adventure", "nature", "road-trip"],
//     cultures: ["villages", "heritage", "local-food"],
//     seasons: ["pleasant", "summer", "winter"],
//     tripTypes: ["mountains", "road-trip", "villages"],
//     theme: {
//       primary: "#526777",
//       secondary: "#DCE5E9",
//       background: "#F5F7F8",
//       surface: "#FFFFFF",
//       accent: "#C98E56",
//       text: "#293943",
//       muted: "#78858D",
//       border: "#D6E0E5",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Delhi to Shimla",
//         description:
//           "Travel from Delhi to Shimla by bus or another suitable connection. Rest after arrival and prepare for the mountain journey ahead.",
//         locations: ["Delhi", "Shimla"],
//       },
//       {
//         day: 2,
//         title: "Shimla to Chitkul",
//         description:
//           "Travel through the Kinnaur region towards Sangla and Chitkul. Enjoy the mountain scenery and stay overnight in the valley. Check road and bus conditions before departure.",
//         locations: ["Shimla", "Rampur", "Sangla", "Chitkul"],
//       },
//       {
//         day: 3,
//         title: "Chitkul to Kalpa",
//         description:
//           "Enjoy a quiet morning in Chitkul, then travel towards Kalpa through the dramatic landscapes of Kinnaur. Explore the village and views of the surrounding mountains if weather permits.",
//         locations: ["Chitkul", "Sangla", "Reckong Peo", "Kalpa"],
//       },
//       {
//         day: 4,
//         title: "Kalpa to Nako",
//         description:
//           "Continue along the mountain road towards Nako. Stop at viewpoints along the way and explore Nako village and its lake if time allows.",
//         locations: ["Kalpa", "Kinnaur", "Nako"],
//       },
//       {
//         day: 5,
//         title: "Nako to Kaza via Tabo",
//         description:
//           "Travel towards Tabo and visit Tabo Monastery if open. Continue through the stark landscapes of Spiti towards Kaza, allowing plenty of time for mountain roads.",
//         locations: ["Nako", "Tabo", "Dhankar", "Kaza"],
//       },
//       {
//         day: 6,
//         title: "Kaza and Local Exploration",
//         description:
//           "Explore Kaza's local market and nearby village life. Keep this day relatively relaxed to adjust to the altitude and arrange local transport for the surrounding villages.",
//         locations: ["Kaza", "Kaza Market"],
//       },
//       {
//         day: 7,
//         title: "Langza, Hikkim and Komic",
//         description:
//           "Take a local excursion to Langza, Hikkim and Komic. Enjoy the village scenery and check local road conditions before setting out.",
//         locations: ["Langza", "Hikkim", "Komic"],
//       },
//       {
//         day: 8,
//         title: "Key Monastery, Kibber and Chicham",
//         description:
//           "Visit Key Monastery and continue to Kibber and Chicham Bridge. Respect monastery rules and allow extra time for the mountain roads.",
//         locations: ["Key Monastery", "Kibber", "Chicham Bridge"],
//       },
//       {
//         day: 9,
//         title: "Kaza to Chandratal",
//         description:
//           "Travel towards Chandratal only if the seasonal road is open and transport is suitable. The route can be rough, and overnight camping depends on the season and local conditions.",
//         locations: ["Kaza", "Losar", "Kunzum Pass", "Chandratal"],
//       },
//       {
//         day: 10,
//         title: "Chandratal to Manali",
//         description:
//           "Continue towards Manali through the mountain route when it is open. Confirm road access and allow contingency time, as weather can disrupt travel in this region.",
//         locations: ["Chandratal", "Batal", "Atal Tunnel", "Manali"],
//       },
//     ],
//   },

//   // 7. Kerala
//   {
//     id: "kerala-7-days",
//     slug: "kerala-7-days",
//     title: "Kerala — 7 Day Complete Itinerary",
//     destination: "Kerala",
//     duration: 7,
//     description:
//       "A relaxed Kerala journey combining Kochi's heritage streets, Alleppey's backwaters, village life, coastal scenery and the green landscapes around Munnar.",
//     coverImage: "/images/Itinerary/kerla.jpg",
//     isPremium: false,
//     price: 29,
//     direction: "south",
//     budget: { min: 7000, max: 15000, currency: "INR" },
//     occasions: ["solo", "friends", "couple", "family"],
//     travelStyles: ["backpacker", "nature", "slow-travel"],
//     cultures: ["villages", "local-food", "folk-art", "crafts"],
//     seasons: ["monsoon", "waterfalls"],
//     tripTypes: ["beaches", "nature", "backwaters"],
//     theme: {
//       primary: "#286653",
//       secondary: "#DDEBE2",
//       background: "#F5F8F1",
//       surface: "#FFFFFF",
//       accent: "#D5A45B",
//       text: "#263D32",
//       muted: "#718278",
//       border: "#D3E1D6",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Arrive in Kochi",
//         description:
//           "Arrive in Kochi and settle into your stay. Explore Fort Kochi's streets, waterfront and historic neighbourhoods at a relaxed pace. Enjoy local food and watch the evening settle over the coast.",
//         locations: ["Kochi", "Fort Kochi", "Chinese Fishing Nets"],
//       },
//       {
//         day: 2,
//         title: "Kochi — Heritage and Local Life",
//         description:
//           "Explore Fort Kochi and Mattancherry, including the historic streets, local markets and heritage buildings. Visit museums or places of worship that interest you, checking opening hours in advance.",
//         locations: [
//           "Fort Kochi",
//           "Mattancherry",
//           "Jew Town",
//           "Mattancherry Palace",
//         ],
//       },
//       {
//         day: 3,
//         title: "Kochi to Alleppey",
//         description:
//           "Travel to Alleppey by train or bus. Explore the canals, waterfront and nearby village areas. Choose a backwater cruise or locally operated boat trip that fits your budget and schedule.",
//         locations: ["Kochi", "Alleppey", "Alappuzha Backwaters"],
//       },
//       {
//         day: 4,
//         title: "Alleppey — Backwaters and Village Life",
//         description:
//           "Spend the day exploring the backwaters and surrounding villages. A shared or short boat trip can be a more budget-friendly alternative to a private houseboat. Keep the afternoon free for a relaxed walk or local meal.",
//         locations: ["Alappuzha Backwaters", "Alleppey Beach", "Local Villages"],
//       },
//       {
//         day: 5,
//         title: "Alleppey to Munnar",
//         description:
//           "Travel inland towards Munnar, allowing several hours for the road journey. Enjoy the changing landscape as the coast gives way to hills and tea plantations. Settle in and keep the evening relaxed.",
//         locations: ["Alleppey", "Munnar", "Tea Plantations"],
//       },
//       {
//         day: 6,
//         title: "Munnar — Tea Gardens and Viewpoints",
//         description:
//           "Explore Munnar's tea-growing landscapes and selected viewpoints. Visit a tea museum or garden if open, and choose nature stops according to the weather and available transport.",
//         locations: ["Munnar", "Tea Gardens", "Tea Museum", "Local Viewpoints"],
//       },
//       {
//         day: 7,
//         title: "Return Journey",
//         description:
//           "Enjoy breakfast and a final short walk before travelling towards your departure point. Since Munnar is inland, allow enough time to reach your onward train, bus or flight.",
//         locations: ["Munnar", "Kochi"],
//       },
//     ],
//   },

//   // 8. Kalpa
//   {
//     id: "delhi-kalpa-4-days",
//     slug: "delhi-kalpa-4-days",
//     title: "Delhi to Kalpa — 3N/4D Road Trip",
//     destination: "Kalpa, Himachal Pradesh",
//     duration: 4,
//     description:
//       "A short but demanding mountain journey from Delhi to Kalpa through Shimla and Kinnaur, with village walks, mountain views and local Himachali food.",
//     coverImage: "/images/Itinerary/kalpa.jpg",
//     isPremium: false,
//     price: 39,
//     direction: "north",
//     budget: { min: 5000, max: 11000, currency: "INR" },
//     occasions: ["long-weekend", "spontaneous"],
//     travelStyles: ["backpacker", "nature", "road-trip", "slow-travel"],
//     cultures: ["villages", "heritage", "local-food"],
//     seasons: ["winter", "pleasant", "summer"],
//     tripTypes: ["mountains", "villages", "road-trip"],
//     theme: {
//       primary: "#526777",
//       secondary: "#DCE5E9",
//       background: "#F5F7F8",
//       surface: "#FFFFFF",
//       accent: "#C98E56",
//       text: "#293943",
//       muted: "#78858D",
//       border: "#D6E0E5",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Delhi to Shimla",
//         description:
//           "Travel from Delhi to Shimla by bus or another suitable connection. Explore Mall Road and nearby streets if you arrive with enough time, then rest before the next day's mountain journey.",
//         locations: ["Delhi", "Shimla", "Mall Road"],
//       },
//       {
//         day: 2,
//         title: "Shimla to Kalpa via Kinnaur",
//         description:
//           "Start early for the long journey towards Kalpa. Enjoy the mountain roads and stop at safe viewpoints along the route. Check in on arrival and, if the sky is clear, enjoy views of the surrounding peaks.",
//         locations: ["Shimla", "Rampur", "Kinnaur", "Reckong Peo", "Kalpa"],
//       },
//       {
//         day: 3,
//         title: "Kalpa and Roghi Village",
//         description:
//           "Explore Kalpa's village lanes, local temples and monastery. Continue to Roghi Village if road and weather conditions allow. Try local Himachali food and leave time to enjoy the mountain scenery.",
//         locations: ["Kalpa", "Kalpa Monastery", "Roghi Village"],
//       },
//       {
//         day: 4,
//         title: "Kalpa to Delhi",
//         description:
//           "Begin the return journey early. The drive to Delhi is long, so consider breaking the journey with an overnight stay in Shimla or another suitable town instead of relying on a tight same-day connection.",
//         locations: ["Kalpa", "Reckong Peo", "Shimla", "Delhi"],
//       },
//     ],
//   },

//   // 9. Udaipur, Kumbhalgarh and Chittorgarh
//   {
//     id: "udaipur-chittorgarh-kumbhalgarh-4-days",
//     slug: "udaipur-chittorgarh-kumbhalgarh-4-days",
//     title: "Skip Jaipur: Udaipur, Chittorgarh and Kumbhalgarh — 3N/4D",
//     destination: "Udaipur, Rajasthan",
//     duration: 4,
//     description:
//       "A long-weekend Rajasthan itinerary featuring Udaipur's lakes and palaces, Kumbhalgarh's mountain fort and the monumental history of Chittorgarh.",
//     coverImage: "/images/Itinerary/chittaurgarh.jpg",
//     isPremium: false,
//     price: 0,
//     direction: "west",
//     budget: { min: 5000, max: 11000, currency: "INR" },
//     occasions: ["weekend", "long-weekend"],
//     travelStyles: ["backpacker", "culture", "history", "road-trip"],
//     cultures: ["heritage", "local-food", "folk-art"],
//     seasons: ["winter", "monsoon"],
//     tripTypes: ["forts", "heritage", "city-exploration"],
//     theme: {
//       primary: "#356B78",
//       secondary: "#D9E8E8",
//       background: "#F7F6EF",
//       surface: "#FFFFFF",
//       accent: "#C59A50",
//       text: "#2C4247",
//       muted: "#778589",
//       border: "#D6E1E1",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Udaipur — Ghats, Lakes and City Palace",
//         description:
//           "Arrive in Udaipur and explore Gangaur Ghat, Ambrai Ghat and the lanes around Lake Pichola. Visit City Palace with enough time before closing. Keep the evening for the lakefront and local food.",
//         locations: [
//           "Udaipur",
//           "Gangaur Ghat",
//           "Ambrai Ghat",
//           "Lake Pichola",
//           "City Palace",
//         ],
//       },
//       {
//         day: 2,
//         title: "Haldighati and Kumbhalgarh Fort",
//         description:
//           "Start early for Haldighati and its historical sites, then continue to Kumbhalgarh Fort. This is a long day with substantial road travel, so arrange transport ahead of time and return to Udaipur only if the timing is practical.",
//         locations: [
//           "Udaipur",
//           "Haldighati",
//           "Haldighati Museum",
//           "Chetak Smarak",
//           "Kumbhalgarh Fort",
//         ],
//       },
//       {
//         day: 3,
//         title: "Udaipur to Chittorgarh",
//         description:
//           "Travel to Chittorgarh by train or road. Explore Chittorgarh Fort and its historic landmarks, including Meera Bai Temple and Rani Padmini's Palace. Check local transport and the fort's visiting hours before planning your return.",
//         locations: [
//           "Udaipur",
//           "Chittorgarh",
//           "Chittorgarh Fort",
//           "Meera Bai Temple",
//           "Rani Padmini Palace",
//           "Vijay Stambh",
//         ],
//       },
//       {
//         day: 4,
//         title: "Slow Morning and Departure",
//         description:
//           "Enjoy a relaxed breakfast and explore a nearby market or any missed place. Leave enough time for your onward train, bus or flight.",
//         locations: ["Udaipur Old City", "Local Markets", "Udaipur"],
//       },
//     ],
//   },

//   // 10. Tamil Nadu
//   {
//     id: "madurai-kanyakumari-rameshwaram-7-days",
//     slug: "madurai-kanyakumari-rameshwaram-7-days",
//     title: "Madurai, Rameswaram and Kanyakumari — 7 Days",
//     destination: "Madurai, Rameswaram and Kanyakumari, Tamil Nadu",
//     duration: 7,
//     description:
//       "Explore Madurai's temple heritage, Rameswaram's sacred coastline, the Pamban region and Kanyakumari's dramatic meeting of the seas on a week-long Tamil Nadu journey.",
//     coverImage: "/images/Itinerary/rameshwaram.jpg",
//     isPremium: false,
//     price: 29,
//     direction: "south",
//     budget: { min: 7000, max: 15000, currency: "INR" },
//     occasions: ["long-weekend"],
//     travelStyles: ["backpacker", "culture", "history", "spiritual"],
//     cultures: ["heritage", "local-food", "festivals"],
//     seasons: ["pleasant"],
//     tripTypes: ["temples", "coastal", "spiritual"],
//     theme: {
//       primary: "#87452D",
//       secondary: "#F3E2CC",
//       background: "#FFF9F0",
//       surface: "#FFFFFF",
//       accent: "#D7A84B",
//       text: "#432D24",
//       muted: "#89776A",
//       border: "#E9D6C1",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Arrive in Madurai",
//         description:
//           "Arrive in Madurai and settle into your stay. Explore the streets around Meenakshi Amman Temple and sample local Tamil food. Visit the temple according to its current opening hours and dress requirements.",
//         locations: ["Madurai", "Meenakshi Amman Temple", "Madurai Old City"],
//       },
//       {
//         day: 2,
//         title: "Madurai — Temple and Heritage",
//         description:
//           "Spend the morning exploring Madurai's heritage, including Thirumalai Nayakkar Palace if open. Leave time for the temple complex and the city's markets before preparing for the next journey.",
//         locations: [
//           "Meenakshi Amman Temple",
//           "Thirumalai Nayakkar Palace",
//           "Madurai Markets",
//         ],
//       },
//       {
//         day: 3,
//         title: "Madurai to Rameswaram",
//         description:
//           "Travel to Rameswaram by train or bus. Explore the town and visit Ramanathaswamy Temple according to its current schedule. Allow time for temple queues and local customs.",
//         locations: ["Madurai", "Rameswaram", "Ramanathaswamy Temple"],
//       },
//       {
//         day: 4,
//         title: "Rameswaram and Pamban",
//         description:
//           "Explore Rameswaram's coastal sights and the Pamban area. Visit Dhanushkodi only after checking road access, weather and local guidance. Return to Rameswaram for the night.",
//         locations: [
//           "Rameswaram",
//           "Pamban Bridge",
//           "Dhanushkodi",
//           "Agni Theertham",
//         ],
//       },
//       {
//         day: 5,
//         title: "Rameswaram to Kanyakumari",
//         description:
//           "Travel towards Kanyakumari, allowing enough time for connections. After checking in, explore the waterfront and enjoy the evening views if weather permits.",
//         locations: ["Rameswaram", "Kanyakumari"],
//       },
//       {
//         day: 6,
//         title: "Kanyakumari — Coast and Memorials",
//         description:
//           "Explore the Kanyakumari waterfront and visit the Vivekananda Rock Memorial and Thiruvalluvar Statue if ferry services are operating. Check the sea conditions and ferry timings before heading out.",
//         locations: [
//           "Kanyakumari",
//           "Vivekananda Rock Memorial",
//           "Thiruvalluvar Statue",
//           "Kanyakumari Beach",
//         ],
//       },
//       {
//         day: 7,
//         title: "Sunrise and Departure",
//         description:
//           "Wake early for sunrise if the weather is clear. Enjoy breakfast, take a final walk near the waterfront and depart using your confirmed train or bus connection.",
//         locations: ["Kanyakumari", "Kanyakumari Beach", "Railway Station"],
//       },
//     ],
//   },

//   // 11. Meghalaya
//   {
//     id: "guwahati-shillong-dawki-7-days",
//     slug: "guwahati-shillong-dawki-7-days",
//     title: "Guwahati, Shillong and Dawki — 7 Days",
//     destination: "Guwahati, Assam and Meghalaya",
//     duration: 7,
//     description:
//       "A Northeast India journey through Guwahati, Shillong's hill scenery, waterfalls, local markets and the clear river landscapes around Dawki and the India–Bangladesh border.",
//     coverImage: "/images/Itinerary/shilong.jpg",
//     isPremium: false,
//     price: 99,
//     direction: "northeast",
//     budget: { min: 8000, max: 18000, currency: "INR" },
//     occasions: ["long-weekend", "spontaneous"],
//     travelStyles: ["backpacker", "nature", "culture", "road-trip"],
//     cultures: ["villages", "local-food", "festivals", "crafts"],
//     seasons: ["winter", "pleasant", "waterfalls", "summer"],
//     tripTypes: ["mountains", "waterfalls", "nature"],
//     theme: {
//       primary: "#3D6858",
//       secondary: "#DCE9E2",
//       background: "#F4F7F4",
//       surface: "#FFFFFF",
//       accent: "#83A9A0",
//       text: "#2B4037",
//       muted: "#7B8982",
//       border: "#D5E1DA",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Arrive in Guwahati",
//         description:
//           "Arrive in Guwahati and settle in. Visit Kamakhya Temple if it fits your arrival time and check current visiting arrangements. Explore the local food scene and rest before travelling into Meghalaya.",
//         locations: ["Guwahati", "Kamakhya Temple", "Brahmaputra River"],
//       },
//       {
//         day: 2,
//         title: "Guwahati to Shillong",
//         description:
//           "Travel from Guwahati to Shillong by shared taxi, bus or pre-arranged transport. Explore Police Bazaar and nearby neighbourhoods after checking in. Keep the evening relaxed.",
//         locations: ["Guwahati", "Shillong", "Police Bazaar"],
//       },
//       {
//         day: 3,
//         title: "Shillong — Waterfalls and Viewpoints",
//         description:
//           "Explore selected viewpoints and waterfalls around Shillong, depending on weather and road conditions. Visit Elephant Falls if open and allow time for local transport between stops.",
//         locations: ["Shillong", "Elephant Falls", "Shillong Viewpoints"],
//       },
//       {
//         day: 4,
//         title: "Shillong to Cherrapunji",
//         description:
//           "Take a day trip or stay overnight around Cherrapunji. Explore viewpoints and waterfalls such as Nohkalikai Falls when access and weather permit. During heavy rain, follow local safety advice.",
//         locations: ["Shillong", "Cherrapunji", "Nohkalikai Falls"],
//       },
//       {
//         day: 5,
//         title: "Cherrapunji to Dawki",
//         description:
//           "Travel towards Dawki and the Umngot River. Water clarity varies with weather, season and river conditions, so avoid assuming the water will always appear transparent. Check local boating availability.",
//         locations: ["Cherrapunji", "Dawki", "Umngot River"],
//       },
//       {
//         day: 6,
//         title: "Dawki and Mawlynnong",
//         description:
//           "Explore Dawki and, if transport allows, visit Mawlynnong to experience village life and the surrounding landscape. Respect local customs and confirm border-area restrictions before travelling.",
//         locations: ["Dawki", "Mawlynnong", "Meghalaya Villages"],
//       },
//       {
//         day: 7,
//         title: "Return to Guwahati",
//         description:
//           "Travel back towards Guwahati, allowing several hours for the road journey and traffic. Keep a buffer before your onward train or flight.",
//         locations: ["Shillong", "Guwahati"],
//       },
//     ],
//   },

//   // 12. Gangtok, Darjeeling and Yumthang
//   {
//     id: "gangtok-darjeeling-yumthang-7-days",
//     slug: "gangtok-darjeeling-yumthang-7-days",
//     title: "Gangtok, Darjeeling and Yumthang Valley — 7 Days",
//     destination: "Sikkim and Darjeeling, Northeast India",
//     duration: 7,
//     description:
//       "A mountain itinerary connecting Gangtok, Darjeeling and the Yumthang Valley, with Himalayan viewpoints, tea gardens, monasteries and scenic road journeys.",
//     coverImage: "/images/Itinerary/gangtok.jpg",
//     isPremium: false,
//     price: 99,
//     direction: "northeast",
//     budget: { min: 10000, max: 22000, currency: "INR" },
//     occasions: ["long-weekend", "spontaneous"],
//     travelStyles: ["backpacker", "nature", "culture", "road-trip"],
//     cultures: ["villages", "local-food", "heritage"],
//     seasons: ["winter", "pleasant", "summer"],
//     tripTypes: ["mountains", "valleys", "road-trip"],
//     theme: {
//       primary: "#365D8D",
//       secondary: "#DCE7F5",
//       background: "#F6F8FC",
//       surface: "#FFFFFF",
//       accent: "#7EA7C7",
//       text: "#26384F",
//       muted: "#77869A",
//       border: "#D5DFEC",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Arrive in Gangtok",
//         description:
//           "Reach Gangtok via your confirmed airport or railway transfer. Check in and explore MG Marg, local shops and cafés. Rest after the journey and arrange permits or transport required for the coming days.",
//         locations: ["Gangtok", "MG Marg"],
//       },
//       {
//         day: 2,
//         title: "Gangtok — Monasteries and Viewpoints",
//         description:
//           "Explore selected Gangtok sights, such as Enchey Monastery and viewpoints around the city. Check opening hours and local transport options before setting out.",
//         locations: ["Gangtok", "Enchey Monastery", "Gangtok Viewpoints"],
//       },
//       {
//         day: 3,
//         title: "Gangtok to Lachung",
//         description:
//           "Travel towards Lachung through North Sikkim with a registered local operator where required. The journey can take much of the day, and permits, road conditions and weather may affect the route.",
//         locations: ["Gangtok", "North Sikkim", "Lachung"],
//       },
//       {
//         day: 4,
//         title: "Yumthang Valley and Return",
//         description:
//           "Visit Yumthang Valley if road conditions and permits allow. Seasonal scenery varies throughout the year; snow, flowers and access cannot be guaranteed. Return to Lachung or continue according to your operator's confirmed itinerary.",
//         locations: ["Lachung", "Yumthang Valley"],
//       },
//       {
//         day: 5,
//         title: "Return to Gangtok",
//         description:
//           "Travel back towards Gangtok and leave time for delays on mountain roads. Keep the evening flexible rather than scheduling distant activities.",
//         locations: ["Lachung", "Gangtok"],
//       },
//       {
//         day: 6,
//         title: "Gangtok to Darjeeling",
//         description:
//           "Travel towards Darjeeling and settle in. Explore the local market or Mall Road and enjoy the hill-station atmosphere.",
//         locations: ["Gangtok", "Darjeeling", "Mall Road"],
//       },
//       {
//         day: 7,
//         title: "Darjeeling and Departure",
//         description:
//           "If your schedule allows, visit a tea garden or viewpoint in the morning. Tiger Hill sunrise requires an early start and clear weather. Continue to your onward transport connection with sufficient buffer time.",
//         locations: ["Darjeeling", "Tea Gardens", "Tiger Hill"],
//       },
//     ],
//   },

//   // 13. Chandratal and Sissu
//   {
//     id: "chandratal-3n4d",
//     slug: "chandratal-3n4d",
//     title: "Skip Manali? Try Sissu and Chandratal Lake — 3N/4D",
//     destination: "Chandratal and Sissu, Himachal Pradesh",
//     duration: 4,
//     description:
//       "A high-altitude Lahaul road trip featuring Sissu, mountain villages, rugged landscapes and Chandratal Lake when the seasonal road and camping facilities are open.",
//     coverImage: "/images/Itinerary/chandratal.jpg",
//     isPremium: false,
//     price: 99,
//     direction: "north",
//     budget: { min: 6000, max: 14000, currency: "INR" },
//     occasions: ["weekend", "long-weekend", "spontaneous"],
//     travelStyles: ["backpacker", "adventure", "nature", "road-trip"],
//     cultures: ["villages", "local-food"],
//     seasons: ["pleasant", "summer"],
//     tripTypes: ["mountains", "lakes", "camping"],
//     theme: {
//       primary: "#526777",
//       secondary: "#DCE5E9",
//       background: "#F5F7F8",
//       surface: "#FFFFFF",
//       accent: "#C98E56",
//       text: "#293943",
//       muted: "#78858D",
//       border: "#D6E0E5",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Delhi to Manali",
//         description:
//           "Take an overnight bus from Delhi to Manali. Rest after arrival and confirm your onward transport, road status and accommodation before heading into Lahaul.",
//         locations: ["Delhi", "Manali"],
//       },
//       {
//         day: 2,
//         title: "Manali to Sissu and Keylong",
//         description:
//           "Travel through the Atal Tunnel towards Sissu. Enjoy the mountain scenery and visit nearby viewpoints if conditions allow. Continue towards Keylong or Jispa for the night depending on your transport and schedule.",
//         locations: ["Manali", "Atal Tunnel", "Sissu", "Keylong", "Jispa"],
//       },
//       {
//         day: 3,
//         title: "Towards Chandratal Lake",
//         description:
//           "Continue towards Chandratal only when the seasonal road is open and your vehicle is suitable for the route. Mountain travel can be slow, so check camping availability and local advice before leaving. If the route is not practical, spend the day exploring Lahaul instead.",
//         locations: ["Jispa", "Batal", "Kunzum Pass", "Chandratal Lake"],
//       },
//       {
//         day: 4,
//         title: "Return to Manali and Delhi",
//         description:
//           "Begin the return journey early, allowing for rough roads and weather-related delays. Take an overnight bus from Manali only if you arrive with enough time; otherwise, stay overnight and travel the next day.",
//         locations: ["Chandratal Lake", "Batal", "Sissu", "Manali", "Delhi"],
//       },
//     ],
//   },

//   // 14. Prayagraj, Varanasi, Ayodhya and Vindhyachal
//   {
//     id: "Prayagraj-Varanasi-Ayodhya-Vindhyachal-4n5d",
//     slug: "Prayagraj-Varanasi-Ayodhya-Vindhyachal-4n5d",
//     title: "Prayagraj–Varanasi–Ayodhya–Vindhyachal 4N/5D",
//     destination: "Prayagraj, Varanasi, Ayodhya and Vindhyachal",
//     duration: 5,
//     description:
//       "Discover the spiritual heritage of Uttar Pradesh through Prayagraj's Sangam, Ayodhya's temples, Varanasi's ancient ghats and Vindhyachal Dham.",
//     coverImage: "/images/Itinerary/varansi.jpg",
//     isPremium: false,
//     price: 29,
//     direction: "north",
//     budget: { min: 4000, max: 9000, currency: "INR" },
//     occasions: ["long-weekend"],
//     travelStyles: [
//       "backpacker",
//       "culture",
//       "history",
//       "spiritual",
//       "slow-travel",
//     ],
//     cultures: ["heritage", "local-food", "festivals", "crafts"],
//     seasons: ["winter",  "summer"],
//     tripTypes: ["spiritual", "heritage", "temples", "city-exploration"],
//     theme: {
//       primary: "#87452D",
//       secondary: "#F3E2CC",
//       background: "#FFF9F0",
//       surface: "#FFFFFF",
//       accent: "#D7A84B",
//       text: "#432D24",
//       muted: "#89776A",
//       border: "#E9D6C1",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Prayagraj — Sangam and Heritage",
//         description:
//           "Visit Triveni Sangam and explore nearby religious sites, checking access and visiting arrangements before travelling. Continue to Bade Hanuman Mandir, Alopi Shankari Temple or Veni Madhav Temple, then explore Anand Bhawan or Chandrashekhar Azad Park if time permits.",
//         locations: [
//           "Triveni Sangam",
//           "Bade Hanuman Mandir",
//           "Akshay Vat",
//           "Veni Madhav Temple",
//           "Alopi Shankari Temple",
//           "Anand Bhawan",
//           "Chandrashekhar Azad Park",
//         ],
//       },
//       {
//         day: 2,
//         title: "Prayagraj to Ayodhya",
//         description:
//           "Travel early to Ayodhya by confirmed train or road transport. Visit Ram Mandir, Hanuman Garhi and the Saryu riverfront, allowing for queues and security arrangements. Stay in Ayodhya if your schedule permits rather than relying on a rushed same-day return.",
//         locations: [
//           "Prayagraj",
//           "Ayodhya",
//           "Ram Mandir",
//           "Hanuman Garhi",
//           "Saryu Ghat",
//         ],
//       },
//       {
//         day: 3,
//         title: "Ayodhya to Varanasi",
//         description:
//           "Travel to Varanasi and check in. Explore the old city and selected ghats, then attend the Ganga Aarti if timings and crowd conditions allow. Keep your route flexible around the busy lanes.",
//         locations: [
//           "Ayodhya",
//           "Varanasi",
//           "Dashashwamedh Ghat",
//           "Godowlia",
//           "Old Varanasi",
//         ],
//       },
//       {
//         day: 4,
//         title: "Varanasi to Vindhyachal",
//         description:
//           "Start with a morning walk around Assi Ghat or a boat ride if conditions permit. Travel towards Vindhyachal and visit Vindhyavasini Temple according to the current darshan schedule. Continue to Prayagraj if time and transport connections allow, or stay nearby.",
//         locations: [
//           "Assi Ghat",
//           "Varanasi",
//           "Vindhyachal Dham",
//           "Vindhyavasini Temple",
//         ],
//       },
//       {
//         day: 5,
//         title: "Return from Prayagraj",
//         description:
//           "If you returned to Prayagraj the previous evening, enjoy breakfast and any nearby place you missed before departing. Otherwise, allow time to reach Prayagraj from your overnight stop and continue with your onward connection.",
//         locations: ["Vindhyachal", "Prayagraj", "Railway Station"],
//       },
//     ],
//   },

//   // 15. Aizawl, Mizoram
//   {
//     id: "aizawl-mizoram-4n5d",
//     slug: "aizawl-mizoram-4n5d",
//     title: "Aizawl and Mizoram — 4N/5D",
//     destination: "Aizawl, Mizoram",
//     duration: 5,
//     description:
//       "Explore Aizawl's hilly streets, local markets, Mizo culture, traditional food and green viewpoints, with a day trip to the surrounding countryside.",
//     coverImage: "/images/Itinerary/aizwals.jpg",
//     isPremium: false,
//     price: 149,
//     direction: "northeast",
//     budget: { min: 7000, max: 14000, currency: "INR" },
//     occasions: ["solo", "friends", "couple"],
//     travelStyles: ["backpacker", "culture", "nature", "slow-travel"],
//     cultures: ["heritage", "local-food", "festivals", "crafts"],
//     seasons: ["winter", "pleasant"],
//     tripTypes: ["mountains", "city-exploration", "culture"],
//     theme: {
//       primary: "#356859",
//       secondary: "#DCE9D8",
//       background: "#F5F8F0",
//       surface: "#FFFFFF",
//       accent: "#D6A64F",
//       text: "#263D32",
//       muted: "#78877A",
//       border: "#D5E1D1",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Arrive in Aizawl",
//         description:
//           "Arrive in Aizawl and settle into your stay. Explore the hilly streets and Bara Bazar, try local food and enjoy the views as the city lights come on. Allow enough time for the transfer from Lengpui Airport if arriving by air.",
//         locations: ["Aizawl", "Bara Bazar", "Aizawl City Centre"],
//       },
//       {
//         day: 2,
//         title: "Culture, Museum and Local Markets",
//         description:
//           "Visit the Mizoram State Museum if open, then explore local markets and neighbourhoods. Learn about Mizo history and culture, and keep the evening free for a relaxed meal or viewpoint.",
//         locations: [
//           "Mizoram State Museum",
//           "Bara Bazar",
//           "Aizawl",
//           "Local Cafes",
//         ],
//       },
//       {
//         day: 3,
//         title: "Reiek — Hills and Village Life",
//         description:
//           "Take a day trip towards Reiek, known for its hills and surrounding forest landscape. Explore the village area and cultural displays if available. Check local transport and weather conditions before setting out.",
//         locations: ["Aizawl", "Reiek", "Reiek Heritage Village", "Reiek Hills"],
//       },
//       {
//         day: 4,
//         title: "Durtlang Hills and Slow Aizawl",
//         description:
//           "Visit Durtlang Hills for panoramic views when the weather is clear. Spend the rest of the day exploring local neighbourhoods, sampling Mizo dishes and shopping for local crafts.",
//         locations: ["Durtlang Hills", "Aizawl", "Local Markets", "Food Spots"],
//       },
//       {
//         day: 5,
//         title: "Breakfast and Departure",
//         description:
//           "Enjoy breakfast and a final short walk if time permits. Check out and travel towards Lengpui Airport or your next transport connection, allowing enough time for the road journey.",
//         locations: ["Aizawl", "Lengpui Airport"],
//       },
//     ],
//   },
//   // 16.Prayagraj Dussehra
//   {
//     id: "prayagraj-dussehra-festival",
//     slug: "prayagraj-dussehra-festival",
//     title: "Prayagraj Dussehra — Local Festival Experience",
//     destination: "Prayagraj, Uttar Pradesh",
//     duration: 2,
//     description:
//       "Experience the cultural spirit of Dussehra in Prayagraj through traditional Ramlila performances, decorated Chowkis and Jhankis, local markets, temple visits and the city's festive atmosphere. Discover a local celebration where devotion, storytelling and community traditions come together.",

//     coverImage: "/images/Itinerary/prayagraj.jpg",
//     isPremium: false,
//     price: 0,

//     direction: "North India",

//     budget: {
//       min: 2000,
//       max: 6000,
//       currency: "INR",
//     },

//     occasions: ["festival"],

//     travelStyles: ["backpacker", "culture", "spiritual", "slow-travel"],

//     cultures: [
//       "festivals",
//       "local-festivals",
//       "local-culture",
//       "religious-heritage",
//       "local-food",
//       "heritage",
//     ],

//     seasons: ["pleasant"],

//     tripTypes: ["festival", "cultural", "spiritual", "city-exploration"],

//     theme: {
//       primary: "#87452D",
//       secondary: "#F3E2CC",
//       background: "#FFF9F0",
//       surface: "#FFFFFF",
//       accent: "#D7A84B",
//       text: "#432D24",
//       muted: "#89776A",
//       border: "#E9D6C1",
//       buttonText: "#FFFFFF",
//     },

//     days: [
//       {
//         day: 1,
//         title: "Discover Prayagraj — Heritage, Temples & Festive Streets",
//         description:
//           "Arrive in Prayagraj and settle into your stay. Explore the city's cultural and spiritual side with a visit to Daraganj, nearby temples and the historic riverfront. Spend the afternoon exploring local markets and tasting regional street food. In the evening, look for scheduled Ramlila performances or Dussehra-related Chowki and Jhanki celebrations. Ask local residents or event organisers for the current year's programme before heading out.",

//         locations: [
//           "Prayagraj",
//           "Daraganj",
//           "Triveni Sangam",
//           "Local Markets",
//           "Ramlila Venues",
//         ],
//       },

//       {
//         day: 2,
//         title: "Dussehra Celebrations — Chowkis, Jhankis & Local Culture",
//         description:
//           "Spend the day discovering Prayagraj's Dussehra traditions. Check the current year's schedule for the decorated Chowkis and Jhanki processions associated with areas such as Pattarchatti, Pajawa and Katra. Experience the festive atmosphere, devotional performances and local food stalls where available. If scheduled, attend a Ramlila performance or a Vijayadashami celebration. Keep your evening flexible because procession routes and event timings may change each year.",

//         locations: [
//           "Pattarchatti",
//           "Pajawa",
//           "Katra",
//           "Local Ramlila Venues",
//           "Prayagraj City",
//         ],
//       },
//     ],
//   },
//   // 17.Hornbill
//   {
//     id: "hornbill-festival-nagaland-7-days",
//     slug: "hornbill-festival-nagaland-7-days",
//     title: "Hornbill Festival, Nagaland — 7 Days",
//     destination: "Kohima and Kisama, Nagaland, Northeast India",
//     duration: 7,
//     description:
//       "Experience Nagaland's vibrant Hornbill Festival through traditional Naga performances, heritage morungs, local cuisine, handicrafts, music and scenic mountain landscapes.",

//     coverImage: "/images/Itinerary/hornbill.jpg",
//     isPremium: false,
//     price: 99,

//     // Filtering metadata
//     direction: "northeast",

//     budget: {
//       min: 10000,
//       max: 22000,
//       currency: "INR",
//     },

//     occasions: ["long-weekend"],
//     travelStyles: ["solo", "culture", "friends"],

//     cultures: [
//       "festivals",
//       "villages",
//       "food",
//       "heritage",
//       "folk-art",
//       "crafts",
//     ],

//     seasons: ["winter"],
//     tripTypes: [ "culture"],

//     theme: {
//       primary: "#65452F",
//       secondary: "#E9D8C5",
//       background: "#FAF6F0",
//       surface: "#FFFFFF",
//       accent: "#C58A3A",
//       text: "#382D25",
//       muted: "#817568",
//       border: "#E3D7C8",
//       buttonText: "#FFFFFF",
//     },

//     days: [
//       {
//         day: 1,
//         title: "Arrive in Dimapur and Travel to Kohima",
//         description:
//           "Arrive in Dimapur by your confirmed transport connection and continue to Kohima by road. Check in, explore the local market and prepare for the festival. Allow extra travel time for mountain roads.",
//         locations: ["Dimapur", "Kohima"],
//       },
//       {
//         day: 2,
//         title: "Hornbill Festival at Kisama",
//         description:
//           "Spend the day at Naga Heritage Village in Kisama. Explore traditional morungs and experience cultural performances, music, handicrafts and food stalls according to the published programme.",
//         locations: ["Kohima", "Kisama Heritage Village"],
//       },
//       {
//         day: 3,
//         title: "Naga Traditions, Music and Local Food",
//         description:
//           "Return to Kisama for more festival experiences. Explore traditional arts, local cuisine and scheduled performances. Check entry arrangements and event timings before travelling.",
//         locations: ["Kisama Heritage Village", "Kohima"],
//       },
//       {
//         day: 4,
//         title: "Kohima Heritage and History",
//         description:
//           "Explore Kohima's local markets and visit the Kohima War Cemetery. Keep time available for festival activities you may have missed.",
//         locations: ["Kohima War Cemetery", "Kohima Market"],
//       },
//       {
//         day: 5,
//         title: "Khonoma Village Experience",
//         description:
//           "Take a day trip to Khonoma, known for its village heritage and community-led conservation. Respect local customs and check access arrangements before visiting.",
//         locations: ["Kohima", "Khonoma Village"],
//       },
//       {
//         day: 6,
//         title: "Final Festival Day or Mountain Exploration",
//         description:
//           "Use this day for another visit to Kisama if the festival is still running during your dates. Otherwise, explore nearby landscapes or enjoy a relaxed day in Kohima.",
//         locations: ["Kohima", "Kisama Heritage Village"],
//       },
//       {
//         day: 7,
//         title: "Return to Dimapur",
//         description:
//           "Leave Kohima with sufficient buffer time for the road journey to Dimapur and your onward connection. Confirm transport timings before departure.",
//         locations: ["Kohima", "Dimapur"],
//       },
//     ],
//   },


// {
//   id: "kargil-autumn-7-days",
//   slug: "kargil-autumn-7-days",
//   title: "Kargil in Autumn — 7 Days",
//   destination: "Kargil, Suru Valley and Drass, Ladakh",
//   duration: 7,
//   description:
//     "Explore Kargil in autumn through golden mountain landscapes, quiet villages, historic landmarks, Suru Valley views and the rich Balti culture of Ladakh.",

//   coverImage: "/images/Itinerary/kargil-autumn.jpg",
//   isPremium: false,
//   price: 99,

//   // Filtering metadata
//   direction: "north",

//   budget: {
//     min: 12000,
//     max: 24000,
//     currency: "INR",
//   },

//   occasions: ["long-weekend", "spontaneous"],
//   travelStyles: ["solo", "culture", "nature", "backpacker"],

//   cultures: [
//     "villages",
//     "food",
//     "heritage",
//     "folk-art",
//   ],

//   seasons: ["autumn", "pleasant"],
//   tripTypes: ["mountains", "valleys", "road-trip", "culture"],

//   theme: {
//     primary: "#8B5E3C",
//     secondary: "#E8D5BE",
//     background: "#FAF5ED",
//     surface: "#FFFFFF",
//     accent: "#C58A3A",
//     text: "#382D25",
//     muted: "#817568",
//     border: "#E5D7C5",
//     buttonText: "#FFFFFF",
//   },

//   days: [
//     {
//       day: 1,
//       title: "Arrive in Kargil",
//       description:
//         "Arrive in Kargil and settle into your accommodation. Explore the local bazaar, enjoy traditional Ladakhi or Balti food, and take an easy walk through town while acclimatising to the altitude.",
//       locations: ["Kargil Town", "Kargil Bazaar"],
//     },
//     {
//       day: 2,
//       title: "Kargil Heritage and Local Life",
//       description:
//         "Discover Kargil's cultural character through its old streets, local markets and regional cuisine. Visit nearby heritage sites where access is available, and keep the afternoon relaxed.",
//       locations: ["Kargil Town", "Local Market"],
//     },
//     {
//       day: 3,
//       title: "Suru Valley and Panoramic Landscapes",
//       description:
//         "Travel through Suru Valley, known for its mountain scenery, traditional settlements and views of the surrounding peaks. Enjoy photo stops and village walks, checking road and weather conditions before setting out.",
//       locations: ["Kargil", "Suru Valley", "Sankoo"],
//     },
//     {
//       day: 4,
//       title: "Rangdum Route and Mountain Views",
//       description:
//         "Explore the Suru Valley route towards Rangdum if road conditions and daylight permit. Experience remote landscapes and quiet settlements, then return according to your transport plan. Do not assume the full route is accessible in late autumn.",
//       locations: ["Suru Valley", "Rangdum Route"],
//     },
//     {
//       day: 5,
//       title: "Drass and the Mountain Road",
//       description:
//         "Travel towards Drass and experience its dramatic mountain setting. Learn about the region's history and visit the Kargil War Memorial at Drass if transport, opening arrangements and road conditions allow.",
//       locations: ["Kargil", "Drass", "Kargil War Memorial"],
//     },
//     {
//       day: 6,
//       title: "Village Culture and a Slow Day",
//       description:
//         "Spend a slower day exploring accessible villages around Kargil. Talk with local residents respectfully, sample regional dishes and enjoy the changing autumn colours before the colder weather sets in.",
//       locations: ["Kargil", "Nearby Villages"],
//     },
//     {
//       day: 7,
//       title: "Local Breakfast and Departure",
//       description:
//         "Enjoy a final local breakfast and depart for your onward destination. Keep a generous buffer for road travel, and confirm transport in advance because autumn weather can affect mountain routes.",
//       locations: ["Kargil Town"],
//     },
//   ],
// },

// {
//   id: "kargil-spring-7-days",
//   slug: "kargil-spring-7-days",
//   title: "Kargil in Spring — 7 Days",
//   destination: "Kargil, Ladakh",
//   duration: 7,
//   description:
//     "Discover Kargil as winter begins to loosen its grip, with peaceful town walks, local culture, river valleys and mountain views. A slower journey for travellers who prefer quiet places over crowded tourist circuits.",

//   coverImage: "/images/Itinerary/kargil-spring.jpg",
//   isPremium: false,
//   price: 99,

//   // Filtering metadata
//   direction: "north",

//   budget: {
//     min: 12000,
//     max: 25000,
//     currency: "INR",
//   },

//   occasions: ["long-weekend", "spontaneous"],
//   travelStyles: ["solo", "culture", "nature", "backpacker"],

//   cultures: [
//     "villages",
//     "food",
//     "heritage",
//     "folk-art",
//   ],

//   seasons: ["spring"],
//   tripTypes: ["mountains", "valleys", "road-trip", "culture"],

//   theme: {
//     primary: "#53745A",
//     secondary: "#DCE8D8",
//     background: "#F5F7F0",
//     surface: "#FFFFFF",
//     accent: "#C58A3A",
//     text: "#29382D",
//     muted: "#758174",
//     border: "#D9E2D5",
//     buttonText: "#FFFFFF",
//   },

//   days: [
//     {
//       day: 1,
//       title: "Arrive and Settle into Kargil",
//       description:
//         "Arrive in Kargil, check into your accommodation and take a gentle walk around town. Keep the first day light to adjust to the altitude, and check which roads and local attractions are accessible in spring.",
//       locations: ["Kargil Town", "Kargil Bazaar"],
//     },
//     {
//       day: 2,
//       title: "Discover Kargil's Local Culture",
//       description:
//         "Explore the local bazaar, sample regional food and learn about the area's Balti and Ladakhi cultural influences. Enjoy a relaxed day rather than planning strenuous activities at altitude.",
//       locations: ["Kargil Bazaar", "Kargil Town"],
//     },
//     {
//       day: 3,
//       title: "River Valleys and Mountain Views",
//       description:
//         "Explore accessible stretches around the Suru River and nearby settlements. Spring conditions can vary considerably, so choose short outings based on the weather, road access and local advice.",
//       locations: ["Kargil", "Suru River", "Sankoo"],
//     },
//     {
//       day: 4,
//       title: "Explore Nearby Villages",
//       description:
//         "Visit accessible villages around Kargil to experience local architecture, everyday life and regional hospitality. Ask before photographing people or private property, and check transport availability in advance.",
//       locations: ["Kargil", "Nearby Villages"],
//     },
//     {
//       day: 5,
//       title: "Drass and Regional History",
//       description:
//         "If the road is open and conditions are suitable, take a trip towards Drass to see its mountain landscapes and learn about the region's history. Confirm the status of the Kargil War Memorial before travelling.",
//       locations: ["Kargil", "Drass", "Kargil War Memorial"],
//     },
//     {
//       day: 6,
//       title: "Suru Valley Exploration",
//       description:
//         "Spend the day exploring accessible parts of Suru Valley. Enjoy river views, village scenery and photography, but avoid assuming that higher routes or distant destinations are open after winter.",
//       locations: ["Kargil", "Suru Valley"],
//     },
//     {
//       day: 7,
//       title: "A Slow Morning and Departure",
//       description:
//         "Enjoy breakfast, pick up local provisions and prepare for your onward journey. Spring road conditions can be unpredictable, so keep departure plans flexible and confirm transport before leaving.",
//       locations: ["Kargil Town"],
//     },
//   ],
// },

//   {
//     id: "vrindavan-holi-5-days",
//     slug: "vrindavan-holi-5-days",
//     title: "Vrindavan Holi — 5 Days",
//     destination: "Mathura and Vrindavan, Uttar Pradesh",
//     duration: 5,
//     description:
//       "Experience the colours of Braj through temple traditions, devotional music, flower celebrations, old-town lanes and the spiritual atmosphere of Mathura and Vrindavan.",
//     coverImage: "/images/Itinerary/vrindavan-holi.jpg",
//     isPremium: false,
//     price: 99,
//     direction: "north",
//     budget: { min: 5000, max: 12000, currency: "INR" },
//     occasions: ["festive"],
//     travelStyles: ["solo", "friends", "culture", "backpacker"],
//     cultures: ["festivals", "heritage", "food", "villages"],
//     seasons: ["spring"],
//     tripTypes: ["festival", "culture", "spiritual"],
//     theme: {
//       primary: "#9C3D67",
//       secondary: "#F5D8E6",
//       background: "#FFF7FA",
//       surface: "#FFFFFF",
//       accent: "#E8A317",
//       text: "#482536",
//       muted: "#8A7180",
//       border: "#EAD4DF",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Arrive in Mathura",
//         description:
//           "Arrive in Mathura, explore the local market and visit accessible temples. Keep the evening relaxed and confirm the next day's festival arrangements.",
//         locations: ["Mathura", "Mathura Old City"],
//       },
//       {
//         day: 2,
//         title: "Vrindavan Temple Traditions",
//         description:
//           "Explore Vrindavan's temple streets and devotional atmosphere. Follow temple rules and check official timings because festival crowds can affect entry.",
//         locations: ["Vrindavan", "Banke Bihari Temple Area"],
//       },
//       {
//         day: 3,
//         title: "Celebrate Holi in Braj",
//         description:
//           "Experience the Holi celebration scheduled for your travel dates. Choose an organised, permitted event, protect your eyes and phone, and avoid overcrowded areas.",
//         locations: ["Vrindavan", "Braj Region"],
//       },
//       {
//         day: 4,
//         title: "Barsana or Nandgaon Excursion",
//         description:
//           "If the traditional celebrations align with your dates, visit Barsana or Nandgaon using confirmed transport. Otherwise, enjoy Mathura's cultural sites and local food.",
//         locations: ["Barsana", "Nandgaon"],
//       },
//       {
//         day: 5,
//         title: "Local Breakfast and Departure",
//         description:
//           "Enjoy a final local breakfast, pick up regional sweets and depart with extra time for festival traffic.",
//         locations: ["Mathura", "Vrindavan"],
//       },
//     ],
//   },

//   // {
//   //   id: "raulane-festival-kinnaur-5-days",
//   //   slug: "raulane-festival-kinnaur-5-days",
//   //   title: "Raulane Festival — Kinnaur, 5 Days",
//   //   destination: "Kinnaur, Himachal Pradesh",
//   //   duration: 5,
//   //   description:
//   //     "Discover Kinnaur's village traditions, Himalayan architecture, local food and the distinctive Raulane festival experience in a quieter corner of Himachal Pradesh.",
//   //   coverImage: "/images/Itinerary/raulane-festival.jpg",
//   //   isPremium: false,
//   //   price: 99,
//   //   direction: "north",
//   //   budget: { min: 8000, max: 18000, currency: "INR" },
//   //   occasions: ["festive"],
//   //   travelStyles: ["solo", "friends", "culture", "backpacker", "nature"],
//   //   cultures: ["festivals", "villages", "heritage", "folk-art", "food"],
//   //   seasons: ["spring"],
//   //   tripTypes: ["festival", "culture", "mountains", "villages"],
//   //   theme: {
//   //     primary: "#795548",
//   //     secondary: "#E6D5C4",
//   //     background: "#F8F4EE",
//   //     surface: "#FFFFFF",
//   //     accent: "#B98543",
//   //     text: "#382C25",
//   //     muted: "#80746B",
//   //     border: "#E2D6C9",
//   //     buttonText: "#FFFFFF",
//   //   },
//   //   days: [
//   //     {
//   //       day: 1,
//   //       title: "Arrive in Kinnaur",
//   //       description:
//   //         "Travel to your booked village or base town, settle in and enjoy the mountain surroundings. Confirm local transport and festival dates with your host.",
//   //       locations: ["Reckong Peo", "Kinnaur"],
//   //     },
//   //     {
//   //       day: 2,
//   //       title: "Village Culture and Architecture",
//   //       description:
//   //         "Explore accessible village lanes, traditional architecture and local food. Ask residents about customs and photography etiquette before documenting community life.",
//   //       locations: ["Kinnaur Villages"],
//   //     },
//   //     {
//   //       day: 3,
//   //       title: "Raulane Festival Experience",
//   //       description:
//   //         "Attend the Raulane celebrations if they are taking place during your visit and open to visitors. Follow community guidance and do not assume the ritual programme or date is fixed.",
//   //       locations: ["Festival Host Village", "Kinnaur"],
//   //     },
//   //     {
//   //       day: 4,
//   //       title: "Mountain Views and Local Food",
//   //       description:
//   //         "Spend a slow day exploring accessible viewpoints and village cafés or homestays. Keep plans flexible for changing weather and road conditions.",
//   //       locations: ["Kinnaur", "Nearby Viewpoints"],
//   //     },
//   //     {
//   //       day: 5,
//   //       title: "Return Journey",
//   //       description:
//   //         "Enjoy breakfast with your host and begin your return journey. Leave enough time for mountain-road delays.",
//   //       locations: ["Kinnaur", "Reckong Peo"],
//   //     },
//   //   ],
//   // },

//   {
//     id: "dev-deepawali-varanasi-4-days",
//     slug: "dev-deepawali-varanasi-4-days",
//     title: "Dev Deepawali in Varanasi — 4 Days",
//     destination: "Varanasi, Uttar Pradesh",
//     duration: 4,
//     description:
//       "Witness the ghats illuminated with lamps, experience the Ganga Aarti, explore ancient lanes and discover Varanasi's spiritual and culinary traditions.",
//     coverImage: "/images/Itinerary/dev-deepawali-varanasi.jpg",
//     isPremium: false,
//     price: 99,
//     direction: "north",
//     budget: { min: 6000, max: 15000, currency: "INR" },
//     occasions: ["festive"],
//     travelStyles: ["solo", "friends", "culture", "backpacker"],
//     cultures: ["festivals", "heritage", "food"],
//     seasons: ["autumn", "pleasant"],
//     tripTypes: ["festival", "spiritual", "culture", "city-break"],
//     theme: {
//       primary: "#8B4A24",
//       secondary: "#F4D9A6",
//       background: "#FFF8EA",
//       surface: "#FFFFFF",
//       accent: "#D99A22",
//       text: "#3C2B20",
//       muted: "#817365",
//       border: "#EADCC5",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Arrive in Varanasi",
//         description:
//           "Check in, explore the old-city lanes and visit the riverfront. Choose a less crowded ghat for your first evening and confirm local access arrangements.",
//         locations: ["Varanasi Old City", "Ganga Ghats"],
//       },
//       {
//         day: 2,
//         title: "Temples and Morning Boat Views",
//         description:
//           "Start early for river views, explore historic lanes and sample local breakfast dishes. Follow current rules for temple entry and river activities.",
//         locations: ["Dashashwamedh Ghat", "Varanasi Old City"],
//       },
//       {
//         day: 3,
//         title: "Dev Deepawali Celebration",
//         description:
//           "Experience the festival from a permitted viewing area and admire the illuminated riverfront. Expect heavy crowds and follow official traffic, boat and safety instructions.",
//         locations: ["Ganga Ghats", "Varanasi Riverfront"],
//       },
//       {
//         day: 4,
//         title: "Local Food and Departure",
//         description:
//           "Enjoy a final walk and a local breakfast before departure. Allow a generous buffer for festival-related road restrictions.",
//         locations: ["Varanasi", "Local Markets"],
//       },
//     ],
//   },

//   {
//     id: "ayodhya-deepotsav-4-days",
//     slug: "ayodhya-deepotsav-4-days",
//     title: "Ayodhya Deepotsav — 4 Days",
//     destination: "Ayodhya, Uttar Pradesh",
//     duration: 4,
//     description:
//       "Experience Ayodhya's festive atmosphere through the Sarayu riverfront, temple visits, Ramayana heritage and the lights and rituals associated with Deepotsav.",
//     coverImage: "/images/Itinerary/ayodhya-deepotsav.jpg",
//     isPremium: false,
//     price: 99,
//     direction: "north",
//     budget: { min: 5000, max: 12000, currency: "INR" },
//     occasions: ["festive"],
//     travelStyles: ["solo", "friends", "culture", "backpacker"],
//     cultures: ["festivals", "heritage", "food"],
//     seasons: ["autumn", "pleasant"],
//     tripTypes: ["festival", "spiritual", "culture"],
//     theme: {
//       primary: "#A65B25",
//       secondary: "#F8DEB4",
//       background: "#FFF8ED",
//       surface: "#FFFFFF",
//       accent: "#E8A317",
//       text: "#422D20",
//       muted: "#867467",
//       border: "#EAD8C3",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Arrive and Explore Ayodhya",
//         description:
//           "Arrive, settle in and explore accessible heritage streets. Check official advisories for transport, security and festival access.",
//         locations: ["Ayodhya", "Ram Path"],
//       },
//       {
//         day: 2,
//         title: "Temples and Ramayana Heritage",
//         description:
//           "Visit key religious and heritage sites according to current opening arrangements. Dress respectfully and allow extra time for security checks.",
//         locations: ["Ayodhya", "Ram Mandir Area"],
//       },
//       {
//         day: 3,
//         title: "Deepotsav by the Sarayu",
//         description:
//           "Experience Deepotsav activities and the decorated riverfront from approved public areas. Follow official crowd-management instructions and avoid restricted zones.",
//         locations: ["Ram Ki Paidi", "Sarayu Riverfront"],
//       },
//       {
//         day: 4,
//         title: "Morning Walk and Departure",
//         description:
//           "Enjoy a peaceful morning walk, have breakfast and depart after checking transport schedules and any festival traffic restrictions.",
//         locations: ["Ayodhya Old City", "Sarayu Riverfront"],
//       },
//     ],
//   },

//   {
//     id: "mysuru-dasara-5-days",
//     slug: "mysuru-dasara-5-days",
//     title: "Mysuru Dasara — 5 Days",
//     destination: "Mysuru, Karnataka",
//     duration: 5,
//     description:
//       "Discover Mysuru during Dasara with palace illumination, cultural performances, local food, flower displays and the city's celebrated festive traditions.",
//     coverImage: "/images/Itinerary/mysuru-dasara.jpg",
//     isPremium: false,
//     price: 99,
//     direction: "south",
//     budget: { min: 7000, max: 16000, currency: "INR" },
//     occasions: ["festive"],
//     travelStyles: ["solo", "friends", "culture", "backpacker"],
//     cultures: ["festivals", "heritage", "food", "folk-art"],
//     seasons: ["autumn", "pleasant"],
//     tripTypes: ["festival", "culture", "city-break"],
//     theme: {
//       primary: "#7D2538",
//       secondary: "#F1D9A5",
//       background: "#FFF9ED",
//       surface: "#FFFFFF",
//       accent: "#C99A36",
//       text: "#39262A",
//       muted: "#807078",
//       border: "#E8D9C6",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Arrive in Mysuru",
//         description:
//           "Check in and explore the city centre. In the evening, see the illuminated palace from a permitted viewing area and check the official event schedule.",
//         locations: ["Mysuru", "Mysore Palace"],
//       },
//       {
//         day: 2,
//         title: "Palace and Cultural Programmes",
//         description:
//           "Explore Mysore Palace and attend available cultural performances. Confirm entry requirements and programme timings before visiting.",
//         locations: ["Mysore Palace", "Mysuru City"],
//       },
//       {
//         day: 3,
//         title: "Food, Flowers and Local Markets",
//         description:
//           "Visit the flower displays or seasonal exhibitions, explore local markets and sample Mysuru's regional dishes and sweets.",
//         locations: ["Kuppanna Park", "Devaraja Market"],
//       },
//       {
//         day: 4,
//         title: "Jumboo Savari or Festival Highlights",
//         description:
//           "Plan around the official procession date if your visit coincides with it. Arrive early, check viewing arrangements and follow crowd-safety guidance.",
//         locations: ["Mysore Palace", "Jumboo Savari Route"],
//       },
//       {
//         day: 5,
//         title: "Chamundi Hills and Departure",
//         description:
//           "If time and access allow, visit Chamundi Hills before departure. Keep your schedule flexible around festival traffic.",
//         locations: ["Chamundi Hills", "Mysuru"],
//       },
//     ],
//   },

//   {
//     id: "pushkar-holi-4-days",
//     slug: "pushkar-holi-4-days",
//     title: "Pushkar Holi , Pushkar",
//     destination: "Pushkar, Rajasthan",
//     duration: 4,
//     description:
//       "Celebrate Holi in Pushkar while discovering its sacred lake, colourful lanes, local cafés, regional food and the desert landscapes of Rajasthan.",
//     coverImage: "/images/Itinerary/pushkar-holi.jpg",
//     isPremium: false,
//     price: 99,
//     direction: "west",
//     budget: { min: 6000, max: 14000, currency: "INR" },
//     occasions: ["festive"],
//     travelStyles: ["solo", "friends", "culture", "backpacker"],
//     cultures: ["festivals", "heritage", "food"],
//     seasons: ["spring"],
//     tripTypes: ["festival", "culture", "city-break"],
//     theme: {
//       primary: "#B64C2E",
//       secondary: "#F6D8B7",
//       background: "#FFF7EF",
//       surface: "#FFFFFF",
//       accent: "#DDA43A",
//       text: "#432B23",
//       muted: "#877369",
//       border: "#E9D4C1",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Arrive in Pushkar",
//         description:
//           "Check in and walk around Pushkar Lake and the old-town lanes. Explore local shops and enjoy a relaxed evening before the festivities.",
//         locations: ["Pushkar Lake", "Pushkar Old Town"],
//       },
//       {
//         day: 2,
//         title: "Holi in Pushkar",
//         description:
//           "Join a well-managed public celebration that suits your preferences. Use skin-safe colours, protect your eyes and belongings, and respect local rules and personal boundaries.",
//         locations: ["Pushkar Town", "Authorised Celebration Areas"],
//       },
//       {
//         day: 3,
//         title: "Temples, Cafés and Desert Views",
//         description:
//           "Explore the town at a slower pace, visit accessible temples and enjoy regional food. Choose a nearby viewpoint or countryside excursion if conditions permit.",
//         locations: ["Pushkar Old Town", "Savitri Temple Area"],
//       },
//       {
//         day: 4,
//         title: "Breakfast and Departure",
//         description:
//           "Enjoy breakfast, browse local markets and depart with enough time for your onward transport from Pushkar or Ajmer.",
//         locations: ["Pushkar", "Ajmer"],
//       },
//     ],
//   },

//   {
//     id: "durga-puja-kolkata-5-days",
//     slug: "durga-puja-kolkata-5-days",
//     title: "Durga Puja , Kolkata ",
//     destination: "Kolkata, West Bengal",
//     duration: 5,
//     description:
//       "Explore Kolkata during Durga Puja through artistic pandals, traditional dhaak music, Bengali food, neighbourhood celebrations and the city's remarkable festival atmosphere.",
//     coverImage: "/images/Itinerary/durga-puja-kolkata.jpg",
//     isPremium: false,
//     price: 99,
//     direction: "east",
//     budget: { min: 7000, max: 17000, currency: "INR" },
//     occasions: ["festive"],
//     travelStyles: ["solo", "friends", "culture", "backpacker"],
//     cultures: ["festivals", "heritage", "food", "folk-art", "crafts"],
//     seasons: ["autumn", "pleasant"],
//     tripTypes: ["festival", "culture", "city-break"],
//     theme: {
//       primary: "#9E303A",
//       secondary: "#F4D7CF",
//       background: "#FFF7F3",
//       surface: "#FFFFFF",
//       accent: "#D59A42",
//       text: "#42262A",
//       muted: "#887276",
//       border: "#EAD7D2",
//       buttonText: "#FFFFFF",
//     },
//     days: [
//       {
//         day: 1,
//         title: "Arrive in Kolkata",
//         description:
//           "Check in and explore nearby neighbourhoods. Enjoy Bengali food and prepare a route for the pandals you want to visit.",
//         locations: ["Kolkata", "North Kolkata"],
//       },
//       {
//         day: 2,
//         title: "Traditional Pandals and Old Kolkata",
//         description:
//           "Explore selected neighbourhood pandals and observe traditional decorations, devotional music and local community celebrations.",
//         locations: ["Kumartuli", "North Kolkata"],
//       },
//       {
//         day: 3,
//         title: "Themed Pandals and Night Walks",
//         description:
//           "Visit a mix of famous and smaller neighbourhood pandals. Travel by public transport where possible and expect queues, diversions and large crowds.",
//         locations: ["Central Kolkata", "South Kolkata"],
//       },
//       {
//         day: 4,
//         title: "Bengali Food and Cultural Traditions",
//         description:
//           "Explore local food spots and experience more neighbourhood celebrations. If your dates align with the official programme, learn about the rituals and events marking the final days.",
//         locations: ["Kolkata Markets", "Local Puja Pandals"],
//       },
//       {
//         day: 5,
//         title: "Final Festival Moments and Departure",
//         description:
//           "Visit a nearby pandal or market before leaving. If your visit includes Dashami, check local immersion arrangements and road closures.",
//         locations: ["Kolkata", "Hooghly Riverfront"],
//       },
//     ],
//   },


// {
//   id: "sangla-holi-5-days",
//   slug: "sangla-holi-5-days",
//   title: "Sangla Holi , Sangla ",
//   destination: "Sangla Valley, Kinnaur, Himachal Pradesh",
//   duration: 5,
//   description:
//     "Experience Holi in the peaceful Himalayan village of Sangla, surrounded by snow-dusted mountains, traditional Kinnauri homes, local customs and the quiet beauty of Baspa Valley in spring.",

//   coverImage: "/images/Itinerary/sangla-holi.jpg",
//   isPremium: false,
//   price: 99,

//   // Filtering metadata
//   direction: "north",

//   budget: {
//     min: 7000,
//     max: 16000,
//     currency: "INR",
//   },

//   occasions: ["festive"],
//   travelStyles: ["solo", "friends", "culture", "backpacker", "nature"],

//   cultures: [
//     "festivals",
//     "villages",
//     "food",
//     "heritage",
//     "folk-art",
//   ],

//   seasons: ["spring"],
//   tripTypes: ["festival", "culture", "mountains", "valleys", "villages"],

//   theme: {
//     primary: "#6B7350",
//     secondary: "#E3DFC7",
//     background: "#F7F6EE",
//     surface: "#FFFFFF",
//     accent: "#C58A3A",
//     text: "#30372B",
//     muted: "#777B69",
//     border: "#DFE0D2",
//     buttonText: "#FFFFFF",
//   },

//   days: [
//     {
//       day: 1,
//       title: "Journey to Sangla Valley",
//       description:
//         "Travel to Sangla through the mountain roads of Kinnaur. Check into a homestay, enjoy views of the Baspa Valley and spend the evening adjusting to the altitude. Confirm road conditions and transport before departure.",
//       locations: ["Reckong Peo", "Sangla"],
//     },
//     {
//       day: 2,
//       title: "Explore Traditional Sangla",
//       description:
//         "Walk through Sangla village, admire traditional Kinnauri architecture and explore small local shops. Enjoy a home-cooked meal and learn about everyday life in the valley.",
//       locations: ["Sangla Village", "Sangla Market"],
//     },
//     {
//       day: 3,
//       title: "Holi with a Himalayan Feel",
//       description:
//         "Celebrate Holi with local residents or at a community gathering if events are taking place during your visit. Ask your host about local customs, participate respectfully and avoid assuming that large organised celebrations are held every year.",
//       locations: ["Sangla Village", "Baspa Valley"],
//     },
//     {
//       day: 4,
//       title: "Chitkul and Baspa Valley",
//       description:
//         "If the road is open and weather permits, take a day trip towards Chitkul, enjoying mountain scenery and village landscapes along the way. In early spring, snow or road closures may prevent access, so keep a local alternative ready.",
//       locations: ["Sangla", "Chitkul", "Baspa Valley"],
//     },
//     {
//       day: 5,
//       title: "A Slow Mountain Morning and Departure",
//       description:
//         "Enjoy breakfast with your homestay host, take a final village walk and begin your return journey. Allow extra time for mountain roads and confirm transport in advance.",
//       locations: ["Sangla Village", "Reckong Peo"],
//     },
//   ],
// },

];

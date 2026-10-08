import type { Destination } from "../../types/destination";

export const destinations: Destination[] = [
  {
  id: "jaipur",
  slug: "jaipur",
  name: "Jaipur",
  state: "Rajasthan",
  country: "India",

  description: `Famous Places to Visit:
Amer Fort, Jaigarh Fort, Nahargarh Fort, Hawa Mahal, City Palace, Jal Mahal, Patrika Gate and the Pink City markets. Don’t miss the sunset from Nahargarh Fort.

Famous Food to Eat:
Pyaz Kachori, Ghewar, Faluda Ice Cream, Mirchi Bada, Aloo Tikki, Jaipur-style Lassi, Samosa and Kulhad Chai.`,
  coverImage: "/images/destinations/jaipur.jpg",
  visited: true,
  planned: false,
},
  {
    id: "varanasi",
    slug: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    country: "India",
    description:
      "One of India's oldest living cities, famous for the Ganges, ancient ghats, temples, narrow lanes and spiritual atmosphere. Important places to visit: Assi Ghat, Dashashwamedh Ghat, Manikarnika Ghat, Kashi Vishwanath Temple, Sankat Mochan Temple, Kaal Bhairav Temple, Godowlia Market and the Ganga Aarti.",
    coverImage: "/images/destinations/varansi.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "amritsar",
    slug: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    country: "India",
    description:
      "A historic city of Punjab known for Sikh heritage, incredible food and a strong cultural atmosphere. Important places to visit: Golden Temple, Jallianwala Bagh, Partition Museum, Wagah-Attari Border, Gobindgarh Fort and the old Amritsari streets and markets.",
    coverImage: "/images/destinations/amritsar.jpg",
    visited: false,
    planned: true,
  },


  
  {
    id: "rishikesh",
    slug: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    country: "India",
    description:
      "A riverside Himalayan town known for spirituality, yoga, cafés, adventure activities and the Ganges flowing through the city. Important places to visit: Laxman Jhula area, Ram Jhula, Triveni Ghat, Beatles Ashram, Neer Garh Waterfall, Parmarth Niketan and the riverside cafés. River rafting is one of the most popular experiences here.",
    coverImage: "/images/destinations/rishikesh.jpg",
    visited: false,
    planned: true,
  },
  {
    id: "jodhpur",
    slug: "jodhpur",
    name: "Jodhpur",
    state: "Rajasthan",
    country: "India",
    description:
      "The Blue City of Rajasthan, dominated by the massive Mehrangarh Fort and surrounded by historic blue-painted houses. Important places to visit: Mehrangarh Fort, Jaswant Thada, Umaid Bhawan Palace, Toorji Ka Jhalra, Mandore Gardens, Clock Tower and Sardar Market. The old-city lanes are especially beautiful around sunset.",
    coverImage: "/images/destinations/jodhpur.jpg",
    visited: false,
    planned: true,
  },
   {
    id: "jaisalmer",
    slug: "jaisalmer",
    name: "Jaisalmer",
    state: "Rajasthan",
    country: "India",
    description:
        "The Golden City rising from the Thar Desert, famous for its yellow sandstone architecture, historic havelis and desert landscapes. Important places to visit: Jaisalmer Fort, Patwon Ki Haveli, Salim Singh Ki Haveli, Nathmal Ki Haveli, Gadisar Lake, Bada Bagh and Sam Sand Dunes. A desert sunset and overnight desert camp are must-do experiences.",
    coverImage: "/images/destinations/jaisalmer.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "manali",
    slug: "manalai",
    name: "Manali",
    state: "Himanchal Pradesh",
    country: "India",
    description:
        "A popular Himalayan mountain town surrounded by pine forests, snow-covered peaks, rivers and alpine landscapes. Important places to visit: Old Manali, Hadimba Temple, Manu Temple, Vashisht, Jogini Waterfall, Solang Valley, Atal Tunnel and Sissu. It is also a major gateway for exploring Lahaul and Spiti.",

    coverImage: "/images/destinations/manali.jpg",
    visited: true,
    planned: false,
  },

  {
    id: "mysore",
    slug: "mysore",
    name: "Mysore",
    state: "Karnataka",
    country: "India",
    description:
        "A royal city of Karnataka known for grand palaces, heritage buildings, gardens and South Indian culture. Important places to visit: Mysore Palace, Chamundi Hill, Devaraja Market, St. Philomena's Church, Karanji Lake and Brindavan Gardens. The illuminated Mysore Palace is especially impressive.",

    coverImage: "/images/destinations/mysores.jpg",
    visited: false,
    planned: true,
  },
   {
    id: "dehradun",
    slug: "dehradun",
    name: "Dehradun",
    state: "Uttarakhand",
    country: "India",
    description:
        "A peaceful gateway to the Garhwal Himalayas, known for forested surroundings, waterfalls, caves and nearby hill towns. Important places to visit: Robber's Cave, Sahastradhara, Forest Research Institute, Tapkeshwar Temple, Malsi Deer Park and the Tibetan Market. Dehradun is also a convenient base for Mussoorie and nearby destinations.",

    coverImage: "/images/destinations/dehradun.jpg",
    visited: false,
    planned: true,
  },
  {
    id: "rameshwaram",
    slug: "rameshwaram",
    name: "Rameshwaram",
    state: "Tamil Nadu",
    country: "India",
    description:
        "A sacred island town in Tamil Nadu known for its temples, beaches, coastal landscapes and connection to the Ramayana. Important places to visit: Ramanathaswamy Temple, Agni Theertham, Pamban Bridge, Dhanushkodi, Arichal Munai and Abdul Kalam Memorial.",

    coverImage: "/images/destinations/rameshwaram.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "tabo",
    slug: "tabo",
    name: "Tabo",
    state: "Himanchal Pradesh",
    country: "India",
    description:
        "A peaceful ancient village in Spiti Valley known for its historic Buddhist monastery, mud-brick houses and dramatic cold-desert surroundings. Important places to visit: Tabo Monastery, Tabo Caves, Dhankar viewpoint and the surrounding village landscapes. Tabo is perfect for experiencing the quiet side of Spiti.",

    coverImage: "/images/destinations/tabo.jpg",
    visited: false,
    planned: true,
  },
   {
    id: "haridwar",
    slug: "haridwar",
    name: "Haridwar",
    state: "Uttarakhand",
    country: "India",
    description:
        "One of India's most important pilgrimage cities, located on the banks of the Ganges and famous for its evening Ganga Aarti. Important places to visit: Har Ki Pauri, Mansa Devi Temple, Chandi Devi Temple, Bharat Mata Mandir, Kankhal and the local markets. The evening aarti at Har Ki Pauri is the highlight.",

    coverImage: "/images/destinations/haridwar.jpg",
    visited: false,
    planned: true,
  },
  
  {
    id: "shimla",
    slug: "shimla",
    name: "Shimla",
    state: "Himanchal Pradesh",
    country: "India",
    description:
        "The former summer capital of British India, known for colonial architecture, mountain views, pine forests and a lively hill-town atmosphere. Important places to visit: Mall Road, The Ridge, Christ Church, Jakhoo Temple, Viceregal Lodge, Summer Hill, Annandale and Kufri.",

    coverImage: "/images/destinations/shimla.jpg",
    visited: false,
    planned: true,
  },
  {
    id: "kalpa",
    slug: "Kalpa",
    name: "Kalpa",
    state: "Himanchal Pradesh",
    country: "India",
    description:
        "A peaceful Himalayan village in Kinnaur famous for spectacular views of the Kinnaur Kailash range, apple orchards and traditional mountain villages. Important places to visit: Suicide Point, Chakka, Narayan-Nagini Temple, Roghi Village and the old Kalpa village. Sunset and sunrise views of Kinnaur Kailash are the main attraction.",

    coverImage: "/images/destinations/kalpa.jpg",
    visited: false,
    planned: true,
  },
   
   {
    id: "sangla",
    slug: "sangla",
    name: "Sangla",
    state: "Himanchal Pradesh",
    country: "India",
    description:
        "A beautiful Himalayan valley in Kinnaur surrounded by snow-covered mountains, apple orchards, forests and the Baspa River. Important places to visit: Sangla Valley, Kamru Fort, Batseri Village, Rakcham and Chitkul. The drive through the Baspa Valley is itself one of the major experiences.",

    coverImage: "/images/destinations/sangla.jpg",
    visited: false,
    planned: true,
  },
   {
    id: "raksham",
    slug: "raksham",
    name: "Raksham",
    state: "Himanchal Pradesh",
    country: "India",
    description:
       "A quiet Himalayan village in the Baspa Valley surrounded by forests, mountain peaks and open meadows. Important places to visit: Rakcham village, Baspa River, nearby forest trails, Batseri and the road towards Chitkul. It is ideal for travellers looking for a peaceful mountain escape away from busy tourist towns.",

    coverImage: "/images/destinations/raksham.jpg",
    visited: false,
    planned: true,
  },
  
  {
    id: "langza",
    slug: "langza",
    name: "Langza",
    state: "Himanchal Pradesh",
    country: "India",
    description:
       "A high-altitude village in Spiti Valley famous for its giant Buddha statue, fossil-rich landscape and spectacular views of the surrounding mountains. Important places to visit: Giant Buddha Statue, Langza Village, fossil fields and the surrounding Himalayan landscapes. The village is especially beautiful during sunrise and sunset.",

    coverImage: "/images/destinations/langza.jpg",
    visited: true,
    planned: false,
  },
 
  {
    id: "kee",
    slug: "kee",
    name: "Kee Monastery",
    state: "Himanchal Pradesh",
    country: "India",
    description:
        "One of the most important Buddhist monasteries in Spiti Valley, dramatically located on a hill above the Spiti River. Important places to visit: Key Monastery, monastery prayer halls, surrounding viewpoints and nearby Kibber and Gette villages. The panoramic valley view from the monastery is a major highlight.",

    coverImage: "/images/destinations/kee.jpg",
    visited: false,
    planned: true,
  },
  {
    id: "chandratal",
    slug: "chandaratal",
    name: "Chandaratal",
    state: "Himachal Pradesh",
    country: "India",
    description:
       "A high-altitude Himalayan lake surrounded by dramatic mountains and vast cold-desert landscapes. Important places to visit: Chandratal Lake, Kunzum Pass, Batal, nearby camping areas and the surrounding mountain viewpoints. Stargazing and sunrise around the lake are unforgettable experiences.",

    coverImage: "/images/destinations/chandratal.jpg",
    visited: true,
    planned: false,
  },

  

 

  {
    id: "mussoorie",
    slug: "mussoorie",
    name: "Mussoorie",
    state: "Uttarakhand",
    country: "India",
    description:
       "A classic Himalayan hill station known for colonial charm, forested hills, waterfalls and panoramic mountain views. Important places to visit: Mall Road, Gun Hill, Landour, Lal Tibba, Camel's Back Road, Kempty Falls, Company Garden and George Everest.",

    coverImage: "/images/destinations/mussoorie.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "dhanaulti",
    slug: "dhanaulti",
    name: "Dhanaulti",
    state: "Uttarakhand",
    country: "India",
    description:
       "A quiet forested hill destination near Mussoorie, known for deodar forests, peaceful surroundings and Himalayan views. Important places to visit: Eco Park, Dhanaulti forests, Surkanda Devi Temple, Potato Farm and nearby Kanatal. It is a good alternative for travellers looking for a calmer mountain stay.",

    coverImage: "/images/destinations/dhanaulti.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "tungnath",
    slug: "tungnath",
    name: "Tungnath",
    state: "Uttarakhand",
    country: "India",
    description:
       "A high-altitude Himalayan pilgrimage destination famous for Tungnath Temple and the spectacular trek towards Chandrashila. Important places to visit: Tungnath Temple, Chandrashila Peak, Chopta meadows and Deoria Tal. The sunrise from Chandrashila is one of the biggest highlights.",

    coverImage: "/images/destinations/tungnath.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "mathura",
    slug: "mathura",
    name: "Mathura",
    state: "Uttar Pradesh",
    country: "India",
    description:
       "The birthplace of Lord Krishna and an important pilgrimage city filled with temples, ghats and centuries-old cultural traditions. Important places to visit: Shri Krishna Janmabhoomi, Vishram Ghat, Dwarkadhish Temple, Kusum Sarovar and the old Mathura markets. Mathura is best experienced together with nearby Vrindavan.",

    coverImage: "/images/destinations/mathura.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "vrindavan",
    slug: "vrindavan",
    name: "Vrindavan",
    state: "Uttar Pradesh",
    country: "India",
    description:
       "A spiritual town associated with the childhood stories of Lord Krishna, known for temples, devotional music, colorful streets and evening rituals. Important places to visit: Banke Bihari Temple, ISKCON Temple, Prem Mandir, Nidhivan, Radha Raman Temple, Keshi Ghat and the many historic temples around the old town.",

    coverImage: "/images/destinations/vrindavan.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "prayagraj",
    slug: "prayagraj",
    name: "Prayagraj",
    state: "Uttar Pradesh",
    country: "India",
    description:
       "A historic city at the confluence of the Ganges, Yamuna and the mythical Saraswati, known for its spiritual and cultural importance. Important places to visit: Triveni Sangam, Allahabad Fort, Khusro Bagh, Anand Bhavan, Swaraj Bhavan and Bade Hanuman Temple. The Sangam is the city's most important attraction.",

    coverImage: "/images/destinations/prayagraj.jpg",
    visited: false,
    planned: true,
  },

  

  {
    id: "guwahati",
    slug: "guwahati",
    name: "Guwahati",
    state: "Assam",
    country: "India",
    description:
       "The largest city in Assam and an important gateway to Northeast India, surrounded by the Brahmaputra River and green hills. Important places to visit: Kamakhya Temple, Umananda Island, Assam State Museum, Brahmaputra riverfront and Navagraha Temple. Guwahati is also a convenient base for exploring nearby Meghalaya.",

    coverImage: "/images/destinations/guwahati.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "darjeeling",
    slug: "darjeeling",
    name: "Darjeeling",
    state: "West Bengal",
    country: "India",
    description:
       "A famous Himalayan hill station known for tea gardens, colonial charm, mountain views and the Darjeeling Himalayan Railway. Important places to visit: Tiger Hill, Batasia Loop, Darjeeling Himalayan Railway, Darjeeling Mall, Peace Pagoda, Himalayan Mountaineering Institute and tea estates.",

    coverImage: "/images/destinations/darjeeling.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "gangtok",
    slug: "gangtok",
    name: "Gangtok",
    state: "Sikkim",
    country: "India",
    description:
       "The capital of Sikkim, known for clean mountain streets, Buddhist monasteries, Himalayan views and a relaxed hill-town atmosphere. Important places to visit: MG Marg, Rumtek Monastery, Enchey Monastery, Hanuman Tok, Tashi View Point and nearby Tsomgo Lake and Nathula Pass.",

    coverImage: "/images/destinations/gangtok.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "lachung",
    slug: "lachung",
    name: "Lachung",
    state: "Sikkim",
    country: "India",
    description:
       "A beautiful mountain village in North Sikkim surrounded by dramatic Himalayan peaks, rivers and alpine landscapes. Important places to visit: Yumthang Valley, Zero Point, Lachung Monastery and the surrounding mountain villages. Lachung is the main base for exploring the high-altitude landscapes of North Sikkim.",

    coverImage: "/images/destinations/lachung.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "shillong",
    slug: "shillong",
    name: "Shillong",
    state: "Meghalaya",
    country: "India",
    description:
      "The hill capital of Meghalaya, known for green hills, waterfalls, pleasant weather, cafés and a strong local music culture. Important places to visit: Shillong Peak, Elephant Falls, Ward's Lake, Laitlum Canyon, Police Bazaar and nearby Mawphlang. It is also a gateway to Cherrapunji and Dawki.",

    coverImage: "/images/destinations/shilong.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "puri",
    slug: "puri",
    name: "Puri",
    state: "Odisha",
    country: "India",
    description:
      "A coastal pilgrimage city in Odisha famous for the Jagannath Temple, long beaches and traditional Odia culture. Important places to visit: Jagannath Temple, Puri Beach, Gundicha Temple, Swargadwar, Raghurajpur Artist Village and nearby Konark Sun Temple.",

    coverImage: "/images/destinations/puri.jpg",
    visited: false,
    planned: true,
  },
  {
    id: "hikkim",
    slug: "hikkim",
    name: "Hikkim",
    state: "Himachal Pradesh",
    country: "India",
    description:
       "A remote high-altitude village in Spiti Valley famous for its post office and spectacular cold-desert surroundings. Important places to visit: Hikkim Post Office, village lanes, Himalayan viewpoints and nearby Langza and Komic. Hikkim is a great stop for experiencing the remote side of Spiti.",

    coverImage: "/images/destinations/hikkim.jpg",
    visited: true,
    planned: false,
  },

  

  

  {
    id: "kanyakumari",
    slug: "kanyakumari",
    name: "Kanyakumari",
    state: "Tamil Nadu",
    country: "India",
    description:
      "The southernmost tip of mainland India, famous for its dramatic coastline and the meeting of the Arabian Sea, Bay of Bengal and Indian Ocean. Important places to visit: Vivekananda Rock Memorial, Thiruvalluvar Statue, Kanyakumari Beach, Gandhi Mandapam, Sunset Point and the famous sunrise viewpoint.",

    coverImage: "/images/destinations/kanyakumari.jpg",
    visited: false,
    planned: true,
  },
  {
    id: "madurai",
    slug: "madurai",
    name: "Madurai",
    state: "Tamil Nadu",
    country: "India",
    description:
      "One of Tamil Nadu's oldest cities, famous for its magnificent temples, traditional markets and rich Tamil culture. Important places to visit: Meenakshi Amman Temple, Thirumalai Nayakkar Palace, Thirupparankundram Temple, Gandhi Memorial Museum and the bustling streets around the temple.",

    coverImage: "/images/destinations/madurai.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "udaipur",
    slug: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    country: "India",
    description:
      "The City of Lakes, known for romantic lakes, royal palaces, historic streets and beautiful Aravalli landscapes. Important places to visit: City Palace, Lake Pichola, Jag Mandir, Jagdish Temple, Sajjangarh Monsoon Palace, Fateh Sagar Lake, Badi Lake, Gangaur Ghat and Ambrai Ghat. Sunset around Lake Pichola is a must.",

    coverImage: "/images/destinations/udaipur.jpg",
    visited: false,
    planned: true,
  },
  

  {
    id: "bikaner",
    slug: "bikaner",
    name: "Bikaner",
    state: "Rajasthan",
    country: "India",
    description:
       "A historic desert city of Rajasthan known for magnificent forts, havelis, traditional markets and famous Rajasthani food. Important places to visit: Junagarh Fort, Rampuria Haveli, Lalgarh Palace, Karni Mata Temple, Kote Gate and the old city markets.",

    coverImage: "/images/destinations/bikaner.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "bangalore",
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    country: "India",
    description:
       "India's technology capital, known for its pleasant weather, cafés, gardens, nightlife and modern urban culture. Important places to visit: Bangalore Palace, Lalbagh Botanical Garden, Cubbon Park, Vidhana Soudha, Tipu Sultan's Summer Palace, Church Street and Commercial Street.",

    coverImage: "/images/destinations/banglore.jpg",
    visited: false,
    planned: true,
  },

  

  {
    id: "chittaurgarh",
    slug: "chittaurgarh",
    name: "Chittaurgarh",
    state: "Rajasthan",
    country: "India",
    description:
       "A historic city in Rajasthan famous for the massive Chittorgarh Fort and stories of Rajput courage and heritage. Important places to visit: Chittorgarh Fort, Vijay Stambh, Kirti Stambh, Rana Kumbha Palace, Padmini Palace, Meera Temple and Gaumukh Reservoir.",

    coverImage: "/images/destinations/chittaurgarh.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "ajmer",
    slug: "ajmer",
    name: "Ajmer",
    state: "Rajasthan",
    country: "India",
    description:
       "A historic pilgrimage city surrounded by the Aravalli Hills, known for the famous Ajmer Sharif Dargah and its connection with nearby Pushkar. Important places to visit: Ajmer Sharif Dargah, Ana Sagar Lake, Adhai Din Ka Jhonpra, Akbari Fort and Museum and Daulat Bagh.",

    coverImage: "/images/destinations/ajmer.jpg",
    visited: false,
    planned: true,
  },

  {
    id: "pushkar",
    slug: "pushkar",
    name: "Pushkar",
    state: "Rajasthan",
    country: "India",
    description:
     "A colorful desert town built around the sacred Pushkar Lake, famous for temples, ghats, cafés and its relaxed backpacker atmosphere. Important places to visit: Brahma Temple, Pushkar Lake, Savitri Temple, Varaha Temple, Pushkar Ghats and the old bazaar streets. The sunset from Savitri Temple is especially beautiful.",
    coverImage: "/images/destinations/pushkar.jpg",
    visited: false,
    planned: true,
  },

  

 
  
  
];
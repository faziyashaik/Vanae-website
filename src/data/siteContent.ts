export interface SiteContent {
  branding: {
    name: string;
    tagline: string;
    logoLight: string;
    logoDark: string;
    favicon: string;
    primaryColor: string;
    goldColor: string;
  };
  navigation: { label: string; href: string }[];
  hero: {
    videoSrc: string;
    posterSrc: string;
    scrollText: string;
    badgeText: string;
    majorStatement: string;
    supportingCopy: string;
    facts: string[];
  };
  overview: {
    eyebrow: string;
    headingLines: string[];
    paragraphs: string[];
    stats: { value: string; label: string }[];
    badge: string;
    brochureBtnText: string;
  };
  architecture: {
    headingLines: string[];
    supportingCopy: string;
    subheadingLines: string[];
    subheadingCopy: string;
    towerImage: string;
    bgImage: string;
  };
  natureStorytelling: {
    philosophyHeading: string[];
    philosophyCopy: string;
    panels: {
      phrase: string;
      copy: string;
      image?: string;
    }[];
    environmentalBenefits: {
      heading: string;
      supportingCopy: string;
      benefits: string[];
    };
  };
  residential: {
    headingLines: string[];
    supportingCopy: string;
    lifestyleHeading: string[];
    lifestyleCopy: string;
    btnText: string;
    images: { src: string; alt: string }[];
  };
  clubhouseAmenities: {
    headingLines: string[];
    supportingCopy: string;
    bannerText: string;
    bannerSubtext: string;
    bannerBtnText: string;
    categories: {
      name: string;
      items: string[];
    }[];
    featuredCards: {
      title: string;
      desc: string;
      icon: string;
      image: string;
    }[];
  };
  verticalEcosystem: {
    headingLines: string[];
    supportingCopy: string;
    videoUrl: string;
    bgImage: string;
    btnText: string;
  };
  floorPlans: {
    headingLines: string[];
    paragraphs: string[];
    btnText: string;
    plans: { src: string; title: string }[];
  };
  specifications: {
    tag: string;
    heading: string;
    subheading: string;
    categories: {
      title: string;
      items: string[];
    }[];
  };
  location: {
    tag: string;
    headingLines: string[];
    copy: string;
    siteAddress: string;
    corporateAddress: string;
    mapImage: string;
    embedMapUrl: string;
  };
  gallery: {
    tag: string;
    headingLines: string[];
    items: { src: string; title: string; category: string }[];
  };
  contact: {
    tag: string;
    titleLines: string[];
    phonePlaceholderNote: string;
    phone: string;
    displayPhone: string;
    isPhonePlaceholder: boolean;
    email: string;
    siteAddress: string;
    corporateAddress: string;
    reraNumberNote: string;
    socials: { name: string; url: string; short: string }[];
  };
  footer: {
    copyright: string;
    designedBy: string;
    designedByUrl: string;
    siteAddress: string;
    corporateAddress: string;
    reraNumber: string;
  };
  whatsapp?: {
    phoneNumber?: string;
    defaultMessage?: string;
    url?: string;
  };
}

export const siteContent: SiteContent = {
  branding: {
    name: "VANAE",
    tagline: "Ultra-Luxury Bespoke Residences",
    logoLight: "/assets/vanae-logo.jpg",
    logoDark: "/assets/vanae-logo.jpg",
    favicon: "/assets/vanae-logo.jpg",
    primaryColor: "#0D5A46",
    goldColor: "#c39663",
  },
  navigation: [
    { label: "HOME", href: "#hero" },
    { label: "OVERVIEW", href: "#overview" },
    { label: "ARCHITECTURE", href: "#architecture" },
    { label: "NATURE", href: "#nature" },
    { label: "RESIDENCES", href: "#residences" },
    { label: "AMENITIES", href: "#amenities" },
    { label: "ECOSYSTEM", href: "#ecosystem" },
    { label: "FLOOR PLANS", href: "#floor-plans" },
    { label: "LOCATION", href: "#location" },
    { label: "GALLERY", href: "#gallery" },
    { label: "ENQUIRY", href: "#contactus" },
  ],
  hero: {
    videoSrc: "/assets/videos/hero.mp4",
    posterSrc: "/assets/images/hero-poster.jpg",
    scrollText: "SCROLL TO UNLEASH THE EXPERIENCE",
    badgeText: "SEIZE THE MOMENT TO LIVE IN THE SKIES BY THE TREES",
    majorStatement: "In a wonder called Vanae. Welcome home.",
    supportingCopy: "In a wonder called Vanae. Welcome home.",
    facts: [
      "3 & 4 BHK",
      "36 Floors",
      "Spread Across 6 Towers",
      "11-Foot-High Ceilings",
    ],
  },
  overview: {
    eyebrow: "THE ART OF ROOTED LIVING",
    headingLines: ["A NEW SKYLINE IS", "TAKING ROOT."],
    paragraphs: [
      "Somewhere along the way, up into the skies, our homes loose their connection to mother earth. And with it, a vital essence of better living. What if we could rise without leaving it behind?",
      "Planted in the rapidly evolving landscape of Kollur, by ORR Exit 2, Vanae unfolds as a unique residential marvel that's 36 floors high, spread across 6 towers and destined to be home to over 1200 families. It's a colossal symbol of elegance crafted to elevate all who decide to call it home.",
    ],
    stats: [
      { value: "3 & 4", label: "BHK Residences" },
      { value: "36", label: "Floors High" },
      { value: "6", label: "Towers Spread Across" },
      { value: "11 FT", label: "High Ceilings" },
    ],
    badge: "Planted in Kollur, by ORR Exit 2 · Destined for over 1200 Families",
    brochureBtnText: "Download Brochure",
  },
  architecture: {
    headingLines: ["WHERE THE FOREST", "ASCENDS."],
    supportingCopy:
      "Here, the landscape rises with you, creating a vertical tapestry of nature that soothes your soul and transforms your abode into a living ecosystem at every level.",
    subheadingLines: ["THE ART OF", "ROOTED LIVING"],
    subheadingCopy:
      "Somewhere along the way, up into the skies, our homes loose their connection to mother earth. And with it, a vital essence of better living. What if we could rise without leaving it behind?",
    towerImage: "/assets/images/tower-elevation.jpg",
    bgImage: "/assets/images/elevation-bg.jpg",
  },
  natureStorytelling: {
    philosophyHeading: [
      "THERE'S A CERTAIN WONDER IN",
      "RISING HIGHER WHILE",
      "STAYING ROOTED BELOW.",
    ],
    philosophyCopy:
      "And it's what Vanae brings to the table. For you don't just soar to towering heights here. You take a piece of nature with you to every level.",
    panels: [
      {
        phrase: "GROUNDED BY NATURE",
        copy: "In a way where every elevation begins with a connection to earth.",
      },
      {
        phrase: "SERENE BY NATURE",
        copy: "For the sense of calm finds you from both above and around.",
      },
      {
        phrase: "POISED BY NATURE",
        copy: "Because a forest towering into the skies is a sight to behold.",
      },
    ],
    environmentalBenefits: {
      heading: "PERKS THAT COME WITH LIVING HERE",
      supportingCopy:
        "This is a place where the expansive homes are just the beginning of the perks that come with living here.",
      benefits: [
        "Cooler towers & surroundings",
        "Reduced heat gain",
        "Improved visual and psychological connection with nature",
        "Greater environmental impact",
        "More shaded spaces",
      ],
    },
  },
  residential: {
    headingLines: ["BRINGING IN THE", "EASE YOU DESIRE"],
    supportingCopy:
      "Possibilities unfold every day here. With over 50 lifestyle amenities, this community has been thoughtfully curated to engage every generation and every mood. Each space is designed to enrich everyday life while preserving the calm and balance that define the living experience here.",
    lifestyleHeading: ["THE ADDRESS TO", "LIVE ABOVE"],
    lifestyleCopy:
      "Vanae brings together thoughtfully designed 3 & 4 BHK residences, where generous spaces, expansive views and a natural connection to the outdoors come together to create homes that feel open, elegant and effortlessly comfortable.",
    btnText: "The Residences",
    images: [
      { src: "/assets/images/bespoke-1.jpg", alt: "Master Suite with Expansive Views" },
      { src: "/assets/images/bespoke-3.jpg", alt: "Spacious Living Room with 11-Ft Ceilings" },
      { src: "/assets/images/bespoke-2.jpg", alt: "Outdoor Living Balcony" },
    ],
  },
  clubhouseAmenities: {
    bannerText: "Over 50 Lifestyle Amenities Curated Across",
    bannerSubtext: "1,00,000 Sqft Clubhouse",
    bannerBtnText: "Explore Clubhouse",
    headingLines: ["IT ONLY GETS", "BETTER HERE"],
    supportingCopy:
      "Designed as a place to gather, celebrate, compete and retreat, the 1,00,000 sqft clubhouse brings the social, recreational and leisure rhythms of life together in a home’s interconnected setting. It connects building relationships, life's special moments, and there's no other place at home like this.",
    categories: [
      {
        name: "FIRST IMPRESSIONS",
        items: [
          "Entry",
          "Exit",
          "Security Cabin",
          "Branding With Plantation",
          "Entrance Plaza",
          "Pathway",
        ],
      },
      {
        name: "AMENITIES & NATURE",
        items: [
          "Landscaping & Nature",
          "Butterfly Garden",
          "Herbal Garden",
          "Thematic Plantation",
          "Open Amphitheatre / Stage",
          "Event Lawn",
          "Firepit Lawn",
          "Leisure Lawn",
          "Pet Park",
        ],
      },
      {
        name: "SPORTS & ACTIVE LIVING",
        items: [
          "Tennis Court",
          "Squash Court",
          "Half Basketball Court",
          "Cricket Nets",
          "Swimming Pool",
        ],
      },
      {
        name: "WELLNESS & MINDFULNESS",
        items: [
          "Yoga Deck",
          "Meditation Lawn",
          "Spa",
          "Sauna",
          "Physiotherapy Clinic",
        ],
      },
      {
        name: "FAMILY & COMMUNITY",
        items: [
          "Banquet Hall",
          "Mini Theatre",
          "Cafe",
          "Guest Rooms (10)",
          "Creche",
        ],
      },
      {
        name: "WORK & CONVENIENCE",
        items: [
          "Supermarket",
          "Co-working Spaces",
          "Reading Lounge",
          "Salon",
        ],
      },
    ],
    featuredCards: [
      {
        title: "1,00,000 Sqft Clubhouse",
        desc: "A sprawling social hub connecting building relationships, family celebrations, and leisure.",
        icon: "Sparkles",
        image: "/assets/images/amenity-banquet.jpg",
      },
      {
        title: "Swimming Pool & Sports Deck",
        desc: "Championship tennis court, squash court, half basketball court, cricket nets, and swimming pool.",
        icon: "Dumbbell",
        image: "/assets/images/amenity-fitness.jpg",
      },
      {
        title: "Spa, Sauna & Physiotherapy",
        desc: "Dedicated wellness amenities including spa, sauna, and dedicated physiotherapy clinic.",
        icon: "Sparkles",
        image: "/assets/images/amenity-wellbeing.jpg",
      },
      {
        title: "Artisan Cafeteria & Lounge",
        desc: "A vibrant social destination to enjoy specialty coffees and gourmet bites with neighbours.",
        icon: "Coffee",
        image: "/assets/images/amenity-cafe.jpg",
      },
      {
        title: "Reading Lounge & Co-Working",
        desc: "Thoughtfully configured quiet co-working spaces and reading lounges to work and focus.",
        icon: "BookOpen",
        image: "/assets/images/amenity-tranquillity.jpg",
      },
      {
        title: "Mini Theatre & Banquet",
        desc: "Celebrate monumental life moments in grand banquets and enjoy private cinematic screenings.",
        icon: "Gamepad2",
        image: "/assets/images/amenity-gaming.jpg",
      },
    ],
  },
  verticalEcosystem: {
    headingLines: ["AN ENTIRE ECOSYSTEM", "DRAWN AROUND YOU"],
    supportingCopy:
      "Life at Vanae begins on the 6th floor. Thanks to the 5 levels of stilt parking between the residences and the ground below, every home at Vanae opens onto a view, giving them a greater sense of vibrancy, ventilation, and vitality.",
    videoUrl: "/assets/videos/hero.mp4",
    bgImage: "/assets/images/sanctuary-building.jpg",
    btnText: "The Outdoor Lifestyle",
  },
  floorPlans: {
    headingLines: ["WHERE THERE'S MORE", "TO COMING HOME."],
    paragraphs: [
      "From the high ceilings and wide corridors to the generous distances you enjoy from your neighbours, Vanae is a place where even space is allowed to breathe. Experience a greater sense of volume, openness and light to living here.",
      "Thoughtfully configured 3 & 4 BHK residences designed with expansive panoramic views, natural cross-ventilation, and generous 11-foot-high ceilings across 36 towering floors.",
    ],
    btnText: "Request Floor Plans",
    plans: [
      { src: "/assets/images/floor-plan-1.jpg", title: "Type A Luxury 3 & 4 BHK Layout" },
      { src: "/assets/images/floor-plan-2.jpg", title: "Type B Master Suite & Balcony" },
    ],
  },
  specifications: {
    tag: "TECHNICAL SPECIFICATIONS",
    heading: "BUILT TO UNCOMPROMISING STANDARDS",
    subheading: "Complete structural, architectural, electrical, and finishing specifications crafted for enduring luxury.",
    categories: [
      {
        title: "1. Structure & Walls",
        items: [
          "Structure: R.C.C. Framed Structure / R.C.C. Shear Wall Framed Structure to withstand wind and seismic loads.",
          "Walls: R.C.C. Shear Wall.",
        ],
      },
      {
        title: "2. Wall Finishes & Painting",
        items: [
          "External: Textured finish with two coats of exterior emulsion paint of reputed make.",
          "Internal: Smooth putty finish with two coats of premium acrylic emulsion paint of reputed make over a coat of primer.",
        ],
      },
      {
        title: "3. Flooring Finishes",
        items: [
          "Drawing / Living / Dining / All Bedrooms / Pooja: Premium-quality large-format vitrified tile flooring and skirting as per design.",
          "Master Bedroom: Vitrified / laminated wooden flooring as per design.",
          "Kitchen: Premium-quality large-format matte-finish vitrified tile flooring.",
          "All Bathrooms: Premium-quality large-format matte-finish vitrified tile flooring.",
          "All Balconies: Vitrified tile in wooden finish / matte-finish vitrified tile flooring.",
          "Utility: Non-slip vitrified tiles.",
          "Entrance Lounge & Lift Lobby: Granite flooring with designer false ceiling.",
          "Common Areas (Corridor): Full-body / premium-quality vitrified tile flooring.",
          "Staircases: Tandoor / Kota stone.",
        ],
      },
      {
        title: "4. Tile Cladding / Dadoing",
        items: [
          "Bathrooms: Premium-quality vitrified tile dado up to 7-foot height of reputed make.",
          "Utility: Premium-quality vitrified tile dado up to 3-foot height of reputed make.",
        ],
      },
      {
        title: "5. Doors",
        items: [
          "Main Door: Factory-made teak-veneered door frame and shutter finished with good-quality melamine polish, with hardware of reputed make.",
          "Internal Doors: Factory-made finger-joint wood frame and laminated shutter with hardware of reputed make.",
          "Toilet Doors: Factory-made finger-joint wood frame and laminated shutter with hardware of reputed make.",
        ],
      },
      {
        title: "6. French Doors & Windows",
        items: [
          "French Doors: UPVC door frame of reputed profile sections, with toughened / HS glass-panelled shutters designed as per relevant IS code and designer hardware of reputed make, with provision for mosquito mesh.",
          "Windows: UPVC window of reputed profile sections with tinted toughened / HS glass, suitable finishes as per design, provision for mosquito mesh for all sliding windows, designed as per relevant IS code.",
        ],
      },
      {
        title: "7. Railings",
        items: [
          "Balcony / Sit-Out: Laminated glass / MS railing designed as per relevant IS codes.",
          "Staircases: SS / MS railing as per design intent.",
          "Ventilation Cut-Out: MS railing as per design intent.",
        ],
      },
      {
        title: "8. Kitchen",
        items: [
          "Provision for water purifier, exhaust fan, and chimney.",
          "Water inlet and outlet provisions for sink.",
          "Provision for piped gas connection from centralized gas bank.",
        ],
      },
      {
        title: "9. Utility / Wash Area",
        items: [
          "Provision for washing machine / dishwasher and wet area for vessel washing.",
          "Non-slip vitrified tile flooring with glazed ceramic tile dadoing up to 3-foot height.",
        ],
      },
      {
        title: "10. CP & Sanitary Fixtures",
        items: [
          "All CP fittings and sanitary fixtures are of reputed make.",
          "Concealed flush tanks and wall-hung EWC in all bathrooms.",
          "Hot and cold water diverter / mixer in all bathrooms.",
        ],
      },
      {
        title: "11. Electrical Fixtures & Installations",
        items: [
          "Provision for geysers in all bathrooms.",
          "Provision for exhaust fans in all bathrooms.",
          "Provision for copper piping for air-conditioning units for all flats.",
          "Provision for power outlets for air conditioners in all bedrooms, drawing rooms, and living rooms.",
          "Plug points for TV and audio systems in living room and master bedroom.",
          "Three-phase supply for each unit with individual meter boards.",
          "Miniature circuit breakers (MCB) for each distribution board of reputed make.",
          "Concealed copper wiring and modular switches of reputed make.",
        ],
      },
      {
        title: "12. Telecommunications, Cable TV & Internet",
        items: [
          "Telephone points in drawing / living rooms and master bedroom.",
          "Intercom facility to all units connecting to security.",
          "Provision for cable connection in master bedroom and living room.",
          "One internet connection provision for all bedrooms.",
        ],
      },
      {
        title: "13. Elevators / Lifts",
        items: [
          "High-speed passenger lifts for residents and dedicated service lifts for vendors of reputed make in each tower.",
          "Equipped with ARD (Automatic Rescue Device), panic buttons, and intercom connected to the security room.",
          "Entrance lobby cladding with granite / marble.",
        ],
      },
      {
        title: "14. WTP & STP",
        items: [
          "Exclusive water-softening plant (WTP) for treated domestic water supply.",
          "Sewage Treatment Plant (STP) of adequate capacity as per statutory norms.",
          "Treated sewage water reused for landscaping and flushing.",
        ],
      },
      {
        title: "15. Generator Backup",
        items: [
          "100% DG-set backup with acoustic enclosure and AMF (Auto Main Failure) for entire development including all units and common areas.",
        ],
      },
      {
        title: "16. Fire Safety & Fire Fighting",
        items: [
          "Fire hydrant and fire sprinkler system on all floors and in basements as per NBC norms.",
          "Fire alarm and public-address system on all floors and parking areas / basements as per NBC norms.",
          "Central fire control panel located at main security cabin.",
        ],
      },
      {
        title: "17. LPG / Piped Gas",
        items: [
          "Gas supplied from a centralized gas bank to individual flats through an authorized reticulated piped gas system.",
          "Centralized prepaid-meter billing system integrated into BMS.",
        ],
      },
      {
        title: "18. Water Supply & Rainwater Harvesting",
        items: [
          "Domestic water through an exclusive water-softening plant.",
          "Water meters for each unit for domestic and drinking water.",
          "Rainwater harvesting pits at regular intervals for groundwater recharge as per environmental norms.",
        ],
      },
    ],
  },
  location: {
    tag: "LOCATION & CONNECTIVITY",
    headingLines: ["LIVE UP TO THE", "POTENTIAL"],
    copy: "Living in Kollur, by ORR Exit 2, offers connectivity unlike anywhere else in the city. Vanae places you in an evolving landscape just minutes from every destination and convenience, making it the ideal place to grow and thrive with ease.",
    siteAddress:
      "VANAE: Kollur Exit 2, Nehru Outer Ring Road, Nagulapalli, Edulnagulapally, Hyderabad, Telangana – 502300.",
    corporateAddress:
      "3rd Floor, Ravi Shankar Arcade, Plot No. 19 & 20, Gachibowli, Hyderabad, Telangana – 500032.",
    mapImage: "/assets/images/location-aerial.jpg",
    embedMapUrl:
      "https://maps.google.com/maps?q=Kollur+Exit+2+Nehru+Outer+Ring+Road+Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed",
  },
  gallery: {
    tag: "GALLERY",
    headingLines: ["A DISTINGUISHED ADDRESS", "TO CALL HOME"],
    items: [
      { src: "/assets/images/gallery-1.jpg", title: "Entrance Grand Foyer Lift", category: "Arrival" },
      { src: "/assets/images/gallery-2.jpg", title: "Entrance Lounge & Waiting", category: "Lobby" },
      { src: "/assets/images/gallery-3.jpg", title: "Reception Concierge", category: "Lobby" },
      { src: "/assets/images/gallery-4.jpg", title: "Panoramic Balcony Horizon", category: "Views" },
      { src: "/assets/images/gallery-5.jpg", title: "Private Sky Balcony", category: "Views" },
      { src: "/assets/images/gallery-6.jpg", title: "Rooftop Crown View", category: "Exterior" },
      { src: "/assets/images/gallery-7.jpg", title: "Indoor Heated Lap Pool", category: "Wellness" },
      { src: "/assets/images/gallery-8.jpg", title: "Residents Cafe & Bistro", category: "Leisure" },
      { src: "/assets/images/gallery-9.jpg", title: "Pro Squash Court", category: "Sports" },
      { src: "/assets/images/gallery-10.jpg", title: "Holistic Wellness Spa", category: "Wellness" },
      { src: "/assets/images/gallery-11.jpg", title: "Open Air Green Park", category: "Outdoor" },
      { src: "/assets/images/gallery-12.jpg", title: "Kids Wonderland Play Area", category: "Family" },
    ],
  },
  contact: {
    tag: "ENQUIRIES",
    titleLines: ["BRINGING IN THE", "EASE YOU DESIRE"],
    phonePlaceholderNote: "Official contact phone number pending confirmation from management.",
    phone: "",
    displayPhone: "Contact details upon request",
    isPhonePlaceholder: true,
    email: "sales@vanae.in",
    siteAddress:
      "VANAE: Kollur Exit 2, Nehru Outer Ring Road, Nagulapalli, Edulnagulapally, Hyderabad, Telangana – 502300.",
    corporateAddress:
      "3rd Floor, Ravi Shankar Arcade, Plot No. 19 & 20, Gachibowli, Hyderabad, Telangana – 500032.",
    reraNumberNote: "TS RERA Registration details pending formal confirmation.",
    socials: [
      { name: "Facebook", url: "https://facebook.com", short: "Fb." },
      { name: "Instagram", url: "https://instagram.com", short: "Ig." },
      { name: "LinkedIn", url: "https://linkedin.com", short: "In." },
      { name: "WhatsApp", url: "https://wa.me/?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20VANAE%20luxury%20residences.", short: "Wa." },
    ],
  },
  whatsapp: {
    phoneNumber: "",
    defaultMessage: "Hello, I would like to inquire about VANAE luxury residences.",
    url: "https://wa.me/?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20VANAE%20luxury%20residences.",
  },
  footer: {
    copyright: "© 2026 VANAE. All Rights Reserved.",
    designedBy: "Vanae Architectural Studio",
    designedByUrl: "#",
    siteAddress:
      "VANAE: Kollur Exit 2, Nehru Outer Ring Road, Nagulapalli, Edulnagulapally, Hyderabad, Telangana – 502300.",
    corporateAddress:
      "3rd Floor, Ravi Shankar Arcade, Plot No. 19 & 20, Gachibowli, Hyderabad, Telangana – 500032.",
    reraNumber: "TS RERA Registration details available upon request.",
  },
};

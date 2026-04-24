import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";
import p4 from "@/assets/property-4.jpg";
import p5 from "@/assets/property-5.jpg";
import p6 from "@/assets/property-6.jpg";

export type Property = {
  id: string;
  title: string;
  type: "Flat" | "Builder Floor" | "Villa" | "Plot" | "Shop" | "Office";
  category: "Residential" | "Commercial" | "Land";
  purpose: "Buy" | "Rent" | "Resale";
  location: string;
  city: "Gurgaon" | "Noida" | "Greater Noida" | "Delhi" | "Ghaziabad" | "Faridabad";
  price: number; // in INR
  pricePerSqft?: number;
  area: number; // sqft
  bedrooms?: number;
  bathrooms?: number;
  furnished: "Furnished" | "Semi-Furnished" | "Unfurnished" | "N/A";
  possession: "Ready to Move" | "Under Construction";
  rera: boolean;
  featured: boolean;
  zeroBrokerage: boolean;
  image: string;
  amenities: string[];
  description: string;
};

export const formatINR = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
};

const gurgaonFlatImages = [p1, p2, p5, p6];
const gurgaonFlatSectors = [
  "Sector 37D",
  "Sector 43",
  "Sector 46",
  "Sector 49",
  "Sector 50",
  "Sector 56",
  "Sector 57",
  "Sector 65",
  "Sector 67",
  "Sector 70",
  "Sector 74",
  "Sector 76",
  "Sector 79",
  "Sector 81",
  "Sector 82",
  "Sector 83",
  "Sector 84",
  "Sector 85",
  "Sector 86",
  "Sector 89",
  "Sector 90",
  "Sector 92",
  "Sector 95",
  "Sector 102",
  "Sector 106",
];
const furnishingOptions: Property["furnished"][] = ["Furnished", "Semi-Furnished", "Unfurnished"];

const generatedGurgaonRentalFlats: Property[] = [2, 3].flatMap((bedrooms) =>
  Array.from({ length: 50 }, (_, index) => {
    const sector = gurgaonFlatSectors[index % gurgaonFlatSectors.length];
    const furnished = furnishingOptions[index % furnishingOptions.length];
    const image = gurgaonFlatImages[(index + bedrooms) % gurgaonFlatImages.length];
    const rentBase = bedrooms === 2 ? 22000 : 36000;
    const rent =
      rentBase + ((index * (bedrooms === 2 ? 2200 : 3200)) % (bedrooms === 2 ? 28000 : 42000));
    const area = bedrooms === 2 ? 950 + (index % 6) * 55 : 1350 + (index % 6) * 70;
    const furnishingLabel = furnished === "Furnished" ? "Fully Furnished" : furnished;

    return {
      id: `g1r-gurgaon-${bedrooms}bhk-flat-${String(index + 1).padStart(3, "0")}`,
      title: `${bedrooms} BHK ${furnishingLabel} Flat for Rent in ${sector}, Gurgaon`,
      type: "Flat",
      category: "Residential",
      purpose: "Rent",
      location: sector,
      city: "Gurgaon",
      price: rent,
      pricePerSqft: 0,
      area,
      bedrooms,
      bathrooms: bedrooms,
      furnished,
      possession: "Ready to Move",
      rera: true,
      featured: bedrooms === 2 ? index < 6 : index < 4,
      zeroBrokerage: index % 3 !== 0,
      image,
      amenities: [
        "Gated Community",
        "24x7 Security",
        "Power Backup",
        "Lift",
        "Covered Parking",
        "Kids Play Area",
      ],
      description: `${bedrooms} BHK ${furnishingLabel.toLowerCase()} rental flat in ${sector}, Gurgaon with monthly rent of ${formatINR(rent)}. Includes practical layout, society security, lift, power backup and quick possession for families and working professionals.`,
    };
  }),
);

const generatedGurgaonUnder20kFlats: Property[] = Array.from({ length: 50 }, (_, index) => {
  const bedrooms = index % 2 === 0 ? 1 : 2;
  const sector = gurgaonFlatSectors[index % gurgaonFlatSectors.length];
  const furnished = furnishingOptions[(index + 1) % furnishingOptions.length];
  const image = gurgaonFlatImages[(index + 1) % gurgaonFlatImages.length];
  const rent = 12000 + ((index * 900) % 7800);
  const area = bedrooms === 1 ? 520 + (index % 5) * 35 : 720 + (index % 5) * 45;
  const furnishingLabel = furnished === "Furnished" ? "Fully Furnished" : furnished;

  return {
    id: `g1r-gurgaon-under20k-flat-${String(index + 1).padStart(3, "0")}`,
    title: `${bedrooms} BHK ${furnishingLabel} Budget Flat for Rent in ${sector}, Gurgaon`,
    type: "Flat",
    category: "Residential",
    purpose: "Rent",
    location: sector,
    city: "Gurgaon",
    price: rent,
    pricePerSqft: 0,
    area,
    bedrooms,
    bathrooms: bedrooms,
    furnished,
    possession: "Ready to Move",
    rera: true,
    featured: index < 5,
    zeroBrokerage: index % 2 === 0,
    image,
    amenities: [
      "24x7 Security",
      "Power Backup",
      "Lift",
      "Parking",
      "Water Supply",
      "Nearby Market",
    ],
    description: `${bedrooms} BHK ${furnishingLabel.toLowerCase()} budget rental flat in ${sector}, Gurgaon with monthly rent of ${formatINR(rent)}. Good option for tenants looking for verified flats under ₹20K with quick possession.`,
  };
});

const generatedGurgaonRawBuyFlats: Property[] = Array.from({ length: 50 }, (_, index) => {
  const bedrooms = index % 2 === 0 ? 2 : 3;
  const sector = gurgaonFlatSectors[index % gurgaonFlatSectors.length];
  const image = gurgaonFlatImages[(index + 2) % gurgaonFlatImages.length];
  const priceBase = bedrooms === 2 ? 5200000 : 7800000;
  const price = priceBase + ((index * (bedrooms === 2 ? 240000 : 360000)) % 6200000);
  const area = bedrooms === 2 ? 900 + (index % 6) * 55 : 1250 + (index % 6) * 75;

  return {
    id: `g1r-gurgaon-buy-raw-flat-${String(index + 1).padStart(3, "0")}`,
    title: `${bedrooms} BHK Raw Flat for Sale in ${sector}, Gurgaon`,
    type: "Flat",
    category: "Residential",
    purpose: "Buy",
    location: sector,
    city: "Gurgaon",
    price,
    pricePerSqft: Math.round(price / area),
    area,
    bedrooms,
    bathrooms: bedrooms,
    furnished: "Unfurnished",
    possession: index % 4 === 0 ? "Under Construction" : "Ready to Move",
    rera: true,
    featured: index < 6,
    zeroBrokerage: index % 3 !== 0,
    image,
    amenities: [
      "Gated Community",
      "24x7 Security",
      "Power Backup",
      "Lift",
      "Covered Parking",
      "Club House",
    ],
    description: `${bedrooms} BHK raw unfurnished flat for sale in ${sector}, Gurgaon priced at ${formatINR(price)}. Suitable for buyers who want to customize interiors after possession, with verified society amenities and clear documentation support.`,
  };
});

const generatedGurgaonBuyVillas: Property[] = Array.from({ length: 30 }, (_, index) => {
  const bedrooms = index % 2 === 0 ? 4 : 5;
  const sector = gurgaonFlatSectors[(index + 4) % gurgaonFlatSectors.length];
  const image = gurgaonFlatImages[(index + 3) % gurgaonFlatImages.length];
  const furnished = furnishingOptions[index % furnishingOptions.length];
  const furnishingLabel = furnished === "Furnished" ? "Fully Furnished" : furnished;
  const priceBase = bedrooms === 4 ? 28500000 : 42000000;
  const price = priceBase + ((index * 1250000) % 32000000);
  const area = bedrooms === 4 ? 2400 + (index % 5) * 180 : 3200 + (index % 5) * 220;

  return {
    id: `g1r-gurgaon-buy-villa-${String(index + 1).padStart(3, "0")}`,
    title: `${bedrooms} BHK ${furnishingLabel} Villa for Sale in ${sector}, Gurgaon`,
    type: "Villa",
    category: "Residential",
    purpose: "Buy",
    location: sector,
    city: "Gurgaon",
    price,
    pricePerSqft: Math.round(price / area),
    area,
    bedrooms,
    bathrooms: bedrooms + 1,
    furnished,
    possession: index % 5 === 0 ? "Under Construction" : "Ready to Move",
    rera: true,
    featured: index < 6,
    zeroBrokerage: index % 4 !== 0,
    image,
    amenities: [
      "Private Garden",
      "Covered Parking",
      "Modular Kitchen",
      "Servant Quarter",
      "24x7 Security",
      "Club House",
      "Power Backup",
      "Gated Community",
    ],
    description: `${bedrooms} BHK ${furnishingLabel.toLowerCase()} villa for sale in ${sector}, Gurgaon priced at ${formatINR(price)}. Premium low-rise living with private outdoor space, covered parking, security and end-to-end documentation support.`,
  };
});

export const properties: Property[] = [
  ...generatedGurgaonBuyVillas,
  ...generatedGurgaonRawBuyFlats,
  ...generatedGurgaonUnder20kFlats,
  ...generatedGurgaonRentalFlats,
  {
    id: "g1r-001",
    title: "Spacious 2 BHK Flat in Sector 86, Gurgaon",
    type: "Flat",
    category: "Residential",
    purpose: "Buy",
    location: "Sector 86",
    city: "Gurgaon",
    price: 6500000,
    pricePerSqft: 6500,
    area: 1000,
    bedrooms: 2,
    bathrooms: 2,
    furnished: "Semi-Furnished",
    possession: "Ready to Move",
    rera: true,
    featured: true,
    zeroBrokerage: true,
    image: p1,
    amenities: [
      "Gated Community",
      "24x7 Security",
      "Power Backup",
      "Lift",
      "Club House",
      "Kids Play Area",
      "Gym",
      "Swimming Pool",
    ],
    description:
      "Beautifully designed 2 BHK flat in a premium gated community in Sector 86, Gurgaon. Excellent connectivity to Dwarka Expressway, NH-8 and IGI Airport. Move-in ready with modular kitchen, balcony with park view, and dedicated parking.",
  },
  {
    id: "g1r-002",
    title: "Premium 3 BHK in Noida Extension",
    type: "Flat",
    category: "Residential",
    purpose: "Buy",
    location: "Noida Extension",
    city: "Greater Noida",
    price: 8200000,
    pricePerSqft: 5800,
    area: 1414,
    bedrooms: 3,
    bathrooms: 3,
    furnished: "Semi-Furnished",
    possession: "Ready to Move",
    rera: true,
    featured: true,
    zeroBrokerage: false,
    image: p2,
    amenities: [
      "Club House",
      "Swimming Pool",
      "Gym",
      "Garden",
      "Jogging Track",
      "Power Backup",
      "Lift",
      "24x7 Security",
    ],
    description:
      "Spacious 3 BHK apartment in a RERA-approved township in Noida Extension. Vastu-compliant layout with cross ventilation, modular kitchen, and three balconies. Close to upcoming metro and FNG Expressway.",
  },
  {
    id: "g1r-003",
    title: "High Footfall Commercial Shop in Sector 83, Gurgaon",
    type: "Shop",
    category: "Commercial",
    purpose: "Buy",
    location: "Sector 83",
    city: "Gurgaon",
    price: 5500000,
    pricePerSqft: 18000,
    area: 305,
    furnished: "Unfurnished",
    possession: "Ready to Move",
    rera: true,
    featured: true,
    zeroBrokerage: true,
    image: p3,
    amenities: ["Front Facing", "High Footfall", "Power Backup", "Parking", "CCTV", "Fire Safety"],
    description:
      "Ground-floor commercial shop in a thriving market complex on Dwarka Expressway. Ideal for retail, F&B, salon, or showroom. Assured rental yield potential of 7–8% per annum.",
  },
  {
    id: "g1r-004",
    title: "Residential Plot in Greater Noida West",
    type: "Plot",
    category: "Land",
    purpose: "Buy",
    location: "Sector 16",
    city: "Greater Noida",
    price: 4800000,
    pricePerSqft: 4800,
    area: 1000,
    furnished: "N/A",
    possession: "Ready to Move",
    rera: true,
    featured: true,
    zeroBrokerage: false,
    image: p4,
    amenities: ["Gated Township", "Wide Roads", "Underground Cabling", "Water Connection", "Park"],
    description:
      "100 sq. yd. residential plot in a planned township with all approvals in place. Build your dream home in a peaceful, well-connected location with great appreciation potential.",
  },
  {
    id: "g1r-005",
    title: "Luxury 4 BHK Villa with Pool, DLF Phase 2",
    type: "Villa",
    category: "Residential",
    purpose: "Buy",
    location: "DLF Phase 2",
    city: "Gurgaon",
    price: 45000000,
    pricePerSqft: 18000,
    area: 2500,
    bedrooms: 4,
    bathrooms: 5,
    furnished: "Furnished",
    possession: "Ready to Move",
    rera: true,
    featured: true,
    zeroBrokerage: false,
    image: p5,
    amenities: [
      "Private Pool",
      "Home Theatre",
      "Servant Quarter",
      "Modular Kitchen",
      "Garden",
      "Italian Marble",
      "Smart Home",
      "Covered Parking",
    ],
    description:
      "Stunning fully-furnished 4 BHK villa with private pool in the heart of DLF Phase 2. Italian marble flooring, smart-home automation, modular Italian kitchen, and lush green surroundings.",
  },
  {
    id: "g1r-006",
    title: "Modern 3 BHK Builder Floor in West Delhi",
    type: "Builder Floor",
    category: "Residential",
    purpose: "Buy",
    location: "Punjabi Bagh",
    city: "Delhi",
    price: 21500000,
    pricePerSqft: 21500,
    area: 1000,
    bedrooms: 3,
    bathrooms: 3,
    furnished: "Semi-Furnished",
    possession: "Ready to Move",
    rera: false,
    featured: false,
    zeroBrokerage: true,
    image: p6,
    amenities: ["Stilt Parking", "Lift", "Modular Kitchen", "Power Backup", "Park Facing"],
    description:
      "Brand new 3 BHK builder floor in a posh West Delhi neighbourhood. Premium fittings, large balcony, park-facing with excellent ventilation. Ready to move in.",
  },
  {
    id: "g1r-007",
    title: "Fully Furnished 2 BHK on Rent, Sector 50 Noida",
    type: "Flat",
    category: "Residential",
    purpose: "Rent",
    location: "Sector 50",
    city: "Noida",
    price: 32000,
    pricePerSqft: 0,
    area: 1150,
    bedrooms: 2,
    bathrooms: 2,
    furnished: "Furnished",
    possession: "Ready to Move",
    rera: true,
    featured: true,
    zeroBrokerage: true,
    image: p2,
    amenities: [
      "Fully Furnished",
      "AC",
      "Modular Kitchen",
      "Power Backup",
      "Lift",
      "24x7 Security",
      "Gym",
      "Swimming Pool",
    ],
    description:
      "Premium fully furnished 2 BHK available for rent in Sector 50, Noida. Walking distance to metro, top schools and malls. Ideal for working professionals and small families.",
  },
  {
    id: "g1r-009",
    title: "Semi-Furnished 3 BHK on Rent, Sector 86 Gurgaon",
    type: "Flat",
    category: "Residential",
    purpose: "Rent",
    location: "Sector 86",
    city: "Gurgaon",
    price: 42000,
    pricePerSqft: 0,
    area: 1650,
    bedrooms: 3,
    bathrooms: 3,
    furnished: "Semi-Furnished",
    possession: "Ready to Move",
    rera: true,
    featured: true,
    zeroBrokerage: true,
    image: p1,
    amenities: [
      "Gated Community",
      "Modular Kitchen",
      "Power Backup",
      "Lift",
      "24x7 Security",
      "Covered Parking",
      "Kids Play Area",
    ],
    description:
      "Well maintained 3 BHK rental apartment in Sector 86, Gurgaon with modular kitchen, balconies, covered parking and society amenities. Suitable for families looking for quick possession near Dwarka Expressway.",
  },
  {
    id: "g1r-010",
    title: "Independent Builder Floor for Rent in Punjabi Bagh",
    type: "Builder Floor",
    category: "Residential",
    purpose: "Rent",
    location: "Punjabi Bagh",
    city: "Delhi",
    price: 68000,
    pricePerSqft: 0,
    area: 1800,
    bedrooms: 3,
    bathrooms: 3,
    furnished: "Semi-Furnished",
    possession: "Ready to Move",
    rera: false,
    featured: false,
    zeroBrokerage: false,
    image: p6,
    amenities: [
      "Stilt Parking",
      "Lift",
      "Modular Kitchen",
      "Park Facing",
      "Power Backup",
      "Separate Entry",
    ],
    description:
      "Premium 3 BHK builder floor available for rent in Punjabi Bagh, West Delhi. Spacious rooms, park-facing balcony, lift access and dedicated stilt parking in a quiet residential lane.",
  },
  {
    id: "g1r-011",
    title: "Affordable 2 BHK Rental in Greater Noida West",
    type: "Flat",
    category: "Residential",
    purpose: "Rent",
    location: "Noida Extension",
    city: "Greater Noida",
    price: 18000,
    pricePerSqft: 0,
    area: 1050,
    bedrooms: 2,
    bathrooms: 2,
    furnished: "Unfurnished",
    possession: "Ready to Move",
    rera: true,
    featured: false,
    zeroBrokerage: true,
    image: p4,
    amenities: [
      "Gated Township",
      "Lift",
      "24x7 Security",
      "Power Backup",
      "Park",
      "Kids Play Area",
    ],
    description:
      "Budget-friendly 2 BHK rental apartment in Greater Noida West with society security, lift and park access. A practical option for small families and working professionals.",
  },
  {
    id: "g1r-012",
    title: "Retail Shop for Rent in Sector 83 Gurgaon",
    type: "Shop",
    category: "Commercial",
    purpose: "Rent",
    location: "Sector 83",
    city: "Gurgaon",
    price: 55000,
    pricePerSqft: 0,
    area: 305,
    furnished: "Unfurnished",
    possession: "Ready to Move",
    rera: true,
    featured: true,
    zeroBrokerage: true,
    image: p3,
    amenities: ["Front Facing", "High Footfall", "Power Backup", "Parking", "CCTV", "Fire Safety"],
    description:
      "Ground-floor retail shop available for rent in a busy Sector 83 market on Dwarka Expressway. Suitable for boutique, salon, clinic, office counter, F&B pickup or showroom use.",
  },
  {
    id: "g1r-008",
    title: "Resale 3 BHK in Sector 70, Gurgaon",
    type: "Flat",
    category: "Residential",
    purpose: "Resale",
    location: "Sector 70",
    city: "Gurgaon",
    price: 11500000,
    pricePerSqft: 7200,
    area: 1600,
    bedrooms: 3,
    bathrooms: 3,
    furnished: "Semi-Furnished",
    possession: "Ready to Move",
    rera: true,
    featured: false,
    zeroBrokerage: true,
    image: p1,
    amenities: [
      "Club House",
      "Swimming Pool",
      "Gym",
      "Power Backup",
      "Lift",
      "24x7 Security",
      "Kids Play Area",
    ],
    description:
      "Well maintained resale 3 BHK in a reputed society in Sector 70, Gurgaon. Excellent connectivity to Sohna Road and Golf Course Extension. Negotiable price for genuine buyers.",
  },
];

export const featuredProperties = properties.filter((p) => p.featured);
export const getPropertyById = (id: string) => properties.find((p) => p.id === id);

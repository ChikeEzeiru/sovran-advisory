export type SovranLocation = {
  country: string;
  city: string;
  type: string;
  address?: string;
};

/**
 * Add confirmed Sovran locations here. Country names may be written naturally;
 * RegionalPresenceMap normalises common Natural Earth naming differences.
 */
export const SOVRAN_LOCATIONS: SovranLocation[] = [
  {
    country: "Nigeria",
    city: "Lagos",
    type: "Office",
    address: "7573 Church Drive, Off Billings Way, Ikeja, Lagos, 100262",
  },
  {
    country: "Rwanda",
    city: "Kigali",
    type: "Office",
    address:
      "EAR Province Headquarter Blg, Remera opp Amahoro stadium, 573, Kigali",
  },
  {
    country: "Ghana",
    city: "Accra",
    type: "Office",
    address: "1st Floor, 5 Labone Crescent, Labone, Accra, Ghana",
  },
  {
    country: "Kenya",
    city: "Nairobi",
    type: "Office",
    address: "Enterprise Rd, 18046-00500 Enterprise Rd, Nairobi",
  },
];

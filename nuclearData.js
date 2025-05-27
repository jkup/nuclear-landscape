// Nuclear Data - Chart of Nuclides
// This contains data for known isotopes up to Z=118

const NUCLEAR_DATA = {
  // Magic numbers for enhanced visualization
  magicNumbers: {
    protons: [2, 8, 20, 28, 50, 82, 114],
    neutrons: [2, 8, 20, 28, 50, 82, 126, 184],
  },

  // Decay modes and their colors
  decayModes: {
    stable: { color: "#000000", name: "Stable" },
    alpha: { color: "#ff6b6b", name: "Alpha Decay" },
    "beta-": { color: "#4ecdc4", name: "Beta Minus" },
    "beta+": { color: "#45b7d1", name: "Beta Plus" },
    ec: { color: "#96ceb4", name: "Electron Capture" },
    sf: { color: "#feca57", name: "Spontaneous Fission" },
    p: { color: "#ff9ff3", name: "Proton Emission" },
    n: { color: "#54a0ff", name: "Neutron Emission" },
    "2p": { color: "#fd79a8", name: "Double Proton" },
    "2n": { color: "#74b9ff", name: "Double Neutron" },
    unknown: { color: "#636e72", name: "Unknown" },
  },

  // Half-life categories and colors
  halfLifeCategories: {
    stable: { color: "#000000", name: "Stable", min: Infinity },
    very_long: { color: "#2d3436", name: "> 10^9 years", min: 3.15e16 },
    long: { color: "#636e72", name: "1 year - 10^9 years", min: 3.15e7 },
    medium: { color: "#74b9ff", name: "1 day - 1 year", min: 86400 },
    short: { color: "#0984e3", name: "1 hour - 1 day", min: 3600 },
    very_short: { color: "#00b894", name: "1 min - 1 hour", min: 60 },
    ultra_short: { color: "#00cec9", name: "1 sec - 1 min", min: 1 },
    instant: { color: "#fd79a8", name: "< 1 second", min: 0 },
  },

  // Sample isotope data (this would normally be much larger)
  isotopes: [
    // Hydrogen
    {
      z: 1,
      n: 0,
      mass: 1,
      symbol: "H",
      name: "Hydrogen-1",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 1,
      n: 1,
      mass: 2,
      symbol: "D",
      name: "Deuterium",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 1,
      n: 2,
      mass: 3,
      symbol: "T",
      name: "Tritium",
      stability: "beta-",
      halfLife: 3.89e8,
    },

    // Helium
    {
      z: 2,
      n: 1,
      mass: 3,
      symbol: "He",
      name: "Helium-3",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 2,
      n: 2,
      mass: 4,
      symbol: "He",
      name: "Helium-4",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 2,
      n: 3,
      mass: 5,
      symbol: "He",
      name: "Helium-5",
      stability: "n",
      halfLife: 7e-22,
    },
    {
      z: 2,
      n: 4,
      mass: 6,
      symbol: "He",
      name: "Helium-6",
      stability: "beta-",
      halfLife: 0.8,
    },
    {
      z: 2,
      n: 6,
      mass: 8,
      symbol: "He",
      name: "Helium-8",
      stability: "beta-",
      halfLife: 0.119,
    },

    // Lithium
    {
      z: 3,
      n: 3,
      mass: 6,
      symbol: "Li",
      name: "Lithium-6",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 3,
      n: 4,
      mass: 7,
      symbol: "Li",
      name: "Lithium-7",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 3,
      n: 5,
      mass: 8,
      symbol: "Li",
      name: "Lithium-8",
      stability: "beta-",
      halfLife: 0.84,
    },
    {
      z: 3,
      n: 6,
      mass: 9,
      symbol: "Li",
      name: "Lithium-9",
      stability: "beta-",
      halfLife: 0.178,
    },

    // Beryllium
    {
      z: 4,
      n: 3,
      mass: 7,
      symbol: "Be",
      name: "Beryllium-7",
      stability: "ec",
      halfLife: 4.6e6,
    },
    {
      z: 4,
      n: 5,
      mass: 9,
      symbol: "Be",
      name: "Beryllium-9",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 4,
      n: 6,
      mass: 10,
      symbol: "Be",
      name: "Beryllium-10",
      stability: "beta-",
      halfLife: 4.9e13,
    },
    {
      z: 4,
      n: 7,
      mass: 11,
      symbol: "Be",
      name: "Beryllium-11",
      stability: "beta-",
      halfLife: 13.8,
    },

    // Boron
    {
      z: 5,
      n: 5,
      mass: 10,
      symbol: "B",
      name: "Boron-10",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 5,
      n: 6,
      mass: 11,
      symbol: "B",
      name: "Boron-11",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 5,
      n: 7,
      mass: 12,
      symbol: "B",
      name: "Boron-12",
      stability: "beta-",
      halfLife: 0.02,
    },

    // Carbon
    {
      z: 6,
      n: 6,
      mass: 12,
      symbol: "C",
      name: "Carbon-12",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 6,
      n: 7,
      mass: 13,
      symbol: "C",
      name: "Carbon-13",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 6,
      n: 8,
      mass: 14,
      symbol: "C",
      name: "Carbon-14",
      stability: "beta-",
      halfLife: 1.8e11,
    },

    // Continue with more elements...
    // Nitrogen
    {
      z: 7,
      n: 7,
      mass: 14,
      symbol: "N",
      name: "Nitrogen-14",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 7,
      n: 8,
      mass: 15,
      symbol: "N",
      name: "Nitrogen-15",
      stability: "stable",
      halfLife: Infinity,
    },

    // Oxygen
    {
      z: 8,
      n: 8,
      mass: 16,
      symbol: "O",
      name: "Oxygen-16",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 8,
      n: 9,
      mass: 17,
      symbol: "O",
      name: "Oxygen-17",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 8,
      n: 10,
      mass: 18,
      symbol: "O",
      name: "Oxygen-18",
      stability: "stable",
      halfLife: Infinity,
    },

    // Magic number isotopes and some heavy elements
    {
      z: 20,
      n: 20,
      mass: 40,
      symbol: "Ca",
      name: "Calcium-40",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 26,
      n: 30,
      mass: 56,
      symbol: "Fe",
      name: "Iron-56",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 82,
      n: 126,
      mass: 208,
      symbol: "Pb",
      name: "Lead-208",
      stability: "stable",
      halfLife: Infinity,
    },

    // More stable isotopes for better patterns
    {
      z: 9,
      n: 10,
      mass: 19,
      symbol: "F",
      name: "Fluorine-19",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 10,
      n: 10,
      mass: 20,
      symbol: "Ne",
      name: "Neon-20",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 11,
      n: 12,
      mass: 23,
      symbol: "Na",
      name: "Sodium-23",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 12,
      n: 12,
      mass: 24,
      symbol: "Mg",
      name: "Magnesium-24",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 13,
      n: 14,
      mass: 27,
      symbol: "Al",
      name: "Aluminum-27",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 14,
      n: 14,
      mass: 28,
      symbol: "Si",
      name: "Silicon-28",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 15,
      n: 16,
      mass: 31,
      symbol: "P",
      name: "Phosphorus-31",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 16,
      n: 16,
      mass: 32,
      symbol: "S",
      name: "Sulfur-32",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 17,
      n: 18,
      mass: 35,
      symbol: "Cl",
      name: "Chlorine-35",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 18,
      n: 18,
      mass: 36,
      symbol: "Ar",
      name: "Argon-36",
      stability: "stable",
      halfLife: Infinity,
    },
    {
      z: 19,
      n: 20,
      mass: 39,
      symbol: "K",
      name: "Potassium-39",
      stability: "stable",
      halfLife: Infinity,
    },

    // Some radioactive heavy elements
    {
      z: 92,
      n: 146,
      mass: 238,
      symbol: "U",
      name: "Uranium-238",
      stability: "alpha",
      halfLife: 1.41e17,
    },
    {
      z: 94,
      n: 150,
      mass: 244,
      symbol: "Pu",
      name: "Plutonium-244",
      stability: "alpha",
      halfLife: 2.5e15,
    },
    {
      z: 114,
      n: 175,
      mass: 289,
      symbol: "Fl",
      name: "Flerovium-289",
      stability: "alpha",
      halfLife: 2.6,
    },
    {
      z: 118,
      n: 176,
      mass: 294,
      symbol: "Og",
      name: "Oganesson-294",
      stability: "alpha",
      halfLife: 0.7e-3,
    },
  ],
};

// Generate additional isotope data programmatically
function generateAdditionalIsotopes() {
  const additionalIsotopes = [];

  // Generate isotopes for elements Z=1 to Z=120
  for (let z = 1; z <= 120; z++) {
    // Generate neutron numbers around the valley of stability with more realistic bounds
    let minN, maxN;

    if (z <= 20) {
      // Light elements: N ≈ Z
      minN = Math.max(0, z - 5);
      maxN = z + 8;
    } else if (z <= 50) {
      // Medium elements: gradually increasing N/Z ratio
      minN = Math.max(0, Math.floor(z * 0.8));
      maxN = Math.floor(z * 1.5);
    } else if (z <= 82) {
      // Heavy elements: higher N/Z ratio
      minN = Math.floor(z * 1.0);
      maxN = Math.floor(z * 1.7);
    } else {
      // Superheavy elements: very neutron-rich for stability
      minN = Math.floor(z * 1.2);
      maxN = Math.floor(z * 2.0);
    }

    for (let n = minN; n <= maxN; n++) {
      // Skip if already exists in our data
      if (NUCLEAR_DATA.isotopes.find((iso) => iso.z === z && iso.n === n)) {
        continue;
      }

      const mass = z + n;
      const element = getElementSymbol(z);

      // Determine stability based on nuclear physics rules
      const stability = determineStability(z, n);
      const halfLife = estimateHalfLife(z, n, stability);

      additionalIsotopes.push({
        z: z,
        n: n,
        mass: mass,
        symbol: element,
        name: `${element}-${mass}`,
        stability: stability,
        halfLife: halfLife,
      });
    }
  }

  return additionalIsotopes;
}

// Simple element symbol lookup
function getElementSymbol(z) {
  const symbols = [
    "",
    "H",
    "He",
    "Li",
    "Be",
    "B",
    "C",
    "N",
    "O",
    "F",
    "Ne",
    "Na",
    "Mg",
    "Al",
    "Si",
    "P",
    "S",
    "Cl",
    "Ar",
    "K",
    "Ca",
    "Sc",
    "Ti",
    "V",
    "Cr",
    "Mn",
    "Fe",
    "Co",
    "Ni",
    "Cu",
    "Zn",
    "Ga",
    "Ge",
    "As",
    "Se",
    "Br",
    "Kr",
    "Rb",
    "Sr",
    "Y",
    "Zr",
    "Nb",
    "Mo",
    "Tc",
    "Ru",
    "Rh",
    "Pd",
    "Ag",
    "Cd",
    "In",
    "Sn",
    "Sb",
    "Te",
    "I",
    "Xe",
    "Cs",
    "Ba",
    "La",
    "Ce",
    "Pr",
    "Nd",
    "Pm",
    "Sm",
    "Eu",
    "Gd",
    "Tb",
    "Dy",
    "Ho",
    "Er",
    "Tm",
    "Yb",
    "Lu",
    "Hf",
    "Ta",
    "W",
    "Re",
    "Os",
    "Ir",
    "Pt",
    "Au",
    "Hg",
    "Tl",
    "Pb",
    "Bi",
    "Po",
    "At",
    "Rn",
    "Fr",
    "Ra",
    "Ac",
    "Th",
    "Pa",
    "U",
    "Np",
    "Pu",
    "Am",
    "Cm",
    "Bk",
    "Cf",
    "Es",
    "Fm",
    "Md",
    "No",
    "Lr",
    "Rf",
    "Db",
    "Sg",
    "Bh",
    "Hs",
    "Mt",
    "Ds",
    "Rg",
    "Cn",
    "Nh",
    "Fl",
    "Mc",
    "Lv",
    "Ts",
    "Og",
    "Uue",
    "Ubn",
  ];
  return symbols[z] || `E${z}`;
}

// Improved stability determination based on nuclear physics
function determineStability(z, n) {
  const mass = z + n;

  // Known stable isotopes (more comprehensive)
  if (isStableIsotope(z, n)) {
    return "stable";
  }

  // Very light elements (Z <= 10)
  if (z <= 10) {
    if (n < z - 2) return "beta+";
    if (n > z + 4) return "beta-";
    if (n > z + 1) return "beta-";
    return "beta+";
  }

  // Light to medium elements (10 < Z <= 20)
  if (z <= 20) {
    if (n < z - 2) return "beta+";
    if (n > z + 6) return "beta-";
    if (n > z + 2) return "beta-";
    return "beta+";
  }

  // Medium elements (20 < Z <= 50)
  if (z <= 50) {
    if (n < z * 0.9) return "beta+";
    if (n > z * 1.4) return "beta-";
    if (n > z * 1.2) return "beta-";
    return "beta+";
  }

  // Heavy elements (50 < Z <= 82)
  if (z <= 82) {
    if (n < z * 1.0) return "beta+";
    if (n > z * 1.6) return "beta-";
    if (n > z * 1.3) return "beta-";
    return "beta+";
  }

  // Very heavy elements (Z > 82) - mostly alpha decay
  return "alpha";
}

// Helper function to identify known stable isotopes
function isStableIsotope(z, n) {
  // More comprehensive list of stable isotope conditions
  const stableConditions = [
    // Light elements with N ≈ Z
    z <= 20 && Math.abs(n - z) <= 1,
    // Specific stable heavy isotopes
    z === 26 && n === 30, // Fe-56
    z === 28 && n === 30, // Ni-58
    z === 50 && n === 68, // Sn-118
    z === 82 && n >= 122 && n <= 126, // Pb isotopes
    // Magic number combinations
    NUCLEAR_DATA.magicNumbers.protons.includes(z) &&
      NUCLEAR_DATA.magicNumbers.neutrons.includes(n),
  ];

  return stableConditions.some((condition) => condition);
}

// Estimate half-life (very simplified)
function estimateHalfLife(z, n, stability) {
  if (stability === "stable") return Infinity;

  const mass = z + n;

  // Very heavy elements are very short-lived
  if (z > 110) return Math.random() * 10;

  // Heavy elements
  if (z > 82) return 1e6 + Math.random() * 1e12;

  // Light unstable isotopes
  if (z <= 10) return Math.random() * 1000;

  // Medium elements
  return Math.random() * 1e15;
}

// Initialize complete isotope data
NUCLEAR_DATA.allIsotopes = NUCLEAR_DATA.isotopes.concat(
  generateAdditionalIsotopes()
);

// Export for use in main script
if (typeof module !== "undefined" && module.exports) {
  module.exports = NUCLEAR_DATA;
}

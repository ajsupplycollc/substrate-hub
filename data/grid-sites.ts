export interface GridSite {
  id: string;
  name: string;
  lat: number;
  lng: number;
  region: string;
  type: "hub" | "primary-node" | "secondary";
  tribe?: { name: string; meaning: string; role: string };
  properties: string[];
  description: string;
  substrateTags: string[];
  caseIds?: string[];
}

export interface GridConnection {
  from: string;
  to: string;
  type: "great-circle" | "geodetic" | "geological" | "nile-corridor";
  label?: string;
}

export const gridSites: GridSite[] = [
  // ============================================================
  // THE 12 PRIMARY NODES — mapped to the 12 Tribes of Israel
  // ============================================================

  {
    id: "giza",
    name: "Great Pyramid Complex, Giza",
    lat: 29.9792,
    lng: 31.1342,
    region: "Africa",
    type: "hub",
    tribe: { name: "Judah", meaning: "Praise / The Lion", role: "The king tribe. Central authority, the hub from which all other nodes are governed. The lion guards the gate — the Sphinx." },
    properties: ["piezoelectric limestone", "quartz-bearing granite", "underground chambers", "acoustic resonance", "water table access", "precise astronomical alignment", "Orion correlation"],
    description: "Central hub of the planetary grid. Three main pyramids aligned to Orion's Belt, the Great Sphinx (and potentially a second), underground shafts extending ~2km. Piezoelectric limestone and granite interior chambers create electromagnetic conversion. Sits over the Nile aquifer system.",
    substrateTags: ["archaeoacoustics", "piezoelectric-geology", "ancient-technology", "orion-correlation"],
    caseIds: ["giza-precision", "sphinx-erosion"],
  },
  {
    id: "baalbek",
    name: "Baalbek",
    lat: 34.0069,
    lng: 36.2039,
    region: "Middle East",
    type: "primary-node",
    tribe: { name: "Reuben", meaning: "Behold, a Son / Firstborn Strength", role: "The firstborn. Raw power and foundation. Baalbek holds the largest cut stones on Earth — the physical strength of the grid." },
    properties: ["1,650-ton trilithon stones", "precision-cut megaliths", "underground tunnels", "seismic zone"],
    description: "Largest cut stones on Earth — the Trilithon stones weigh up to 1,650 tons each. The Stone of the Pregnant Woman weighs ~1,000 tons. No modern crane can move these. Built on a seismic zone with documented underground tunnel systems.",
    substrateTags: ["ancient-technology", "precision-engineering", "megalithic"],
  },
  {
    id: "gobekli-tepe",
    name: "Gobekli Tepe",
    lat: 37.2231,
    lng: 38.9225,
    region: "Anatolia",
    type: "primary-node",
    tribe: { name: "Dan", meaning: "Judge / The Hidden One", role: "Dan judged in secret. Gobekli Tepe was deliberately buried 10,000 years ago — hidden, preserved, waiting to be judged by future generations." },
    properties: ["oldest megalithic site", "12,000+ years old", "T-shaped pillars", "acoustic properties", "deliberately buried"],
    description: "Oldest known megalithic site, predating agriculture by millennia. T-shaped limestone pillars up to 6m tall arranged in circles with acoustic properties. Deliberately buried ~10,000 years ago — preservation or concealment of knowledge?",
    substrateTags: ["archaeoacoustics", "ancient-technology", "pre-diluvian"],
  },
  {
    id: "malta-hypogeum",
    name: "Hal Saflieni Hypogeum, Malta",
    lat: 35.8692,
    lng: 14.5083,
    region: "Mediterranean",
    type: "primary-node",
    tribe: { name: "Levi", meaning: "Joined / The Priest", role: "The priestly tribe — no land inheritance, pure spiritual function. The Hypogeum's 110Hz Oracle Room is the grid's temple, tuned for direct consciousness access." },
    properties: ["110Hz resonance", "underground chambers", "Oracle Room", "altered consciousness", "5,000+ years old"],
    description: "Underground temple complex with the Oracle Room that resonates at exactly 110Hz — the frequency UCLA studies showed alters prefrontal cortex activity and shifts brain function. One of the clearest examples of intentional acoustic engineering for consciousness alteration.",
    substrateTags: ["archaeoacoustics", "consciousness-technology", "110hz"],
    caseIds: ["malta-hypogeum"],
  },
  {
    id: "stonehenge",
    name: "Stonehenge",
    lat: 51.1789,
    lng: -1.8262,
    region: "Europe",
    type: "primary-node",
    tribe: { name: "Zebulun", meaning: "Dwelling / Harbor", role: "Zebulun dwelt by the sea and controlled harbors. Stonehenge sits at the Atlantic gateway — the harbor node connecting Europe to the Americas across the ocean." },
    properties: ["bluestones from Wales", "acoustic properties", "solstice alignment", "electromagnetic anomaly", "ley line intersection"],
    description: "Bluestones transported 150 miles from Wales — possibly selected for their specific acoustic properties (they ring when struck). Positioned at the intersection of multiple ley lines. Measurable electromagnetic anomalies at the site.",
    substrateTags: ["archaeoacoustics", "piezoelectric-geology", "astronomical-alignment"],
  },
  {
    id: "angkor-wat",
    name: "Angkor Wat Complex",
    lat: 13.4125,
    lng: 103.8670,
    region: "Southeast Asia",
    type: "primary-node",
    tribe: { name: "Naphtali", meaning: "My Wrestling / Flowing Water", role: "Jacob described Naphtali as a deer let loose with beautiful words. Angkor Wat's water system flows freely — the grid's water-resonance node, 72° from Giza." },
    properties: ["water-based resonance", "72° longitude from Giza", "astronomical alignment", "largest religious complex"],
    description: "Largest religious complex on Earth. The extensive water/moat system may function as acoustic waveguides. Precise astronomical alignments to equinoxes and solstices. Its geodetic position is exactly 72 degrees of longitude from Giza — 72 is the precession number (1° per 72 years).",
    substrateTags: ["archaeoacoustics", "astronomical-alignment", "water-resonance"],
  },
  {
    id: "teotihuacan",
    name: "Teotihuacan",
    lat: 19.6925,
    lng: -98.8438,
    region: "Central America",
    type: "primary-node",
    tribe: { name: "Issachar", meaning: "Reward / He Who Knows the Times", role: "Issachar understood times and seasons — the science tribe. Teotihuacan has mica insulation, mercury deposits, cave acoustics. Pure technology." },
    properties: ["mica sheets", "cave system beneath", "acoustic corridors", "mercury deposits", "Avenue of the Dead"],
    description: "Pyramid of the Sun built directly over a cave system with acoustic properties. Mica sheets (an electrical insulator) embedded in the pyramid's upper layers — no decorative purpose, purely functional. Mercury deposits found beneath the Temple of the Feathered Serpent. The Avenue of the Dead functions as an acoustic waveguide.",
    substrateTags: ["archaeoacoustics", "ancient-technology", "consciousness-technology"],
  },
  {
    id: "tiwanaku",
    name: "Tiwanaku & Puma Punku",
    lat: -16.5561,
    lng: -68.6725,
    region: "South America",
    type: "primary-node",
    tribe: { name: "Asher", meaning: "Blessed / Abundance", role: "Asher was blessed with abundance and rich food. Tiwanaku sits on the Altiplano at 3,800m — the high, abundant node. Precision engineering from the hardest stone on Earth." },
    properties: ["precision H-blocks", "diorite construction", "3,800m altitude", "astronomical alignment", "interlocking stones"],
    description: "Puma Punku's H-blocks are precision-machined from diorite (one of the hardest stones on Earth) with interlocking joints and uniform dimensions. At 3,800m altitude on the Altiplano. The precision and material hardness suggest technology beyond known ancient capabilities.",
    substrateTags: ["ancient-technology", "precision-engineering"],
  },
  {
    id: "easter-island",
    name: "Rapa Nui (Easter Island)",
    lat: -27.1127,
    lng: -109.3497,
    region: "Pacific",
    type: "primary-node",
    tribe: { name: "Benjamin", meaning: "Son of the Right Hand / Wolf", role: "Benjamin was the wolf — fierce, remote, guarding the far frontier. Easter Island is the most isolated inhabited place on Earth. The edge node of the grid." },
    properties: ["moai statues", "volcanic rock", "acoustic properties", "most remote inhabited island"],
    description: "Moai carved from volcanic tuff with documented acoustic properties. The most isolated inhabited island on Earth — a remote Pacific geodetic point. Oral traditions describe the statues 'walking' via sound/vibration — possibly acoustic levitation at smaller scale.",
    substrateTags: ["archaeoacoustics", "ancient-technology"],
  },
  {
    id: "kailasa",
    name: "Kailasa Temple, Ellora",
    lat: 20.0258,
    lng: 75.1780,
    region: "South Asia",
    type: "primary-node",
    tribe: { name: "Simeon", meaning: "Heard / One Who Listens", role: "Simeon was 'heard' by God. Kailasa was carved top-down from living rock — 400,000 tons removed by listening to the stone. The grid's sculpted node." },
    properties: ["carved top-down from single rock", "400,000 tons removed", "basalt", "acoustic chambers"],
    description: "Carved top-down from a single basalt cliff face. An estimated 400,000 tons of rock were removed. The engineering approach (top-down carving) and precision suggest technology beyond conventional explanations. Internal chambers have acoustic properties.",
    substrateTags: ["ancient-technology", "precision-engineering"],
    caseIds: ["kailasa-temple"],
  },
  {
    id: "uluru",
    name: "Uluru (Ayers Rock)",
    lat: -25.3444,
    lng: 131.0369,
    region: "Oceania",
    type: "primary-node",
    tribe: { name: "Gad", meaning: "Fortune / Troop", role: "Gad was the earth-warrior tribe, grounded and territorial. Uluru is the Earth's exposed heart — arkose sandstone extending 5+ km underground. The deepest ground node." },
    properties: ["monolith extends 5+ km underground", "arkose sandstone", "iron oxide surface", "acoustic resonance", "Aboriginal Dreamtime portal", "electromagnetic anomalies"],
    description: "The world's largest monolith, but what's visible is only the tip — Uluru extends over 5km underground. Arkose sandstone with high iron oxide content (it rusts red). Aboriginal Tjukurpa (Dreamtime) traditions describe it as a consciousness portal and Earth energy center. Documented electromagnetic anomalies at the site. The only primary node in the southern hemisphere's largest landmass.",
    substrateTags: ["consciousness-technology", "geological-anomaly", "indigenous-knowledge"],
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    lat: -13.1631,
    lng: -72.5450,
    region: "South America",
    type: "primary-node",
    tribe: { name: "Joseph (Ephraim)", meaning: "Fruitful Vine / Double Portion", role: "Joseph received the double portion — two tribes (Ephraim and Manasseh). Machu Picchu sits between two peaks, served by two rivers, built from granite with high quartz content. The doubled node." },
    properties: ["granite with high quartz content", "water channel system", "Intihuatana stone", "astronomical alignment", "between two peaks", "seismic-resistant construction"],
    description: "Built from granite with high quartz content (piezoelectric). The Intihuatana stone ('hitching post of the sun') served as a precise astronomical instrument. Sophisticated water channel system. Located between two mountain peaks at 2,430m. Polished granite surfaces and seismic-resistant dry-stone construction suggest acoustic engineering.",
    substrateTags: ["piezoelectric-geology", "astronomical-alignment", "water-resonance", "ancient-technology"],
  },

  // ============================================================
  // SECONDARY NODES — satellites of the 12 primary nodes
  // ============================================================

  // Giza satellites (Nile Corridor)
  {
    id: "saqqara",
    name: "Saqqara & Serapeum",
    lat: 29.8713,
    lng: 31.2165,
    region: "Africa",
    type: "secondary",
    properties: ["precision-machined granite boxes", "underground tunnels", "acoustic chambers", "Step Pyramid"],
    description: "Serapeum contains 24 precision-machined granite boxes (100+ tons each) with tolerances within thousandths of an inch. Step Pyramid of Djoser is the oldest large-scale cut stone construction. Satellite of the Giza hub.",
    substrateTags: ["ancient-technology", "precision-engineering", "acoustic-chambers"],
  },
  {
    id: "dahshur",
    name: "Dahshur Pyramids",
    lat: 29.7908,
    lng: 31.2064,
    region: "Africa",
    type: "secondary",
    properties: ["Bent Pyramid", "Red Pyramid", "acoustic resonance", "limestone"],
    description: "Bent Pyramid shows mid-construction angle change suggesting dynamic engineering. Red Pyramid's internal chambers produce measurable acoustic resonance. Nile corridor satellite of Giza.",
    substrateTags: ["archaeoacoustics", "ancient-technology"],
  },
  {
    id: "abusir",
    name: "Abusir",
    lat: 29.8942,
    lng: 31.2017,
    region: "Africa",
    type: "secondary",
    properties: ["sun temples", "astronomical alignment", "papyrus archives"],
    description: "Sun temples with precise solar alignments. Nile corridor satellite of Giza.",
    substrateTags: ["astronomical-alignment"],
  },
  {
    id: "abu-rawash",
    name: "Abu Rawash",
    lat: 30.0322,
    lng: 31.0753,
    region: "Africa",
    type: "secondary",
    properties: ["highest elevation pyramid", "granite-lined", "astronomical sightlines"],
    description: "Northernmost Giza-area pyramid at the highest elevation. Nile corridor satellite of Giza.",
    substrateTags: ["ancient-technology", "astronomical-alignment"],
  },

  // Mediterranean/European secondaries
  {
    id: "delphi",
    name: "Oracle at Delphi",
    lat: 38.4824,
    lng: 22.5010,
    region: "Mediterranean",
    type: "secondary",
    properties: ["geological fault line", "ethylene emissions", "trance states", "omphalos stone"],
    description: "Built directly over intersecting geological fault lines emitting ethylene gas. The Pythia entered trance states at this specific location. Satellite of the Malta Hypogeum consciousness node.",
    substrateTags: ["consciousness-technology", "geological-anomaly"],
  },
  {
    id: "newgrange",
    name: "Newgrange",
    lat: 53.6947,
    lng: -6.4755,
    region: "Europe",
    type: "secondary",
    properties: ["solstice alignment", "acoustic chamber", "quartz facade", "5,200 years old"],
    description: "Passage tomb older than the pyramids. Inner chamber resonates at specific frequencies. Original white quartz facade suggests piezoelectric properties. European satellite of Stonehenge.",
    substrateTags: ["archaeoacoustics", "piezoelectric-geology", "astronomical-alignment"],
  },
  {
    id: "carnac",
    name: "Carnac Stones",
    lat: 47.5950,
    lng: -3.0750,
    region: "Europe",
    type: "secondary",
    properties: ["3,000+ standing stones", "piezoelectric quartz", "geometric alignment", "earthquake sensitivity"],
    description: "Over 3,000 standing stones in precise geometric rows stretching 4km. Quartz-bearing granite with documented electromagnetic emissions. European satellite of Stonehenge.",
    substrateTags: ["piezoelectric-geology", "ancient-technology", "electromagnetic"],
    caseIds: ["carnac-piezoelectric"],
  },

  // Middle East secondaries
  {
    id: "derinkuyu",
    name: "Derinkuyu Underground City",
    lat: 38.3747,
    lng: 34.7347,
    region: "Anatolia",
    type: "secondary",
    properties: ["18 levels deep", "volcanic tuff", "ventilation engineering", "capacity 20,000+"],
    description: "Underground city extending 18 levels deep, capacity 20,000+. Anatolian satellite of Gobekli Tepe.",
    substrateTags: ["ancient-technology", "underground-infrastructure"],
    caseIds: ["derinkuyu"],
  },

  // Americas secondaries
  {
    id: "chavin",
    name: "Chavin de Huantar",
    lat: -9.5947,
    lng: -77.1775,
    region: "South America",
    type: "secondary",
    properties: ["acoustic manipulation confirmed", "water channels for sound", "Lanzon monolith", "psychoacoustic design"],
    description: "Stanford archaeoacoustics team confirmed psychoacoustic engineering. Water channels created specific frequencies. Andean satellite bridging Machu Picchu and Tiwanaku.",
    substrateTags: ["archaeoacoustics", "consciousness-technology"],
    caseIds: ["chavin-acoustics"],
  },
  {
    id: "nazca",
    name: "Nazca Lines",
    lat: -14.7350,
    lng: -75.1300,
    region: "South America",
    type: "secondary",
    properties: ["geoglyphs visible from altitude", "underground water mapping", "piezoelectric desert floor"],
    description: "Massive geoglyphs mapped to underground aquifer systems. South American secondary connecting the Andean nodes.",
    substrateTags: ["ancient-technology", "geological-anomaly"],
  },
  {
    id: "cahokia",
    name: "Cahokia Mounds",
    lat: 38.6556,
    lng: -90.0625,
    region: "North America",
    type: "secondary",
    properties: ["largest pre-Columbian structure (N. America)", "Woodhenge astronomical circle", "river confluence"],
    description: "Largest pre-Columbian earthwork in North America at the confluence of three major rivers. North American satellite of Teotihuacan.",
    substrateTags: ["astronomical-alignment", "ancient-technology"],
  },

  // Asia secondaries
  {
    id: "borobudur",
    name: "Borobudur",
    lat: -7.6079,
    lng: 110.2038,
    region: "Southeast Asia",
    type: "secondary",
    properties: ["72 perforated stupas", "volcanic stone", "mandala geometry", "Helmholtz resonators"],
    description: "72 perforated stupas (precession number). Bell-shaped stupas may function as Helmholtz resonators. Mandala geometry mirrors cymatics. Southeast Asian satellite of Angkor Wat.",
    substrateTags: ["archaeoacoustics", "sacred-geometry", "consciousness-technology"],
  },
  {
    id: "xian-pyramids",
    name: "Xi'an Pyramid Field",
    lat: 34.3380,
    lng: 108.5694,
    region: "East Asia",
    type: "secondary",
    properties: ["40+ pyramids", "restricted access", "astronomical alignment", "loess soil with quartz"],
    description: "Over 40 pyramidal mounds in Shaanxi province. Chinese government restricted access for decades. East Asian satellite node.",
    substrateTags: ["ancient-technology", "suppression", "astronomical-alignment"],
  },
  {
    id: "longyou",
    name: "Longyou Caves",
    lat: 29.0389,
    lng: 119.1719,
    region: "East Asia",
    type: "secondary",
    properties: ["precision-carved caverns", "uniform chisel marks", "1,000,000 m³ removed", "unknown builders"],
    description: "36 massive underground caverns with no historical record of construction. East Asian satellite node.",
    substrateTags: ["ancient-technology", "underground-infrastructure"],
    caseIds: ["longyou-caves"],
  },
];

export const gridConnections: GridConnection[] = [
  // Great Circle alignment (the primary ring)
  { from: "giza", to: "angkor-wat", type: "great-circle", label: "72° longitude (precession)" },
  { from: "angkor-wat", to: "easter-island", type: "great-circle" },
  { from: "easter-island", to: "nazca", type: "great-circle" },
  { from: "nazca", to: "giza", type: "great-circle" },
  { from: "giza", to: "teotihuacan", type: "great-circle" },
  { from: "teotihuacan", to: "angkor-wat", type: "great-circle" },

  // Nile Corridor (hub satellites)
  { from: "giza", to: "saqqara", type: "nile-corridor" },
  { from: "saqqara", to: "dahshur", type: "nile-corridor" },
  { from: "giza", to: "abu-rawash", type: "nile-corridor" },
  { from: "saqqara", to: "abusir", type: "nile-corridor" },

  // Hub → Primary Node connections (Giza radiating out)
  { from: "giza", to: "baalbek", type: "geodetic" },
  { from: "giza", to: "gobekli-tepe", type: "geodetic" },
  { from: "giza", to: "malta-hypogeum", type: "geodetic", label: "Mediterranean acoustic corridor" },
  { from: "giza", to: "stonehenge", type: "geodetic" },
  { from: "giza", to: "kailasa", type: "geodetic" },
  { from: "giza", to: "uluru", type: "geodetic", label: "Africa-Oceania axis" },

  // Primary ↔ Primary connections
  { from: "baalbek", to: "gobekli-tepe", type: "geodetic" },
  { from: "malta-hypogeum", to: "stonehenge", type: "geodetic", label: "Mediterranean-Atlantic corridor" },
  { from: "kailasa", to: "angkor-wat", type: "geodetic", label: "Indian Ocean corridor" },
  { from: "angkor-wat", to: "uluru", type: "geodetic", label: "Oceania-Asia link" },
  { from: "tiwanaku", to: "machu-picchu", type: "geological", label: "Andean twin nodes" },
  { from: "tiwanaku", to: "easter-island", type: "geodetic", label: "Pacific-Andean link" },
  { from: "machu-picchu", to: "teotihuacan", type: "geodetic", label: "Americas spine" },
  { from: "easter-island", to: "uluru", type: "great-circle", label: "Pacific-Oceania arc" },
  { from: "stonehenge", to: "teotihuacan", type: "great-circle", label: "Atlantic crossing" },
  { from: "baalbek", to: "kailasa", type: "geodetic", label: "Silk Road axis" },
  { from: "gobekli-tepe", to: "stonehenge", type: "geodetic" },

  // Primary → Secondary connections
  { from: "malta-hypogeum", to: "delphi", type: "geological", label: "110Hz resonance sites" },
  { from: "stonehenge", to: "carnac", type: "geological" },
  { from: "stonehenge", to: "newgrange", type: "geological", label: "Atlantic megalithic corridor" },
  { from: "gobekli-tepe", to: "derinkuyu", type: "geological" },
  { from: "machu-picchu", to: "chavin", type: "geological", label: "Andean acoustic corridor" },
  { from: "tiwanaku", to: "nazca", type: "geological" },
  { from: "machu-picchu", to: "nazca", type: "geological" },
  { from: "teotihuacan", to: "cahokia", type: "geological", label: "Mississippi-Mexico corridor" },
  { from: "angkor-wat", to: "borobudur", type: "geodetic" },
  { from: "angkor-wat", to: "xian-pyramids", type: "geodetic" },
  { from: "xian-pyramids", to: "longyou", type: "geological", label: "Chinese underground corridor" },
  { from: "delphi", to: "baalbek", type: "geological" },
  { from: "carnac", to: "newgrange", type: "geological" },
  { from: "chavin", to: "tiwanaku", type: "geological" },
];

export const SITE_TYPE_META: Record<GridSite["type"], { label: string; color: string; radius: number }> = {
  hub: { label: "Central Hub (Judah)", color: "#f59e0b", radius: 12 },
  "primary-node": { label: "Primary Node (Tribe)", color: "#34d399", radius: 9 },
  secondary: { label: "Secondary / Satellite", color: "#a78bfa", radius: 5 },
};

export const CONNECTION_TYPE_META: Record<GridConnection["type"], { label: string; color: string; dash?: string }> = {
  "great-circle": { label: "Great Circle Alignment", color: "#f59e0b", dash: "10, 5" },
  geodetic: { label: "Geodetic Alignment", color: "#34d399", dash: "6, 4" },
  geological: { label: "Geological Connection", color: "#60a5fa", dash: "4, 4" },
  "nile-corridor": { label: "Nile Corridor", color: "#fb923c" },
};

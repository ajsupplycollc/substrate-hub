export type Category =
  | "government"
  | "military"
  | "whistleblower"
  | "scientific"
  | "historical"
  | "geological"
  | "nuclear"
  | "crash_retrieval"
  | "testimony"
  | "legislation"
  | "international"
  | "religious"
  | "suppression"
  | "consciousness";

export type EvidenceType =
  | "video"
  | "photo"
  | "document"
  | "radar"
  | "sensor"
  | "testimony"
  | "physical";

export type CredibilityTier =
  | "confirmed"      // officially acknowledged by government
  | "high"           // multiple independent sources, sensor data
  | "moderate"       // credible single source, some corroboration
  | "unverified"     // single source, no corroboration yet
  | "disputed";      // actively contested

export interface KeyFigure {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  credentials: string[];
  photo: string;
  categories: Category[];
  links: {
    youtube?: string;
    x?: string;
    website?: string;
    wikipedia?: string;
    substack?: string;
  };
  keyClaimsIds?: string[];
  caseIds?: string[];
  documentaryIds?: string[];
}

export interface Case {
  id: string;
  name: string;
  slug: string;
  date: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  summary: string;
  categories: Category[];
  evidenceTypes: EvidenceType[];
  credibility: CredibilityTier;
  keyFigureIds: string[];
  evidenceIds: string[];
  relatedCaseIds?: string[];
  tags: string[];
}

export interface Evidence {
  id: string;
  title: string;
  type: EvidenceType;
  url: string;
  embedUrl?: string;
  imageUrl?: string;
  images?: string[];
  platform?: "youtube" | "cspan" | "archive" | "external";
  source: string;
  date?: string;
  description: string;
  caseIds: string[];
  keyFigureIds: string[];
  credibility: CredibilityTier;
  tags: string[];
}

export interface Document {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  classification?: string;
  summary: string;
  categories: Category[];
  tags: string[];
}

export interface Timeline {
  id: string;
  date: string;
  title: string;
  summary: string;
  caseId?: string;
  keyFigureId?: string;
  documentId?: string;
  evidenceId?: string;
  categories: Category[];
}

export interface CrossReference {
  fromType: "case" | "figure" | "evidence" | "document";
  fromId: string;
  toType: "case" | "figure" | "evidence" | "document";
  toId: string;
  relationship: string;
}

export const CATEGORY_META: Record<Category, { label: string; color: string }> = {
  government: { label: "Government & Policy", color: "#1e40af" },
  military: { label: "Military & Intel", color: "#065f46" },
  whistleblower: { label: "Whistleblowers", color: "#dc2626" },
  scientific: { label: "Scientific Research", color: "#7c3aed" },
  historical: { label: "Historical Cases", color: "#b45309" },
  geological: { label: "Geological Correlation", color: "#854d0e" },
  nuclear: { label: "Nuclear Proximity", color: "#eab308" },
  crash_retrieval: { label: "Crash Retrieval", color: "#be123c" },
  testimony: { label: "Congressional Testimony", color: "#0891b2" },
  legislation: { label: "Legislation", color: "#4338ca" },
  international: { label: "International Programs", color: "#0d9488" },
  religious: { label: "Religious / Vatican", color: "#a855f7" },
  suppression: { label: "Suppression / Deaths", color: "#f43f5e" },
  consciousness: { label: "Consciousness / Psi", color: "#06b6d4" },
};

export const CREDIBILITY_META: Record<CredibilityTier, { label: string; color: string }> = {
  confirmed: { label: "Officially Confirmed", color: "#16a34a" },
  high: { label: "High Credibility", color: "#2563eb" },
  moderate: { label: "Moderate", color: "#d97706" },
  unverified: { label: "Unverified", color: "#6b7280" },
  disputed: { label: "Disputed", color: "#ef4444" },
};

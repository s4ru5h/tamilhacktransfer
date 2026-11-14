/**
 * Tamil language pack — everything language-specific lives here so
 * Hinglish / Spanglish packs can be added later without touching services.
 */

export interface NpcVoiceConfig {
  /** ElevenLabs Voice Library voice ID. Env override: VOICE_<UPPERCASE_KEY>. */
  voiceId: string;
  /** NPC mood → inline audio tag (Eleven v3 supports [tags] in text). */
  moods: Record<string, string>;
  /** Register profile hint for the LLM grader (formal / casual / street). */
  register: "formal" | "casual" | "street_formal" | "street_casual";
}

export interface LanguagePack {
  /** Scribe settings. Tamil is ISO-639-1 `ta`; English secondary for Tanglish. */
  stt: {
    model: string;
    primaryLanguage: string;
    secondaryLanguages: string[];
    /** Scenario vocabulary bias (menu items, place names). +20% STT cost. */
    keyterms: string[];
  };
  tts: {
    /** Expressive model with Tamil support + inline [audio tags]. */
    model: string;
    /** Fast model for realtime NPC replies. */
    realtimeModel: string;
    languageCode: string;
    stability: number;
    similarityBoost: number;
  };
  /** Voice used for [Play Native Tamil] + word drill clips. */
  narratorVoiceId: string;
  voices: Record<string, NpcVoiceConfig>;
  /** Whitelisted loanwords — never penalized in the Tanglish ratio. */
  loanwords: string[];
  /** English fillers counted against the Fluency pillar. */
  fillers: string[];
  /** Romanized Tamil lexicon used by the language tagger. */
  romanizedLexicon: string[];
  /** English stopwords used by the language tagger. */
  englishStopwords: string[];
}

export const tamilPack: LanguagePack = {
  stt: {
    model: "scribe_v3",
    primaryLanguage: "ta",
    secondaryLanguages: ["en"],
    keyterms: [
      "Vanakkam", "Indiranagar", "Chennai", "dosa", "idli", "vada",
      "sambar", "chutney", "filter coffee", "parotta", "biriyani",
    ],
  },
  tts: {
    model: "eleven_v3",
    realtimeModel: "eleven_v3_conversational",
    languageCode: "ta",
    stability: 0.5,
    similarityBoost: 0.75,
  },
  // TODO: pick Tamil-capable voices in the Voice Library and paste IDs here
  // (or set VOICE_* env overrides). Empty string = endpoint returns a clear error.
  narratorVoiceId: "",
  voices: {
    customs_officer: { voiceId: "", moods: { default: "[serious]" }, register: "formal" },
    taxi_driver:     { voiceId: "", moods: { default: "[cheerful]" }, register: "street_formal" },
    elder_host:      { voiceId: "", moods: { default: "[warmly]" }, register: "formal" },
    cousin:          { voiceId: "", moods: { default: "[laughs]" }, register: "casual" },
    waiter:          { voiceId: "", moods: { default: "[sighs]" }, register: "street_formal" },
    shopkeeper:      { voiceId: "", moods: { default: "[excited]" }, register: "street_casual" },
  },
  // Tamilized loanwords spoken in Tamil Nadu every day — count as Tamil.
  loanwords: [
    "taxi", "auto", "bus", "train", "flight", "airport", "passport", "visa",
    "bill", "meter", "hotel", "restaurant", "coffee", "tea", "shirt", "pant",
    "size", "colour", "color", "computer", "phone", "bag", "luggage", "room",
    "mall", "shop", "street", "signal", "left", "right", "straight", "number",
  ],
  fillers: [
    "um", "uh", "erm", "hmm", "mm", "like", "actually", "literally",
    "you know", "i mean", "kind of", "sort of", "okay ok",
  ],
  romanizedLexicon: [
    // greetings & pronouns
    "vanakkam", "vaanga", "vaa", "neenga", "nee", "naan", "naama", "enga",
    "inga", "anga", "thambi", "anna", "akka", "ayya", "amma", "appa", "paatti",
    "thatha", "sir", "madam",
    // common verbs / phrase particles
    "venum", "vennam", "illai", "illa", "seri", "aagum", "aagathu", "irukku",
    "irruku", "irukanga", "porathukku", "porukku", "pogalam", "vaaren",
    "varren", "varein", "saaptu", "saapta", "saapidren", "kudukka",
    "kuduthukka", "evvalavu", "evlo", "enna", "eppadi", "epdi", "yaaru",
    "yaru", "edhu", "ingu", "anga", "ippo", "appo", "sollunga", "solren",
    "puren", "pogren", "vaankalen", "vanthuten", "sirichu", "romba",
    "konjam", "nalla", "seethi", "kodi", "billu",
  ],
  englishStopwords: [
    "the", "is", "are", "to", "of", "and", "a", "an", "in", "on", "at", "for",
    "with", "i", "my", "me", "we", "us", "you", "your", "he", "she", "it",
    "this", "that", "these", "those", "what", "how", "much", "many", "where",
    "when", "who", "why", "do", "does", "did", "can", "could", "will",
    "would", "should", "want", "need", "have", "has", "had", "please",
    "thank", "thanks", "hello", "hi", "ok", "okay", "yes", "no", "not",
    "so", "but", "or", "if", "just", "now", "here", "there", "go", "come",
    "give", "take", "get", "put", "let", "tell", "say", "am", "be", "was",
    "were", "been", "from", "about", "one", "two", "three", "very", "some",
    "any", "all", "also", "only", "then", "than", "because", "time", "good",
    "fine", "bro", "brother", "sister",
  ],
};

export const DIFFICULTY_CONFIG: Record<
  "easy" | "medium" | "hard",
  { englishShareAllowed: number; label: string }
> = {
  easy:   { englishShareAllowed: 0.6,  label: "Tanglish Friendly" },
  medium: { englishShareAllowed: 0.3,  label: "Balanced Code-Switching" },
  hard:   { englishShareAllowed: 0.05, label: "Full Immersion" },
};

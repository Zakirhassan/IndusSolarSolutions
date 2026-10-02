// Filler that makes copy read as machine-written or salesy. Checked against
// blog posts (blog.test.ts) and all other site copy (siteCopy.test.ts); see
// docs/blog-style-guide.md. If a test fails, rewrite the sentence.
export const BANNED_PHRASES = [
  "honest", "honestly", "delve", "navigate", "navigating", "journey", "unlock",
  "seamless", "seamlessly", "robust", "leverage", "game-changer", "game changer",
  "comprehensive", "in today's", "it's worth noting", "it is worth noting",
  "furthermore", "moreover", "whether you're", "look no further", "embark",
  "elevate", "landscape", "tapestry", "in conclusion", "ever-evolving",
  "harness the power", "peace of mind", "cutting-edge", "state-of-the-art",
  "hassle-free", "stress-free", "complete guide", "ultimate guide",
  "a testament to", "rest assured", "one-stop", "world-class", "best-in-class",
];

export function findBannedPhrases(text: string): string[] {
  const lower = text.toLowerCase();
  return BANNED_PHRASES.filter((p) => new RegExp(`\\b${p.replace(/[-']/g, "[-' ]?")}\\b`).test(lower));
}

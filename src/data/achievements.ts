import { User, Submission, CompletedInternship } from "../types";

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: "Milestone" | "Skill Mastery" | "Performance" | "Community";
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  iconName: string; // Resolves to Lucide icon key
  bgGradient: string; // Tailwind gradient classes
  ringColor: string; // Tailwind ring border color
  labelColor: string; // Badge label color theme
}

export const ACHIEVEMENTS_DATABASE: Badge[] = [
  {
    id: "pioneer",
    title: "SaaS Pioneer",
    description: "Launch your candidate workstation on the Nextern Engine platform.",
    category: "Community",
    rarity: "Common",
    iconName: "Sparkles",
    bgGradient: "from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 text-indigo-500",
    ringColor: "border-indigo-500/35",
    labelColor: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
  },
  {
    id: "first-milestone",
    title: "First Blood",
    description: "Successfully submit and pass your very first milestone campaign.",
    category: "Milestone",
    rarity: "Common",
    iconName: "CheckCheck",
    bgGradient: "from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 text-emerald-500",
    ringColor: "border-emerald-500/35",
    labelColor: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
  },
  {
    id: "ascending-dev",
    title: "Apex Ascent",
    description: "Progress through the curriculum to unlock Task 3 of your training.",
    category: "Milestone",
    rarity: "Rare",
    iconName: "Layers",
    bgGradient: "from-blue-500/10 to-violet-500/10 hover:from-blue-500/20 hover:to-violet-500/20 text-blue-500",
    ringColor: "border-blue-500/35",
    labelColor: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
  },
  {
    id: "pathway-mastery",
    title: "Domain Grandmaster",
    description: "Complete all 2 project milestones and generate your certified professional credential.",
    category: "Skill Mastery",
    rarity: "Epic",
    iconName: "Award",
    bgGradient: "from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 text-amber-500",
    ringColor: "border-amber-500/35",
    labelColor: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
  },
  {
    id: "apex-performer",
    title: "Apex Elite (A+)",
    description: "Score a flawless A+ Grade from the Nextern AI compliance evaluation agent.",
    category: "Performance",
    rarity: "Epic",
    iconName: "Star",
    bgGradient: "from-yellow-500/10 to-amber-500/10 hover:from-yellow-500/20 hover:to-amber-500/20 text-yellow-500",
    ringColor: "border-yellow-500/35",
    labelColor: "bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400"
  },
  {
    id: "unblemished-code",
    title: "Clean Code Advocate",
    description: "Obtain a high Compliance score of 95% or greater on an accredited submission.",
    category: "Performance",
    rarity: "Legendary",
    iconName: "ShieldCheck",
    bgGradient: "from-fuchsia-500/10 to-pink-500/10 hover:from-fuchsia-500/20 hover:to-pink-500/20 text-fuchsia-500",
    ringColor: "border-fuchsia-500/35",
    labelColor: "bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-600 dark:text-fuchsia-450"
  },
  {
    id: "org-purity",
    title: "Authentic Code base",
    description: "Secure a plagiarism index rating under 3% on verified milestones.",
    category: "Performance",
    rarity: "Rare",
    iconName: "Lock",
    bgGradient: "from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 text-indigo-500",
    ringColor: "border-indigo-500/35",
    labelColor: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
  },
  {
    id: "networking-maven",
    title: "Sourcing Architect",
    description: "Accelerate your candidate discovery rate by preparing to broadcast credentials on LinkedIn.",
    category: "Community",
    rarity: "Common",
    iconName: "Share2",
    bgGradient: "from-cyan-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-teal-500/20 text-cyan-500",
    ringColor: "border-cyan-500/35",
    labelColor: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400"
  },
  {
    id: "university-scholar",
    title: "Verified Academic",
    description: "Accredit your candidate profile as a student from a partner university.",
    category: "Community",
    rarity: "Common",
    iconName: "BookOpen",
    bgGradient: "from-emerald-500/10 to-green-500/10 hover:from-emerald-500/20 hover:to-green-500/20 text-emerald-500",
    ringColor: "border-emerald-500/35",
    labelColor: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
  },
  {
    id: "full-stack-overlord",
    title: "Full Stack Wizard",
    description: "Successfully master all milestones in the Full Stack Development pathway.",
    category: "Skill Mastery",
    rarity: "Legendary",
    iconName: "FileCode",
    bgGradient: "from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 text-purple-500",
    ringColor: "border-purple-500/35",
    labelColor: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400"
  },
  {
    id: "ai-alchemist",
    title: "Neural Alchemist",
    description: "Successfully master all milestones in the Artificial Intelligence pathway.",
    category: "Skill Mastery",
    rarity: "Legendary",
    iconName: "FileCode",
    bgGradient: "from-amber-500/10 to-violet-500/10 hover:from-amber-500/20 hover:to-violet-500/20 text-violet-500",
    ringColor: "border-violet-500/35",
    labelColor: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400"
  },
  {
    id: "uiux-master",
    title: "Pixel Maestro",
    description: "Successfully master all milestones in the UI/UX Design pathway.",
    category: "Skill Mastery",
    rarity: "Legendary",
    iconName: "FileCode",
    bgGradient: "from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20 text-pink-500",
    ringColor: "border-pink-500/35",
    labelColor: "bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400"
  }
];

// Helper to calculate score milestones dynamically based on user object
export function evaluateUserBadges(user: User): string[] {
  const earned: string[] = ["pioneer"]; // Pioneer is given automatically on launch

  const submissions = user.internship ? Object.values(user.internship.submissions) : [];
  const completedHistory = user.completedInternships || [];

  // 1. Academic scholar
  if (user.universityName && user.universityName.trim().length > 0) {
    earned.push("university-scholar");
  }

  // 2. First blood
  const passedSubmissions = submissions.filter(sub => sub.status === "APPROVED");
  if (passedSubmissions.length > 0) {
    earned.push("first-milestone");
  }

  // 3. Ascending dev (if they have submitted at least 1 milestone or reached currentTaskIndex >= 1)
  if (passedSubmissions.length >= 2 || (user.internship && user.internship.currentTaskIndex >= 2)) {
    earned.push("ascending-dev");
  }

  // 4. Domain Grandmaster (if they have a completed internship in history or current is COMPLETED)
  const hasCompleted = completedHistory.length > 0 || (user.internship && user.internship.status === "COMPLETED");
  if (hasCompleted) {
    earned.push("pathway-mastery");
  }

  // Check performance parameters from submissions
  passedSubmissions.forEach(sub => {
    if (sub.aiReview) {
      // 5. High grade
      if (sub.aiReview.grade === "A+") {
        earned.push("apex-performer");
      }
      // 6. High compliance
      if (sub.aiReview.complianceScore >= 95) {
        earned.push("unblemished-code");
      }
      // 7. Plagiarism proof
      if (sub.aiReview.plagiarismScore <= 3 && sub.aiReview.plagiarismScore > 0) {
        earned.push("org-purity");
      }
    }
  });

  // 8. Specific pathway completions
  const completedDomainIds = new Set<string>();
  completedHistory.forEach(ch => completedDomainIds.add(ch.domainId));
  if (user.internship && user.internship.status === "COMPLETED") {
    completedDomainIds.add(user.internship.domainId);
  }

  if (completedDomainIds.has("full-stack")) {
    earned.push("full-stack-overlord");
  }
  if (completedDomainIds.has("ai-engineer") || completedDomainIds.has("machine-learning")) {
    earned.push("ai-alchemist");
  }
  if (completedDomainIds.has("uiux-design")) {
    earned.push("uiux-master");
  }

  // Save manual shares or custom logs
  if (user.unlockedBadgeIds && Array.isArray(user.unlockedBadgeIds)) {
    user.unlockedBadgeIds.forEach(id => {
      if (!earned.includes(id)) {
        earned.push(id);
      }
    });
  }

  return Array.from(new Set(earned));
}

export enum UserRole {
  STUDENT = "STUDENT",
  RECRUITER = "RECRUITER",
  ADMIN = "ADMIN",
  UNIVERSITY = "UNIVERSITY"
}

export interface Task {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  instructions: string[];
  sampleOutput: string;
  resources: string[];
  submissionFormat: string;
  deadlineDays: number;
}

export interface Domain {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tasks: Task[];
}

export interface Submission {
  id: string;
  taskId: string;
  taskTitle: string;
  githubLink?: string;
  driveLink?: string;
  zipName?: string;
  submittedAt: string;
  status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  aiReview?: {
    grade: "A+" | "A" | "B" | "C" | "F";
    complianceScore: number; // 0-100
    plagiarismScore: number; // 0-100 (low is good)
    strengths: string[];
    improvements: string[];
    logFeedback: string;
  };
}

export interface Internship {
  id: string;
  domainId: string;
  domainTitle: string;
  startedAt: string;
  status: "ACTIVE" | "COMPLETED";
  completedAt?: string;
  offerLetterId: string;
  certificateId?: string;
  currentTaskIndex: number;
  submissions: Record<string, Submission>; // taskId -> Submission
}

export interface CompletedInternship {
  domainId: string;
  domainTitle: string;
  completedAt: string;
  certificateId: string;
  grade: "A+" | "A" | "B" | "C" | "F";
  skills: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  verified: boolean;
  universityName?: string;
  // Student profile fields
  collegeName?: string;
  degree?: string;
  graduationYear?: string;
  internship?: Internship;
  internships?: Internship[];
  completedInternships?: CompletedInternship[];
  unlockedBadgeIds?: string[];
  biodata?: {
    bio: string;
    skills: string[];
    linkedin?: string;
    github?: string;
    portfolioUrl?: string;
  };
}

export interface UniversityStudentReport {
  studentId: string;
  name: string;
  email: string;
  domainTitle: string;
  progress: number; // e.g. 66% Complete
  status: "Active" | "Completed";
  averageRating: string;
}

export interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  sentAt: string;
  type: "REGISTRATION" | "OFFER_LETTER" | "TASK_UNLOCK" | "COMPLETION" | "CERTIFICATE";
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

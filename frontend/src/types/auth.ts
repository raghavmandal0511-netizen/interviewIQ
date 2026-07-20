export type UserRole = "user" | "admin";

export type UserProfile = {
  avatar?: string;
  displayName?: string;
  bio?: string;
};

export type Education = {
  _id: string;
  institute: string;
  degree: string;
  startDate?: string;
  endDate?: string;
  currentlyStudying?: boolean;
};

export type Experience = {
  _id: string;
  company: string;
  jobTitle: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
};

export type UserCareer = {
  targetRole?: string;
  skills?: string[];
  education?: Education[];
  experience?: Experience[];
};

export type UserSocialLinks = {
  github?: string;
  linkedIn?: string;
  portfolio?: string;
};

/** Normalized user for UI + store */
export type User = {
  id: string;
  name: string;
  email: string;
  userName?: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;
  targetRole?: string;
  skills?: string[];
  education?: Education[];
  experience?: Experience[];
  socialLinks?: UserSocialLinks;
  profileCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

/** Raw backend user document */
export type BackendUser = {
  _id: string;
  userName: string;
  email: string;
  phone?: string;
  profile?: UserProfile;
  career?: UserCareer;
  socialLinks?: UserSocialLinks;
  profileCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthSession = {
  user: User | null;
  isAuthenticated: boolean;
};

export type EducationInput = {
  institute: string;
  degree: string;
  startDate: string;
  endDate?: string;
  currentlyStudying?: boolean;
};

export type ExperienceInput = {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
};

export function mapBackendUser(raw: BackendUser): User {
  return {
    id: raw._id,
    name: raw.profile?.displayName?.trim() || raw.userName,
    email: raw.email,
    userName: raw.userName,
    role: "user",
    avatarUrl: raw.profile?.avatar || undefined,
    bio: raw.profile?.bio,
    targetRole: raw.career?.targetRole,
    skills: raw.career?.skills ?? [],
    education: raw.career?.education ?? [],
    experience: raw.career?.experience ?? [],
    socialLinks: raw.socialLinks,
    profileCompleted: raw.profileCompleted,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

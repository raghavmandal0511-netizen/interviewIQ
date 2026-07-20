"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  FileText,
  Globe,
  GraduationCap,
  Target,
  User as UserIcon,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { ErrorState, PageSkeleton } from "@/components/shared/states";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { queryKeys } from "@/constants/query-keys";
import { ROUTES } from "@/constants/routes";
import { useProfileQuery } from "@/features/auth/hooks";
import { profileService } from "@/features/profile/api";
import { EducationDialog } from "@/features/profile/components/EducationDialog";
import { ExperienceDialog } from "@/features/profile/components/ExperienceDialog";
import { FieldEditDialog } from "@/features/profile/components/FieldEditDialog";
import {
  SettingsRow,
  SettingsSection,
} from "@/features/profile/components/SettingsRow";
import { useAuthStore } from "@/store/auth.store";
import type { Education, Experience, User } from "@/types/auth";
import { ApiError } from "@/lib/axios";

type FieldKey =
  | "displayName"
  | "bio"
  | "targetRole"
  | "skills"
  | "github"
  | "linkedIn"
  | "portfolio";

function formatRange(start?: string, end?: string, ongoing?: boolean) {
  const fmt = (v?: string) => {
    if (!v) return "";
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  };
  const s = fmt(start);
  if (!s) return "";
  if (ongoing) return `${s} – Present`;
  const e = fmt(end);
  return e ? `${s} – ${e}` : s;
}

export function SettingsPage() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  const { data: user, isLoading, isError, refetch } = useProfileQuery();

  const [fieldOpen, setFieldOpen] = useState<FieldKey | null>(null);
  const [fieldValue, setFieldValue] = useState("");
  const [saving, setSaving] = useState(false);

  const [eduOpen, setEduOpen] = useState(false);
  const [eduEdit, setEduEdit] = useState<Education | null>(null);

  const [expOpen, setExpOpen] = useState(false);
  const [expEdit, setExpEdit] = useState<Experience | null>(null);

  const initials = useMemo(() => {
    const name = user?.name || "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [user?.name]);

  const syncUser = async (updated: User) => {
    setUser(updated);
    await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
  };

  const openField = (key: FieldKey, current: string) => {
    setFieldKeyAndValue(key, current);
  };

  const setFieldKeyAndValue = (key: FieldKey, current: string) => {
    setFieldOpen(key);
    setFieldValue(current);
  };

  const fieldMeta: Record<
    FieldKey,
    { title: string; description: string; label: string; multiline?: boolean }
  > = {
    displayName: {
      title: "Update Display Name",
      description: "This name appears on your profile and dashboard.",
      label: "Display Name",
    },
    bio: {
      title: "Update Bio",
      description: "Share a short summary about yourself (max 300 chars).",
      label: "Bio",
      multiline: true,
    },
    targetRole: {
      title: "Update Target Role",
      description: "Set the role you are preparing for.",
      label: "Target Role",
    },
    skills: {
      title: "Update Skills",
      description: "Comma-separated skills shown on your profile.",
      label: "Skills",
      multiline: true,
    },
    github: {
      title: "Update GitHub",
      description: "Add your GitHub profile URL.",
      label: "GitHub URL",
    },
    linkedIn: {
      title: "Update LinkedIn",
      description: "Add your LinkedIn profile URL.",
      label: "LinkedIn URL",
    },
    portfolio: {
      title: "Update Portfolio",
      description: "Add your portfolio or personal website URL.",
      label: "Portfolio URL",
    },
  };

  const handleSaveField = async () => {
    if (!fieldOpen || !user) return;
    setSaving(true);
    try {
      let updated: User;
      switch (fieldOpen) {
        case "displayName":
          updated = await profileService.updateDisplayName(fieldValue.trim());
          break;
        case "bio":
          updated = await profileService.updateBio(fieldValue.trim());
          break;
        case "targetRole":
          updated = await profileService.updateTargetRole(fieldValue.trim());
          break;
        case "skills":
          updated = await profileService.updateSkills(
            fieldValue
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          );
          break;
        case "github":
          updated = await profileService.updateGithub(fieldValue.trim());
          break;
        case "linkedIn":
          updated = await profileService.updateLinkedIn(fieldValue.trim());
          break;
        case "portfolio":
          updated = await profileService.updatePortfolio(fieldValue.trim());
          break;
      }
      await syncUser(updated);
      toast.success("Saved");
      setFieldOpen(null);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 pb-12">
        <PageSkeleton rows={4} />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 pb-12">
        <ErrorState onRetry={() => void refetch()} />
      </div>
    );
  }

  const meta = fieldOpen ? fieldMeta[fieldOpen] : null;
  const workSummary =
    user.experience && user.experience.length > 0
      ? user.experience
          .map((e) => `${e.jobTitle} @ ${e.company}`)
          .join(" · ")
      : "Add work experience";
  const educationSummary =
    user.education && user.education.length > 0
      ? user.education.map((e) => `${e.degree} · ${e.institute}`).join(" · ")
      : "Add education";

  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-16">
      <div>
        <Link
          href={ROUTES.dashboard.profile}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-500 hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Profile
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          Settings
        </h1>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-lg font-semibold text-white">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatarUrl}
              alt=""
              className="h-full w-full rounded-2xl object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            {user.name}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
        </div>
      </div>

      <SettingsSection
        title="General"
        description="Manage your basic profile information"
      >
        <SettingsRow
          icon={UserIcon}
          label="Display Name"
          value={user.name}
          onClick={() => openField("displayName", user.name)}
        />
        <SettingsRow
          icon={FileText}
          label="Bio"
          value={user.bio}
          onClick={() => openField("bio", user.bio ?? "")}
        />
        <SettingsRow
          icon={Target}
          label="Target Role"
          value={user.targetRole}
          onClick={() => openField("targetRole", user.targetRole ?? "")}
        />
        <SettingsRow
          icon={GitHubIcon}
          label="GitHub"
          value={user.socialLinks?.github}
          onClick={() => openField("github", user.socialLinks?.github ?? "")}
        />
        <SettingsRow
          icon={LinkedInIcon}
          label="LinkedIn"
          value={user.socialLinks?.linkedIn}
          onClick={() => openField("linkedIn", user.socialLinks?.linkedIn ?? "")}
        />
        <SettingsRow
          icon={Globe}
          label="Portfolio / Website"
          value={user.socialLinks?.portfolio}
          onClick={() =>
            openField("portfolio", user.socialLinks?.portfolio ?? "")
          }
        />
      </SettingsSection>

      <SettingsSection
        title="Experience"
        description="Share your growth from learning to career."
      >
        <SettingsRow
          icon={Briefcase}
          label="Work"
          value={workSummary}
          onClick={() => {
            setExpEdit(null);
            setExpOpen(true);
          }}
        />
        {user.experience?.map((exp) => (
          <SettingsRow
            key={exp._id}
            icon={Briefcase}
            label={exp.jobTitle}
            value={`${exp.company} · ${formatRange(exp.startDate, exp.endDate, exp.currentlyWorking)}`}
            onClick={() => {
              setExpEdit(exp);
              setExpOpen(true);
            }}
          />
        ))}
        <SettingsRow
          icon={GraduationCap}
          label="Education"
          value={educationSummary}
          onClick={() => {
            setEduEdit(null);
            setEduOpen(true);
          }}
        />
        {user.education?.map((edu) => (
          <SettingsRow
            key={edu._id}
            icon={GraduationCap}
            label={edu.degree}
            value={`${edu.institute} · ${formatRange(edu.startDate, edu.endDate, edu.currentlyStudying)}`}
            onClick={() => {
              setEduEdit(edu);
              setEduOpen(true);
            }}
          />
        ))}
        <SettingsRow
          icon={Wrench}
          label="Skills"
          value={user.skills?.length ? user.skills.join(", ") : undefined}
          onClick={() => openField("skills", (user.skills ?? []).join(", "))}
        />
      </SettingsSection>

      {meta ? (
        <FieldEditDialog
          open={Boolean(fieldOpen)}
          onOpenChange={(open) => {
            if (!open) setFieldOpen(null);
          }}
          title={meta.title}
          description={meta.description}
          label={meta.label}
          value={fieldValue}
          onChange={setFieldValue}
          onSave={() => void handleSaveField()}
          saving={saving}
          multiline={meta.multiline}
        />
      ) : null}

      <EducationDialog
        open={eduOpen}
        onOpenChange={setEduOpen}
        initial={eduEdit}
        onSave={async (payload) => {
          const updated = eduEdit
            ? await profileService.updateEducation(eduEdit._id, payload)
            : await profileService.addEducation(payload);
          await syncUser(updated);
          toast.success(eduEdit ? "Education updated" : "Education added");
        }}
        onDelete={
          eduEdit
            ? async () => {
                const updated = await profileService.deleteEducation(eduEdit._id);
                await syncUser(updated);
                toast.success("Education removed");
              }
            : undefined
        }
      />

      <ExperienceDialog
        open={expOpen}
        onOpenChange={setExpOpen}
        initial={expEdit}
        onSave={async (payload) => {
          const updated = expEdit
            ? await profileService.updateExperience(expEdit._id, payload)
            : await profileService.addExperience(payload);
          await syncUser(updated);
          toast.success(expEdit ? "Work updated" : "Work added");
        }}
        onDelete={
          expEdit
            ? async () => {
                const updated = await profileService.deleteExperience(expEdit._id);
                await syncUser(updated);
                toast.success("Work removed");
              }
            : undefined
        }
      />
    </div>
  );
}

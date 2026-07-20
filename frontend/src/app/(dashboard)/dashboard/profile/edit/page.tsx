"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Save, ArrowLeft, Check } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";

export default function EditProfilePage() {
  const user = useAuthStore((state) => state.user);
  const currentTargetRole = useAuthStore((state) => state.targetRole);
  const setUser = useAuthStore((state) => state.setUser);
  const setTargetRole = useAuthStore((state) => state.setTargetRole);

  const [saved, setSaved] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || "John Doe");
  const [targetRole, setFormTargetRole] = useState(currentTargetRole || "Senior Fullstack Engineer");
  const [bio, setBio] = useState("Passionate engineer aiming for top tier placement interviews.");

  useEffect(() => {
    if (user?.name) setDisplayName(user.name);
    if (currentTargetRole) setFormTargetRole(currentTargetRole);
  }, [user?.name, currentTargetRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({
        ...user,
        name: displayName,
      });
    }
    setTargetRole(targetRole);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={ROUTES.dashboard.profile}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#5D50EB] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Profile</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Edit Profile & Settings
          </h1>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:border-emerald-900 dark:text-emerald-300">
          <Check className="h-4 w-4" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <DashboardCard title="Personal & Career Details">
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#5D50EB] focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setFormTargetRole(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#5D50EB] focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#5D50EB] focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#4d40db] transition-all"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </DashboardCard>
      </form>
    </div>
  );
}

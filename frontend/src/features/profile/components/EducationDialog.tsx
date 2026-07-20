"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Education, EducationInput } from "@/types/auth";

type EducationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Education | null;
  onSave: (payload: EducationInput) => Promise<void>;
  onDelete?: () => Promise<void>;
};

function toMonthInput(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function fromMonthInput(value: string) {
  if (!value) return undefined;
  return `${value}-01`;
}

export function EducationDialog({
  open,
  onOpenChange,
  initial,
  onSave,
  onDelete,
}: EducationDialogProps) {
  const [institute, setInstitute] = useState("");
  const [degree, setDegree] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentlyStudying, setCurrentlyStudying] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setInstitute(initial?.institute ?? "");
    setDegree(initial?.degree ?? "");
    setStartDate(toMonthInput(initial?.startDate));
    setEndDate(toMonthInput(initial?.endDate));
    setCurrentlyStudying(Boolean(initial?.currentlyStudying));
  }, [open, initial]);

  const handleSave = async () => {
    if (!institute.trim() || !degree.trim() || !startDate) return;
    setSaving(true);
    try {
      await onSave({
        institute: institute.trim(),
        degree: degree.trim(),
        startDate: fromMonthInput(startDate)!,
        endDate: currentlyStudying ? undefined : fromMonthInput(endDate),
        currentlyStudying,
      });
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 border-zinc-200 bg-white p-0 text-zinc-900 sm:max-w-lg dark:border-white/[0.08] dark:bg-[#161B22] dark:text-white">
        <DialogHeader className="space-y-2 px-6 pt-6 text-left">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
              <Info className="h-3.5 w-3.5" />
            </span>
            {initial ? "Update Education" : "Add Education"}
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
            Provide your education experience for your profile.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-6 py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-600 dark:text-zinc-300">School</Label>
              <Input
                value={institute}
                onChange={(e) => setInstitute(e.target.value)}
                placeholder="Institute name"
                className="border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-600 dark:text-zinc-300">Degree</Label>
              <Input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="B.Tech CSE"
                className="border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-600 dark:text-zinc-300">Start</Label>
              <Input
                type="month"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-600 dark:text-zinc-300">End</Label>
              <Input
                type="month"
                value={endDate}
                disabled={currentlyStudying}
                onChange={(e) => setEndDate(e.target.value)}
                className="border-zinc-200 bg-zinc-50 text-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={currentlyStudying}
              onChange={(e) => {
                setCurrentlyStudying(e.target.checked);
                if (e.target.checked) setEndDate("");
              }}
              className="h-4 w-4 rounded border-zinc-400 dark:border-zinc-600"
            />
            To Present
          </label>
        </div>

        <DialogFooter className="gap-2 border-t border-zinc-100 px-6 py-4 sm:justify-between dark:border-zinc-800">
          {initial && onDelete ? (
            <button
              type="button"
              disabled={saving}
              onClick={() => void onDelete().then(() => onOpenChange(false))}
              className="rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
            >
              Delete
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => void handleSave()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-70"
            >
              {saving ? "Saving..." : initial ? "Save" : "Add"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

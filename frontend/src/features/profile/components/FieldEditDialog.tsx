"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FieldDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  saving?: boolean;
  multiline?: boolean;
  placeholder?: string;
};

export function FieldEditDialog({
  open,
  onOpenChange,
  title,
  description,
  label,
  value,
  onChange,
  onSave,
  saving,
  multiline,
  placeholder,
}: FieldDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 border-zinc-200 bg-white p-0 text-zinc-900 sm:max-w-md dark:border-white/[0.08] dark:bg-[#161B22] dark:text-white">
        <DialogHeader className="space-y-2 px-6 pt-6 text-left">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              <Info className="h-3.5 w-3.5" />
            </span>
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 px-6 py-4">
          <Label htmlFor="field-input" className="text-xs text-zinc-600 dark:text-zinc-300">
            {label}
          </Label>
          {multiline ? (
            <Textarea
              id="field-input"
              rows={4}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="border-zinc-200 bg-zinc-50 text-sm text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
            />
          ) : (
            <Input
              id="field-input"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="border-zinc-200 bg-zinc-50 text-sm text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
            />
          )}
        </div>

        <DialogFooter className="gap-2 border-t border-zinc-100 px-6 py-4 sm:justify-end dark:border-zinc-800">
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
            onClick={onSave}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

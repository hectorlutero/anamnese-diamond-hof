"use client";

import { MOOD_OPTIONS } from "@/lib/types";

interface MoodPickerProps {
  values: string[];
  onChange: (values: string[]) => void;
}

export function MoodPicker({ values, onChange }: MoodPickerProps) {
  const toggle = (id: string) => {
    if (values.includes(id)) {
      onChange(values.filter((v) => v !== id));
    } else {
      onChange([...values, id]);
    }
  };

  return (
    <fieldset className="mb-6">
      <legend className="mb-4 text-base font-semibold text-stone-800">Humor</legend>
      <div className="flex flex-wrap gap-2">
        {MOOD_OPTIONS.map((mood) => {
          const selected = values.includes(mood.id);
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => toggle(mood.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all ${
                selected
                  ? "border-gold-400 bg-gold-100 text-gold-900 shadow-sm"
                  : "border-orange-100 bg-orange-50/80 text-stone-700 hover:border-gold-200 hover:bg-gold-50"
              }`}
            >
              <span className="text-lg leading-none">{mood.emoji}</span>
              <span>{mood.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="mb-6 text-lg font-semibold tracking-wide text-gold-700 uppercase">
      {children}
    </h2>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
}

export function TextField({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
  multiline,
}: TextFieldProps) {
  const inputClass =
    "w-full border-0 border-b border-stone-300 bg-transparent px-0 py-2 text-stone-800 placeholder:text-stone-400 focus:border-gold-500 focus:outline-none focus:ring-0 transition-colors";

  return (
    <label className="mb-5 block">
      <span className="mb-1 block text-sm font-medium text-stone-700">
        {label}
        {required && <span className="text-gold-600"> *</span>}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </label>
  );
}

interface CheckboxGroupProps {
  label: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  columns?: 1 | 2;
}

export function CheckboxGroup({
  label,
  options,
  values,
  onChange,
  columns = 2,
}: CheckboxGroupProps) {
  const toggle = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <fieldset className="mb-6">
      <legend className="mb-3 text-sm font-medium text-stone-700">{label}</legend>
      <div
        className={`grid gap-2 ${columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
      >
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-stone-50"
          >
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => toggle(option)}
              className="accent-gold-600"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

interface RadioGroupProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ label, options, value, onChange }: RadioGroupProps) {
  return (
    <fieldset className="mb-5">
      <legend className="mb-2 text-sm font-medium text-stone-700">{label}</legend>
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name={label}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-gold-600"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

interface YesNoSimpleProps {
  label: string;
  value: string;
  onChange: (value: "sim" | "nao" | "") => void;
}

export function YesNoSimple({ label, value, onChange }: YesNoSimpleProps) {
  return (
    <fieldset className="mb-4">
      <legend className="mb-2 text-sm font-medium text-stone-700">{label}</legend>
      <div className="flex gap-4">
        {(["sim", "nao"] as const).map((opt) => (
          <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name={label}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="accent-gold-600"
            />
            <span>{opt === "sim" ? "Sim" : "Não"}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

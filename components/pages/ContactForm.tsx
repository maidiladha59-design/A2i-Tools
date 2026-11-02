"use client";

import { useState, type FormEvent } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { CONTACT_EMAIL } from "@/lib/config";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type FieldErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export function CopyEmailButton() {
  const t = useTranslations("contact");
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      toast({ title: t("copied"), variant: "success" });
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={buttonClass("secondary", "sm", "w-full sm:w-auto")}
    >
      {copied ? (
        <Check className="h-4 w-4 text-success" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      {copied ? t("copied") : t("copyEmail")}
    </button>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const { toast } = useToast();
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});

  const update = (field: keyof typeof values, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FieldErrors = {};

    if (!values.name.trim()) nextErrors.name = t("required");
    if (!values.email.trim()) {
      nextErrors.email = t("required");
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = t("invalidEmail");
    }
    if (!values.subject.trim()) nextErrors.subject = t("required");
    if (!values.message.trim()) nextErrors.message = t("required");

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const subject = encodeURIComponent(values.subject.trim());
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    toast({ title: t("success"), variant: "success" });
  };

  const fieldClass = (field: keyof FieldErrors) =>
    cn("field-input", errors[field] && "border-danger/60");

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            {t("nameLabel")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder={t("namePlaceholder")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClass("name")}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1 text-xs font-medium text-danger">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-email" className="field-label">
            {t("emailLabel")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder={t("emailPlaceholder")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClass("email")}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1 text-xs font-medium text-danger">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="field-label">
          {t("subjectLabel")}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={(event) => update("subject", event.target.value)}
          placeholder={t("subjectPlaceholder")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          className={fieldClass("subject")}
        />
        {errors.subject ? (
          <p id="contact-subject-error" className="mt-1 text-xs font-medium text-danger">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="field-label">
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder={t("messagePlaceholder")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(fieldClass("message"), "min-h-[140px] resize-y py-3")}
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-1 text-xs font-medium text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button type="submit" className={buttonClass("primary", "md", "w-full")}>
        <Send className="h-4 w-4" aria-hidden="true" />
        {t("submit")}
      </button>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
        <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {t("mailtoHint")}
      </p>
      <p className="rounded-2xl bg-surface-2/70 p-3 text-xs leading-relaxed text-muted">
        {t("privacyNote")}
      </p>
    </form>
  );
}

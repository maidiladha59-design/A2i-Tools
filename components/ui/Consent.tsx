"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { Cookie } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

type ConsentValue = "accepted" | "declined" | null;

type ConsentContextValue = {
  status: ConsentValue;
  accept: () => void;
  decline: () => void;
  openBanner: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);
const STORAGE_KEY = "aac-consent-v1";

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useConsent must be used inside ConsentProvider");
  return context;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const t = useTranslations("cookie");
  const { toast } = useToast();
  const [status, setStatus] = useState<ConsentValue>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let stored: ConsentValue = null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === "accepted" || raw === "declined") stored = raw;
    } catch {
      // storage may be blocked; consent then lives for this session only
    }
    /* eslint-disable react-hooks/set-state-in-effect -- hydration from localStorage is an external read */
    setStatus(stored);
    setOpen(stored === null);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const persist = useCallback(
    (value: Exclude<ConsentValue, null>) => {
      setStatus(value);
      setOpen(false);
      try {
        window.localStorage.setItem(STORAGE_KEY, value);
      } catch {
        // ignore storage failures
      }
      toast({ title: t("settingsSaved"), variant: "success" });
    },
    [t, toast]
  );

  const value = useMemo(
    () => ({
      status,
      accept: () => persist("accepted"),
      decline: () => persist("declined"),
      openBanner: () => setOpen(true),
    }),
    [persist, status]
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {open ? (
        <div className="fixed inset-x-3 bottom-3 z-[110] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-md">
          <div
            role="dialog"
            aria-modal="false"
            aria-labelledby="consent-title"
            className="rounded-3xl border border-line bg-surface p-5 shadow-lift"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <Cookie className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 id="consent-title" className="text-base font-extrabold text-ink">
                  {t("title")}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {t("body")}{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-brand underline underline-offset-2 hover:text-brand-strong"
                  >
                    {t("policy")}
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => persist("declined")}
                className={buttonClass("secondary", "sm")}
              >
                {t("decline")}
              </button>
              <button
                type="button"
                onClick={() => persist("accepted")}
                className={buttonClass("primary", "sm")}
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </ConsentContext.Provider>
  );
}

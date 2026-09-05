import type { ReactNode } from "react";

function PulseLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="10" stroke="#1a1a1a" strokeWidth="0.8" />
        <path
          d="M5 12h3l1.5-4 3 8 1.5-4H19"
          stroke="#10b981"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Wordmark: 17px / 500, −0.3 tracking */}
      <span className="text-[17px] font-medium tracking-[-0.3px] text-foreground">
        Pulse
      </span>
    </div>
  );
}

function DecorativeCurves() {
  return (
    <svg
      className="absolute left-0 top-0 h-64 w-full opacity-40"
      viewBox="0 0 500 250"
      fill="none"
      preserveAspectRatio="xMinYMin slice"
    >
      <path
        d="M-20 180 Q120 20 300 100 Q400 140 520 40"
        stroke="#d8d6cf"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M-20 200 Q150 50 320 120 Q420 160 520 60"
        stroke="#d8d6cf"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

function MoodIcon({
  type,
}: {
  type: "rest" | "rough" | "okay" | "good" | "crushed";
}) {
  const size = 28;
  switch (type) {
    case "rest":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="#b8b5ad" strokeWidth="1.2" />
          <path
            d="M19 11a6 6 0 0 0-7 7 7 7 0 1 1 7-7Z"
            stroke="#b8b5ad"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "rough":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="#c75450" strokeWidth="1.2" />
          <circle cx="12" cy="14" r="1.2" fill="#c75450" />
          <circle cx="20" cy="14" r="1.2" fill="#c75450" />
          <path
            d="M12 21a5 5 0 0 1 8 0"
            stroke="#c75450"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "okay":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="#d4a017" strokeWidth="1.2" />
          <circle cx="12" cy="14" r="1.2" fill="#d4a017" />
          <circle cx="20" cy="14" r="1.2" fill="#d4a017" />
          <line
            x1="12"
            y1="20"
            x2="20"
            y2="20"
            stroke="#d4a017"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "good":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="#10b981" strokeWidth="1.2" />
          <circle cx="12" cy="14" r="1.2" fill="#10b981" />
          <circle cx="20" cy="14" r="1.2" fill="#10b981" />
          <path
            d="M12 19a5 5 0 0 0 8 0"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "crushed":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4c-2 4-8 7-8 14a8 8 0 0 0 16 0c0-7-6-10-8-14Z"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

function MoodLegend() {
  const moods = [
    { type: "rest" as const, label: "Rest" },
    { type: "rough" as const, label: "Rough" },
    { type: "okay" as const, label: "Okay" },
    { type: "good" as const, label: "Good" },
    { type: "crushed" as const, label: "Crushed it" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="h-px bg-border" />
      <div className="flex items-center gap-6">
        {moods.map(({ type, label }) => (
          <div key={type} className="flex flex-col items-center gap-1.5">
            <MoodIcon type={type} />
            {/* Meta / caption: 12px / 400 */}
            <span className="text-[12px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandingPanel() {
  return (
    <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between bg-background p-10 xl:p-14">
      <DecorativeCurves />

      <PulseLogo />

      <div className="flex flex-col gap-5">
        {/* Panel headline: 38–44px / 500, −1.2 to −1.4 tracking */}
        <h2 className="font-display text-[42px] font-medium leading-[1.12] tracking-[-1.3px] text-foreground">
          Showing up is
          <br />
          only half the
          <br />
          story.
        </h2>
        {/* Body: 14px / 400, line-height 1.45 */}
        <p className="max-w-sm text-[14px] leading-[1.45] text-muted-foreground">
          Pulse tracks the days you turned up{" "}
          <em className="font-medium text-foreground">and</em> how each one
          actually felt — so the pattern you see is the truth, not a streak
          count.
        </p>
      </div>

      <MoodLegend />
    </div>
  );
}

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh">
      <BrandingPanel />

      <div className="flex w-full flex-col items-center justify-center bg-card px-6 py-10 lg:w-1/2">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <PulseLogo />
          </div>

          {children}

          {/* Meta: 12px / 400 */}
          <p className="mt-8 text-center text-[12px] text-muted-foreground">
            By continuing you agree to the{" "}
            <button type="button" className="underline underline-offset-2">
              Terms
            </button>{" "}
            and{" "}
            <button type="button" className="underline underline-offset-2">
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

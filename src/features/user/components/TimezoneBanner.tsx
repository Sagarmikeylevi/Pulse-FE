import { useState } from "react";
import { Globe, X } from "lucide-react";
import { useCheckTimezone, useUpdateTimezone } from "../hooks/use-timezone";
import {
  getTimezoneCityName,
  getTimezoneAbbreviation,
  getTimezoneLongName,
  getOffsetDifference,
  formatMidnightIn,
} from "../utils/timezone";

export function TimezoneBanner() {
  const { data, isLoading } = useCheckTimezone();
  const updateTimezone = useUpdateTimezone();
  const [dismissed, setDismissed] = useState(false);

  if (isLoading || !data || data.match || dismissed) return null;

  const { current, detected } = data;

  const detectedCity = getTimezoneCityName(detected);
  const currentLongName = getTimezoneLongName(current);
  const currentAbbr = getTimezoneAbbreviation(current);
  const midnightFormatted = formatMidnightIn(detected);
  const offsetDiff = getOffsetDifference(current, detected);

  function handleKeep() {
    setDismissed(true);
  }

  function handleSwitch() {
    updateTimezone.mutate(detected, {
      onSuccess: () => setDismissed(true),
    });
  }

  return (
    <div className="flex items-center gap-3.5 rounded-xl border border-border bg-card p-4">
      <Globe className="h-5 w-5 shrink-0 text-muted-foreground" />

      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-[14px] text-foreground">
          <span className="font-medium">
            Looks like you&apos;re in {detectedCity}.
          </span>{" "}
          Your days are still counted in {currentLongName} ({currentAbbr}).
        </p>
        <p className="text-[13.5px] text-muted-foreground">
          Today would start at {midnightFormatted} instead — {offsetDiff}. Days
          you&apos;ve already logged stay where they are.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={handleKeep}
          className="rounded-lg border border-border bg-card px-3.5 py-1.5 text-[13.5px] font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Keep {currentAbbr}
        </button>
        <button
          type="button"
          onClick={handleSwitch}
          disabled={updateTimezone.isPending}
          className="rounded-lg bg-foreground px-3.5 py-1.5 text-[13.5px] font-medium text-card transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {updateTimezone.isPending
            ? "Switching…"
            : `Switch to ${detectedCity}`}
        </button>
      </div>

      <button
        type="button"
        onClick={handleKeep}
        className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

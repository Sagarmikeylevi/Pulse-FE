import {
  useRef,
  useCallback,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  error = false,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value
    .split("")
    .concat(Array(length).fill(""))
    .slice(0, length);

  const focusInput = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, length - 1));
      inputsRef.current[clamped]?.focus();
    },
    [length],
  );

  const handleChange = useCallback(
    (index: number, char: string) => {
      if (!/^\d$/.test(char)) return;

      const next = digits.slice();
      next[index] = char;
      onChange(next.join(""));

      if (index < length - 1) {
        focusInput(index + 1);
      }
    },
    [digits, onChange, length, focusInput],
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const next = digits.slice();
        if (next[index]) {
          next[index] = "";
          onChange(next.join(""));
        } else if (index > 0) {
          next[index - 1] = "";
          onChange(next.join(""));
          focusInput(index - 1);
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusInput(index - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        focusInput(index + 1);
      }
    },
    [digits, onChange, focusInput],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData
        .getData("text/plain")
        .replace(/\D/g, "")
        .slice(0, length);

      if (pasted.length > 0) {
        onChange(pasted.padEnd(length, "").slice(0, length).trimEnd());
        focusInput(Math.min(pasted.length, length - 1));
      }
    },
    [onChange, length, focusInput],
  );

  return (
    <div className="flex gap-2.5">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          autoFocus={i === 0}
          aria-label={`Digit ${i + 1}`}
          className={cn(
            "h-14 w-0 flex-1 rounded-xl border bg-card text-center text-xl font-medium text-foreground outline-none transition-colors focus:border-foreground focus:ring-1 focus:ring-foreground/10",
            error ? "border-destructive" : "border-input",
          )}
          onChange={(e) => handleChange(i, e.target.value.slice(-1))}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}

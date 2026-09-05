import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { OtpInput } from "./OtpInput";

const RESEND_COOLDOWN = 90; // seconds

interface VerifyCodeFormProps {
  email: string;
  onVerify: (code: string) => void;
  onResend: () => void;
  onBack: () => void;
  onChangeEmail: () => void;
  isPending?: boolean;
}

export function VerifyCodeForm({
  email,
  onVerify,
  onResend,
  onBack,
  onChangeEmail,
  isPending = false,
}: VerifyCodeFormProps) {
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = useCallback(() => {
    setCountdown(RESEND_COOLDOWN);
    onResend();
  }, [onResend]);

  const handleVerify = useCallback(() => {
    if (code.length !== 6) return;
    onVerify(code);
  }, [code, onVerify]);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const isComplete = code.replace(/\s/g, "").length === 6;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {/* Secondary text: 13.5px / 400 */}
        <button
          type="button"
          onClick={onBack}
          className="flex w-fit items-center gap-1.5 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        <div className="flex flex-col gap-2">
          {/* Auth H1: 25px / 500, −0.6 tracking */}
          <h1 className="text-[25px] font-medium tracking-[-0.6px] text-foreground">
            Enter your code
          </h1>
          {/* Secondary text: 13.5px / 400 */}
          <p className="text-[13.5px] text-muted-foreground">
            We sent a 6-digit code to
          </p>
          <p className="text-[13.5px]">
            <span className="font-medium text-foreground">{email}</span>
            <span className="text-muted-foreground">{" · "}</span>
            <button
              type="button"
              onClick={onChangeEmail}
              className="font-medium text-foreground underline underline-offset-2"
            >
              Change
            </button>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <OtpInput value={code} onChange={setCode} />

        {/* Secondary text: 13.5px / 400; countdown uses tabular-nums */}
        <div className="flex items-center gap-1.5 text-[13.5px] text-muted-foreground">
          <Clock className="size-3.5" />
          <span>
            Resend code in{" "}
            <span
              className="font-medium text-foreground"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {formatCountdown(countdown)}
            </span>
          </span>
          <span>·</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0}
            className="font-medium transition-colors enabled:text-foreground enabled:hover:underline enabled:underline-offset-2 disabled:text-muted-foreground/50"
          >
            Resend
          </button>
        </div>

        {/* Button: 13.5px / 500 */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={!isComplete || isPending}
          className="flex h-12 items-center justify-center rounded-xl text-[13.5px] font-medium transition-colors enabled:bg-foreground enabled:text-card enabled:hover:bg-foreground/90 disabled:bg-muted disabled:text-muted-foreground"
        >
          Verify and continue
        </button>
      </div>

      {/* Meta: 12px / 400 */}
      <p className="text-center text-[12px] text-muted-foreground">
        Code expires in 10 minutes · paste fills all six boxes
      </p>
    </div>
  );
}

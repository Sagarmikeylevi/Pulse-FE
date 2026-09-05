import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock } from "lucide-react";
import { emailSchema, type EmailFormValues } from "../types";

interface EmailFormProps {
  onSendCode: (email: string) => void;
  onSwitchToPassword: () => void;
  defaultEmail?: string;
  isPending?: boolean;
}

export function EmailForm({
  onSendCode,
  onSwitchToPassword,
  defaultEmail = "",
  isPending = false,
}: EmailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: defaultEmail },
  });

  const onSubmit = (data: EmailFormValues) => {
    onSendCode(data.email);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        {/* Auth H1: 25px / 500, −0.6 tracking */}
        <h1 className="text-[25px] font-medium tracking-[-0.6px] text-foreground">
          Sign in or create an account
        </h1>
        {/* Secondary text: 13.5px / 400 */}
        <p className="text-[13.5px] text-muted-foreground">
          Enter your email — we'll send a 6-digit code. No password required.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {/* Field label: 11px / 500 uppercase, +0.8 tracking */}
          <label
            htmlFor="email"
            className="text-[11px] font-medium uppercase tracking-[0.8px] text-muted-foreground"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            autoFocus
            className="h-12 w-full rounded-xl border border-input bg-card px-4 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground/10"
            placeholder="alex@park.co"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[12px] text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Button: 13.5px / 500 */}
        <button
          type="submit"
          disabled={isPending}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-foreground text-[13.5px] font-medium text-card transition-colors hover:bg-foreground/90 disabled:opacity-50"
        >
          Send code
          <ArrowRight className="size-4" />
        </button>
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        {/* Meta: 12px / 400 */}
        <span className="text-[12px] uppercase tracking-[0.8px] text-muted-foreground">
          Or
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={onSwitchToPassword}
        className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card text-[13.5px] font-medium text-foreground transition-colors hover:bg-secondary"
      >
        <Lock className="size-4" />
        Sign in with a password
      </button>
    </div>
  );
}

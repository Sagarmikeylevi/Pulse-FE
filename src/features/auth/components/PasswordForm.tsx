import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Sparkles } from "lucide-react";
import { passwordSchema, type PasswordFormValues } from "../types";

interface PasswordFormProps {
  onSignIn: (data: PasswordFormValues) => void;
  onSwitchToEmail: () => void;
  defaultEmail?: string;
  isPending?: boolean;
}

export function PasswordForm({
  onSignIn,
  onSwitchToEmail,
  defaultEmail = "",
  isPending = false,
}: PasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { email: defaultEmail, password: "" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        {/* Auth H1: 25px / 500, −0.6 tracking */}
        <h1 className="text-[25px] font-medium tracking-[-0.6px] text-foreground">
          Welcome back
        </h1>
        {/* Secondary text: 13.5px / 400 */}
        <p className="text-[13.5px] text-muted-foreground">
          Sign in with your password, or switch to an email code.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSignIn)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {/* Field label: 11px / 500 uppercase, +0.8 tracking */}
          <label
            htmlFor="pw-email"
            className="text-[11px] font-medium uppercase tracking-[0.8px] text-muted-foreground"
          >
            Email address
          </label>
          <input
            id="pw-email"
            type="email"
            autoComplete="email"
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

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-[11px] font-medium uppercase tracking-[0.8px] text-muted-foreground"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="h-12 w-full rounded-xl border border-input bg-card px-4 pr-11 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground/10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-[12px] text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button: 13.5px / 500 */}
        <button
          type="submit"
          disabled={isPending}
          className="flex h-12 items-center justify-center rounded-xl bg-foreground text-[13.5px] font-medium text-card transition-colors hover:bg-foreground/90 disabled:opacity-50"
        >
          Sign in
        </button>
      </form>

      <button
        type="button"
        onClick={onSwitchToEmail}
        className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card text-[13.5px] font-medium text-foreground transition-colors hover:bg-secondary"
      >
        <Mail className="size-4" />
        Email me a code instead
      </button>

      <div className="flex items-start gap-2.5 rounded-xl bg-muted/60 p-4">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        {/* Secondary text: 13.5px / 400 */}
        <p className="text-[13.5px] leading-[1.45] text-muted-foreground">
          Forgot your password? Sign in with a code — you can reset it from your
          profile.
        </p>
      </div>
    </div>
  );
}

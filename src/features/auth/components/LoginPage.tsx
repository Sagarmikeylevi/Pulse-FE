import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { PasswordFormValues, AuthView } from "../types";
import { useSendOtp, useVerifyOtp, useLogin } from "../hooks/use-auth";
import { AuthLayout } from "./AuthLayout";
import { EmailForm } from "./EmailForm";
import { PasswordForm } from "./PasswordForm";
import { VerifyCodeForm } from "./VerifyCodeForm";

export function LoginPage() {
  const [view, setView] = useState<AuthView>("email");
  const [email, setEmail] = useState("");

  const sendOtp = useSendOtp();
  const verifyOtp = useVerifyOtp();
  const loginMutation = useLogin();

  const handleSendCode = useCallback(
    (emailValue: string) => {
      setEmail(emailValue);
      sendOtp.mutate(emailValue, {
        onSuccess: () => {
          setView("verify");
          toast.success(`Code sent to ${emailValue}`);
        },
      });
    },
    [sendOtp],
  );

  const handlePasswordSignIn = useCallback(
    (data: PasswordFormValues) => {
      setEmail(data.email);
      loginMutation.mutate({ email: data.email, password: data.password });
    },
    [loginMutation],
  );

  const handleVerify = useCallback(
    (code: string) => {
      verifyOtp.mutate({ email, code });
    },
    [email, verifyOtp],
  );

  const handleResend = useCallback(() => {
    sendOtp.mutate(email, {
      onSuccess: () => toast.success(`Code resent to ${email}`),
    });
  }, [email, sendOtp]);

  const goToEmail = useCallback(() => setView("email"), []);
  const goToPassword = useCallback(() => setView("password"), []);

  return (
    <AuthLayout>
      {view === "email" && (
        <EmailForm
          defaultEmail={email}
          onSendCode={handleSendCode}
          onSwitchToPassword={goToPassword}
          isPending={sendOtp.isPending}
        />
      )}

      {view === "password" && (
        <PasswordForm
          defaultEmail={email}
          onSignIn={handlePasswordSignIn}
          onSwitchToEmail={goToEmail}
          isPending={loginMutation.isPending}
        />
      )}

      {view === "verify" && (
        <VerifyCodeForm
          email={email}
          onVerify={handleVerify}
          onResend={handleResend}
          onBack={goToEmail}
          onChangeEmail={goToEmail}
          isPending={verifyOtp.isPending}
        />
      )}
    </AuthLayout>
  );
}

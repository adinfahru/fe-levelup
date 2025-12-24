import { useState, useContext, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/context/auth.context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authAPI } from "@/api/auth.api";

export default function ProfileEmployee() {
  const { user, logout } = useContext(AuthContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState("send");

  const email = user?.email || "";
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  const otpSentRef = useRef(false);

  /* ================= QUERY ================= */

  const {
    data: profileRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth-profile"],
    queryFn: authAPI.getProfile,
    enabled: !!user, // hanya fetch kalau user ada
  });

  const profile = profileRes?.data;

  /* ================= MUTATIONS ================= */

  const requestMutation = useMutation({
    mutationFn: authAPI.requestPasswordReset,
    onSuccess: () => {
      setStep("confirm");
      setCountdown(15 * 60);
    },
    onError: (err) =>
      setError(err.message || "Failed to send OTP"),
  });

  const confirmMutation = useMutation({
    mutationFn: authAPI.confirmPasswordReset,
    onSuccess: () => {
      setIsDialogOpen(false);
      alert("Password changed successfully. Please login again.");
      logout();
    },
    onError: (err) =>
      setError(err.message || "Failed to change password"),
  });

  /* ================= EFFECTS ================= */

  // Countdown OTP
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto-send OTP once dialog opens
  useEffect(() => {
    if (isDialogOpen && !otpSentRef.current) {
      otpSentRef.current = true;
      requestMutation.mutate({ email });
    }
  }, [isDialogOpen, email, requestMutation]);

  /* ================= HANDLERS ================= */

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    confirmMutation.mutate({ email, otp, newPassword });
  };

  /* ================= GUARDS ================= */

  if (!user) return null;
  if (isLoading) return <p className="p-6">Loading profile...</p>;
  if (isError || !profile)
    return <p className="p-6">Failed to load profile</p>;

  /* ================= RENDER ================= */

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Profile
        </h1>
        <p className="text-sm text-gray-600">
          Manage your personal information and security
        </p>
      </div>

      <Card className="overflow-hidden rounded-2xl bg-white border shadow-sm">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* LEFT */}
            <div className="lg:col-span-2 p-6 space-y-6">
              <CardHeader className="p-0">
                <CardTitle className="text-lg">
                  Employee Information
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Account details
                </p>
              </CardHeader>

              <div className="space-y-3">
                <Info label="Name">
                  {profile.employee.firstName}{" "}
                  {profile.employee.lastName}
                </Info>

                <Info label="Email">
                  {profile.account.email}
                </Info>

                <Info label="Role">
                  {profile.account.role}
                </Info>
              </div>

              {/* CHANGE PASSWORD */}
              <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) {
                    setStep("send");
                    setOtp("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setError("");
                    setCountdown(0);
                    otpSentRef.current = false;
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Change Password
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                  </DialogHeader>

                  {step === "send" && (
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-600">
                        OTP will be sent to <b>{email}</b>
                      </p>

                      {error && (
                        <p className="text-red-500">{error}</p>
                      )}

                      <Button
                        className="w-full bg-indigo-600"
                        disabled={requestMutation.isPending}
                      >
                        {requestMutation.isPending
                          ? "Sending OTP..."
                          : "Send OTP"}
                      </Button>
                    </div>
                  )}

                  {step === "confirm" && (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <Field
                        label="OTP"
                        value={otp}
                        onChange={setOtp}
                        placeholder="6-digit OTP"
                      />
                      <Field
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={setNewPassword}
                      />
                      <Field
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                      />

                      {error && (
                        <p className="text-sm text-red-500">
                          {error}
                        </p>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                        disabled={confirmMutation.isPending}
                      >
                        {confirmMutation.isPending
                          ? "Updating..."
                          : "Update Password"}
                      </Button>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            {/* RIGHT VECTOR */}
            <div className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
              <div className="absolute h-64 w-64 rounded-full bg-indigo-600/10" />
              <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full bg-indigo-600/20" />
              <div className="relative text-indigo-900/70 font-semibold text-sm">
                Account Security
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Info({ label, children }) {
  return (
    <div className="rounded-lg bg-gray-50 px-4 py-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{children}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}

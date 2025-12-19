import { useState, useContext, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '@/context/auth.context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { authAPI } from '@/api/auth.api';

export default function ProfileManager() {
  const { user, logout } = useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState('send'); // 'send' or 'confirm'
  const [email] = useState(user?.email || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const otpSentRef = useRef(false);

  const requestMutation = useMutation({
    mutationFn: authAPI.requestPasswordReset,
    onSuccess: () => {
      setStep('confirm');
      setCountdown(15 * 60);
    },
    onError: (err) => {
      setError(err.message || 'Failed to send OTP. Please check your connection and try again.');
    },
  });

  const confirmMutation = useMutation({
    mutationFn: authAPI.confirmPasswordReset,
    onSuccess: () => {
      setIsDialogOpen(false);
      alert('Password changed successfully. You will be logged out.');
      logout();
    },
    onError: (err) => {
      setError(err.message || 'Failed to change password');
    },
  });

  // Countdown timer for OTP expiry
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Automatically send OTP when dialog opens
  useEffect(() => {
    if (isDialogOpen && !otpSentRef.current) {
      otpSentRef.current = true;
      requestMutation.mutate({ email });
    }
  }, [isDialogOpen, requestMutation, email]);

  const handleConfirmPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    confirmMutation.mutate({ email, otp, newPassword });
  };

  const resetDialog = () => {
    setStep('send');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setCountdown(0);
    otpSentRef.current = false;
  };

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div className="w-full p-6 space-y-6">
      <h2 className="text-xl font-semibold">Profile</h2>

      <Card>
        <CardHeader>
          <CardTitle>Manager Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <p className="text-gray-700">
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div>
            <Label>Email</Label>
            <p className="text-gray-700">{user.email}</p>
          </div>
          <div>
            <Label>Role</Label>
            <p className="text-gray-700">{user.role}</p>
          </div>

          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetDialog();
            }}
          >
            <DialogTrigger asChild>
              <Button className="mt-4">Change Password</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>

              {step === 'send' && (
                <div className="space-y-4">
                  {requestMutation.isPending && <p>Sending OTP...</p>}
                  {requestMutation.error && !requestMutation.isPending && (
                    <>
                      <p className="text-red-500 text-sm">
                        {requestMutation.error.message || 'Failed to send OTP'}
                      </p>
                      <Button
                        onClick={() => requestMutation.mutate({ email })}
                        disabled={requestMutation.isPending}
                      >
                        Retry Send OTP
                      </Button>
                    </>
                  )}
                </div>
              )}

              {step === 'confirm' && (
                <form onSubmit={handleConfirmPassword} className="space-y-4">
                  <div>
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      required
                      maxLength={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      required
                      minLength={8}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  {countdown > 0 && (
                    <p className="text-sm text-gray-600">
                      OTP expires in {Math.floor(countdown / 60)}:
                      {(countdown % 60).toString().padStart(2, '0')}
                    </p>
                  )}
                  {(error || confirmMutation.error) && (
                    <p className="text-red-500 text-sm">{error || confirmMutation.error.message}</p>
                  )}
                  <Button type="submit" disabled={confirmMutation.isPending}>
                    {confirmMutation.isPending ? 'Changing...' : 'Change Password'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => requestMutation.mutate({ email })}
                    disabled={requestMutation.isPending || countdown > 0}
                    className="mt-2"
                  >
                    {requestMutation.isPending ? 'Resending...' : 'Resend OTP'}
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

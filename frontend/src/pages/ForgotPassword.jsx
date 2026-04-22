import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError(null);
    return true;
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const MailIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decors */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <Link to="/" className="flex justify-center items-center gap-2 mb-8 group">
           <div className="w-12 h-12 rounded-xl bg-[#FFD700] flex items-center justify-center text-black font-extrabold text-2xl shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            D
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white font-display tracking-tight">
          Reset password
        </h2>
        <p className="mt-2 text-center text-sm text-[#888888]">
          Remember your password?{' '}
          <Link to="/login" className="font-medium text-[#FFD700] hover:text-[#FFE033] transition-colors">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 animate-fade-in-up">
        <Card className="shadow-2xl">
          {isSuccess ? (
            <div className="text-center py-4">
               <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
               </div>
               <h3 className="text-white text-xl font-medium font-display mb-2">Check your email</h3>
               <p className="text-[#888888] text-sm mb-6">
                 We sent a password reset link to <span className="text-white font-medium">{email}</span>
               </p>
               <Button onClick={() => setIsSuccess(false)} variant="outline" className="w-full">
                 Try another email
               </Button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleReset} noValidate>
              <Input
                id="email"
                name="email"
                type="email"
                label="Email address"
                icon={MailIcon}
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                error={error}
                helperText="We'll send you an email with a link to reset your password."
                autoComplete="email"
              />

              <div>
                <Button type="submit" variant="primary" className="w-full text-base py-3" isLoading={isLoading}>
                  Send reset link
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;

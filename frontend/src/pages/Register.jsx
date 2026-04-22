import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name is too short';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigate('/dashboard');
      }, 1500);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const UserIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  const MailIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
  const LockIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
         {/* Background decors */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <Link to="/" className="flex justify-center items-center gap-2 mb-8 group">
           <div className="w-12 h-12 rounded-xl bg-[#FFD700] flex items-center justify-center text-black font-extrabold text-2xl shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            D
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white font-display tracking-tight">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-[#888888]">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#FFD700] hover:text-[#FFE033] transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 animate-fade-in-up">
        <Card className="shadow-2xl">
          <form className="space-y-6" onSubmit={handleRegister} noValidate>
             <Input
                id="name"
                name="name"
                type="text"
                label="Full Name"
                icon={UserIcon}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="name"
              />

             <Input
                id="email"
                name="email"
                type="email"
                label="Email address"
                icon={MailIcon}
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
              />

             <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                icon={LockIcon}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                helperText="Must be at least 8 characters long."
                autoComplete="new-password"
              />

            <div>
              <Button type="submit" variant="primary" className="w-full text-base py-3" isLoading={isLoading}>
                Create account
              </Button>
            </div>
            
            <p className="text-xs text-center text-[#666666]">
                By creating an account, you agree to our <a href="#" className="underline hover:text-[#888888]">Terms of Service</a> and <a href="#" className="underline hover:text-[#888888]">Privacy Policy</a>.
            </p>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#333333]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#111111] px-2 text-[#888888]">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="text-white border-[#333333] hover:border-[#FFD700] hover:bg-transparent p-0 py-2 items-center justify-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
                Google
              </Button>
              <Button variant="outline" className="text-white border-[#333333] hover:border-[#FFD700] hover:bg-transparent p-0 py-2 items-center justify-center">
                 <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                 GitHub
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;

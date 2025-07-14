import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import CardHover from '@/components/ui/card-hover';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const { signIn, signUp, user, userRole, loading } = useAuth(); // Added userRole and loading here
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

    // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [loading, user, userRole, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        await signUp(formData.email, formData.password, formData.name);
      } else {
        const { error, role } = await signIn(formData.email, formData.password);
        if (!error && role) {
          navigate(role === 'admin' ? '/admin' : '/');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setFormLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Google auth error:', error);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-warm-cream">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-playfair text-xl font-bold spice-text">
              Spice Garden
            </span>
          </Link>
          <h1 className="text-3xl font-playfair font-bold text-foreground mb-2">
            {isLogin ? 'Welcome Back' : 'Join Our Family'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Create an account to start ordering'}
          </p>
        </div>

        {/* Auth Form */}
        <CardHover title="" gradient>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    placeholder="Enter your full name"
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                    placeholder="Confirm your password"
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <Link
                  to="/forgot-password"
                  className="text-primary hover:text-primary/80 transition-smooth"
                >
                  Forgot your password?
                </Link>
              </div>
            )}

              <Button type="submit" className="w-full" size="lg" disabled={formLoading}>
                {formLoading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
          </form>

          <div className="mt-6">
            <Separator className="mb-6" />
            
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={handleGoogleAuth}
              disabled={formLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-primary hover:text-primary/80 transition-smooth font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-primary hover:text-primary/80 transition-smooth font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </CardHover>

        {/* Admin Link */}
        <div className="mt-8 text-center">
          <Link
            to="/admin"
            className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            Restaurant Staff? Access Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

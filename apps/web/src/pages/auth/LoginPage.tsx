import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FadeIn } from "@/components/animations/ScrollAnimations";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    // TODO: wire to auth API
    console.log("login", data);
  };

  const handleGoogleLogin = () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <section className="mx-auto flex max-w-md flex-col gap-6 px-6 py-12">
      <FadeIn delay={0.1} className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Welcome back</p>
        <h1 className="text-3xl font-semibold text-slate-900">Login</h1>
        <p className="text-slate-500">Secure JWT auth with email verification and Google OAuth.</p>
      </FadeIn>
      
      <FadeIn delay={0.2}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
              {...register("email")}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
              {...register("password")}
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          
          <AnimatedButton type="submit" variant="primary" className="w-full">
            Sign in
          </AnimatedButton>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <AnimatedButton
            type="button" 
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </AnimatedButton>
        </form>
      </FadeIn>
    </section>
  );
};

export default LoginPage;


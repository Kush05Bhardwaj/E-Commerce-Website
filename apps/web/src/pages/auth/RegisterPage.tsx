import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FadeIn } from "@/components/animations/ScrollAnimations";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data: RegisterForm) => {
    console.log("register", data);
  };

  return (
    <section className="mx-auto flex max-w-md flex-col gap-6 px-6 py-12">
      <FadeIn delay={0.1} className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Join us</p>
        <h1 className="text-3xl font-semibold text-slate-900">Create account</h1>
        <p className="text-slate-500">Email verification + OTP reset flows will integrate here.</p>
      </FadeIn>
      
      <FadeIn delay={0.2}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div>
            <label className="text-sm font-medium text-slate-700">Name</label>
            <input 
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none" 
              {...register("name")} 
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input 
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
          <div>
            <label className="text-sm font-medium text-slate-700">Confirm password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>
          
          <AnimatedButton type="submit" variant="primary" className="w-full">
            Sign up
          </AnimatedButton>
        </form>
      </FadeIn>
    </section>
  );
};

export default RegisterPage;


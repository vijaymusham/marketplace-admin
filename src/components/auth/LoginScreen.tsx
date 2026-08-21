"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { DEFAULT_NAV_HREF } from "@/lib/nav";
import GlowButton from "../ui/GlowButton";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/apis";
import { setUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

type LoginValues = {
    email: string;
    password: string;
};

export const fieldClass =
    "h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-base font-semibold text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-primary/50 focus:ring-3 focus:ring-primary/15";


export default function LoginScreen() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginValues>({
        defaultValues: { email: "", password: "" },
    });

    const onMutate = useMutation({
        mutationFn: login,
        mutationKey: ["login"],
        onSuccess: (data) => {
            localStorage.setItem("token", data.accessToken);
            dispatch(setUser(data?.user));
            toast.success("Login successful");
            router.push(DEFAULT_NAV_HREF);
        },
        onError: (error) => {
            console.log("Login failed", error);
            toast.error("Failed to login");
        },
    });

    const onSubmit = async (data: LoginValues) => {
        await onMutate.mutateAsync(data);
    };

    return (
        <main className="relative flex h-full min-h-0 w-full overflow-hidden bg-linear-to-b from-[#DCD4FF] via-[#EFEAFF] to-white text-[#1A1D27]">
            <section className="relative z-10 m-auto w-full max-w-md px-5 py-10">
                <div className="rounded-[1.75rem] border border-white/80 bg-white px-8 pt-8 pb-9 shadow-[0_28px_80px_rgba(110,86,245,0.12)]">
                    <p className="text-2xl font-black text-center tracking-tight text-black">
                        Deal Pokket
                    </p>

                    <h1 className="mt-3 text-2xl font-bold text-center tracking-tight text-slate-700">
                        Sign in to your account
                    </h1>
                    <p className="mt-2 max-w-88 text-center text-[13px] leading-5 font-medium text-[#8B95A5]">
                        Welcome back! Please enter your details. You&apos;ll be redirected to your dashboard.
                    </p>

                    <form
                        className="mt-7 space-y-3.5"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label className="block">
                            <span className="sr-only">Email</span>
                            <input
                                type="email"
                                autoComplete="username"
                                placeholder="Enter Your Email"
                                className={fieldClass}
                                aria-invalid={Boolean(errors.email)}
                                {...register("email", {
                                    required: "Enter your email",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email",
                                    },
                                })}
                            />
                        </label>
                        {errors.email ? (
                            <p className="pl-0.5 text-[12px] font-semibold text-[#E35D5D]">
                                {errors.email.message}
                            </p>
                        ) : null}

                        <label className="relative block">
                            <span className="sr-only">Password</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Enter Your Password"
                                className={`${fieldClass} pr-11`}
                                aria-invalid={Boolean(errors.password)}
                                {...register("password", {
                                    required: "Enter your password",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 8 characters",
                                    },
                                })}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-[#9CA3AF] transition hover:text-[#4B5563]"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword((open) => !open)}
                            >
                                {showPassword ? (
                                    <Eye size={16} strokeWidth={1.9} />
                                ) : (
                                    <EyeOff size={16} strokeWidth={1.9} />
                                )}
                            </button>
                        </label>
                        {errors.password ? (
                            <p className="pl-0.5 text-[12px] font-semibold text-[#E35D5D]">
                                {errors.password.message}
                            </p>
                        ) : null}

                        <div className="flex justify-end pt-0.5 pb-1">
                            <button
                                type="button"
                                className="cursor-pointer text-[13px] font-semibold text-[#111111] underline underline-offset-2 transition hover:text-primary"
                                onClick={() => toast("Password reset is coming soon")}
                            >
                                Forgot password?
                            </button>
                        </div>

                        <GlowButton
                            type="submit"
                            size="lg"
                            fullWidth
                            disabled={isSubmitting}
                            className="min-h-12! rounded-xl!"
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </GlowButton>
                    </form>
                </div>
            </section>
        </main>
    );
}

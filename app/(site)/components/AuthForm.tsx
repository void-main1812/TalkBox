"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/app/components/inputs/Input";
import Button from "@/app/components/button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";
export const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      // confirmPassword: "",         //this field is optional only for register
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged In Successfully");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", data);
          toast.success("Registered Successfully");
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Something went wrong");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged In Successfully");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              errors={errors}
              label="Enter your Name"
              type="text"
              placeholder="John Doe"
              required={true}
              register={register}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            errors={errors}
            label="Enter your Emaiil"
            required={true}
            type="email"
            placeholder="jhon@gmail.com"
            register={register}
            disabled={isLoading}
          />
          <Input
            id="password"
            errors={errors}
            label="Enter your Password"
            type="password"
            required={true}
            placeholder="ajlihj@123"
            register={register}
            disabled={isLoading}
          />
          {/* {variant === "REGISTER" && (    //this field is optional only for register
            <Input
              id="confirmPassword"
              errors={errors}
              label="Confirm your Password"
              type="password"
              required={true}
              placeholder="ajlihj@123"
              register={register}
              disabled={isLoading}
            />
          )} */}
          <Button fullWidth type="submit" disabled={isLoading}>
            {variant === "LOGIN" ? "Login" : "Sign Up"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="sm:bg-white bg-gray-100 px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          {/* Social Login Buttons */}
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "Don't have an account?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an Account" : "Login"}
          </div>
        </div>
      </div>
    </>
  );
};

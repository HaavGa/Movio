"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "/public/logos/movio-red.png";

const Register = () => {
  const router = useRouter();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof RegisterValidation>>({
    resolver: zodResolver(RegisterValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof RegisterValidation>
  ) => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      ...values,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      return toast({
        variant: "destructive",
        title: "Sign up failed! Please try again",
        description: error.message,
      });
    }
    if (!error) {
      router.push("/verify");
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Form {...form}>
        <div className="flex flex-col items-center sm:w-[420px]">
          <div className="w-40 lg:w-64">
            <Image src={Logo} alt="logo" />
          </div>
          <h2 className="pt-5 text-2xl font-semibold md:text-2xl lg:text-3xl">
            Create a new account
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            To favorite and add movies to your <br /> watchlist,
            please enter your details
          </p>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 flex w-full flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={"lg"}
              className="mt-5 bg-primary"
            >
              {/* {isCreatingAccount ? (
                <div className="flex items-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : (
                "Sign Up"
              )} */}
              Register
            </Button>
            <p className="mt-2 text-center">
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="ml-1 font-semibold text-primary hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};
export default Register;

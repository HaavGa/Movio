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
import { LoginValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useToast } from "@/components/ui/use-toast";
// import { useUserContext } from "@/context/AuthContext";
// import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "/public/logos/movio-red.png";

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  // const { checkAuthUser, isLoading: isUserLoading } =
  //   useUserContext();

  // const { mutateAsync: signInAccount } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof LoginValidation>
  ) => {
    // const session = await signInAccount({
    //   email: values.email,
    //   password: values.password,
    // });

    // if (!session)
    //   return toast({
    //     title: "Sign up failed! Please try again",
    //   });

    // const isLoggedIn = await checkAuthUser();

    // if (isLoggedIn) {
    //   form.reset();
    //   router.push("/");
    // } else {
    //   return toast({ title: "Sign in failed! Please try again" });
    // }
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      ...values,
    });
    window.location.href = "/";

    if (error) {
      return toast({
        variant: "destructive",
        title: "Log in failed! Please try again",
        description: error.message,
      });
    }
    if (!error) {
      router.push("/");
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
            Login to your account
          </h2>
          <p className="mt-2 text-base text-muted-foreground md:text-sm">
            Welcome back! Please enter your details
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
            <Button
              type="submit"
              size={"lg"}
              className="mt-5 bg-primary"
            >
              {/* {isUserLoading ? (
              <div className="flex items-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign In"
            )} */}
              Login
            </Button>
            <p className="mt-2 text-center">
              Don&apos;t have an account?{" "}
              <Link
                href={"/register"}
                className="ml-1 font-semibold text-primary hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};
export default Login;

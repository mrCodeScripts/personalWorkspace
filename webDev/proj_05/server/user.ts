import { auth } from "@/lib/auth";
export const signIn = async () => {
  await auth.api.signInEmail({
    body: {
      email: "kqlyshock@email.com",
      password: "webdevprogrammer4192007124989120009",
    },
  });
};

export const signUp = async () => {
  await auth.api.signUpEmail({
    body: {
      email: "kqlyshock@gmail.com",
      password: "webdevprogrammer4192007124989120009",
      name: "John Doe",
    },
  });
}
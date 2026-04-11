import { z } from "zod";
// ==============================================
//            TYPE NARROWING & GUARDS
// ==============================================
// -> What it is:
// -> Instead of writing a Zod schema AND a TypeScript type
// separately (which can get out of sync), you write the
// schema ONCE and let TypeScript infer the type from it.
// This is how every modern Next.js app is built.

// Without Zod Inference (the bad way - duplicate work):
// You write the type manually
interface LoginForm {
  email: string;
  password: string;
}

// Then write the scema separately
const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
// If you change one, you have to remember to change the other (wrong).

// With Zod inference (the pro way - single source of truth):
// You write the schema once
const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

// Infer the type FROM the schema automatically
type RegisterForm = z.infer<typeof registerSchema>;
// LoginForm = {email: string; password: string}
// If you change the schema, the type automatically updates (right).

// Real Next.js form example with React Hook Form + Zod.
const someRegisterSchema = z
  .object({
    name: z.string().min(2, "Name too short"),
    email: z.email("Invalid email!"),
    password: z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string().min(8, "Min 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormType = z.infer<typeof someRegisterSchema>;

/*
function RegisterPage() {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    // data is fully typed and already validated ✅
    console.log(data.name, data.email);
  };
}
*/

// Zod for API response validation (critical for real apps):
const productSchema = z.object({
  name: z.string(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  category: z.enum(["Electronics", "Clothing", "Books"]),
});

const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
 
// Safe API call - validations the response matches your schema
export async function getProducts(): Promise<Product[]> {
  const res = await fetch('/api/api-2/products');
  const data = await res.json();
  return productsSchema.parse(data);
}

export function validateUsername(username: string): {valid: boolean; reason: string} {
  // Trim to remove accidental leading/trailing spaces
  username = username.trim();

  // 1. Required
  if (!username.length) {
    return { valid: false, reason: "Username is required. Please enter a username." };
  }

  // 2. Length
  if (username.length < 3) {
    return { valid: false, reason: "Username must be at least 3 characters long." };
  }

  if (username.length > 20) {
    return { valid: false, reason: "Username must not exceed 20 characters long." };
  }

  // 3. Allowed characters
  if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
    return { valid: false, reason: "Only letters, numbers, _ and . are allowed." };
  }

  // 4a. Cannot start or end with special character _ or .
  if (/^[_\.]|[_\.]$/.test(username)) {
    return { valid: false, reason: "Username cannot start or end with a special character." };
  }

  // 4b. Cannot contain consecutive dots
  if (/\.\./.test(username)) {
    return { valid: false, reason: "Username cannot contain consecutive dots." };
  }

  return { valid: true, reason: "Valid username." };
}

export function validateEmail(email: string): {valid: boolean; reason: string} {
  email = email.trim();

  // 1. Required
  if (!email.length) {
    return { valid: false, reason: "Email address is required. Please enter your email." };
  }

  // 2. Length
  if (email.length < 5) { // example minimal reasonable length
    return { valid: false, reason: "Email address is too short." };
  }

  if (email.length > 254) { // standard max length for email
    return { valid: false, reason: "Email address is too long." };
  }

  // 3. Format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, reason: "Invalid email address. Please enter a valid email format (example@domain.com)." };
  }

  // 4. Domain check (block disposable emails example)
  const blockedDomains = ["tempmail.com", "10minutemail.com", "mailinator.com"];
  const domain = email.split("@")[1].toLowerCase();
  if (blockedDomains.includes(domain)) {
    return { valid: false, reason: "Email domain is not supported. Disposable email addresses are not allowed." };
  }

  return { valid: true, reason: "Valid email address." };
}

export function validatePhone(phone: string): {valid: boolean; reason: string} {
  phone = phone.trim();

  // 1. Required
  if (!phone.length) {
    return { valid: false, reason: "Phone number is required. Please enter your mobile number." };
  }

  // 2. Characters only digits
  if (!/^\d+$/.test(phone)) {
    return { valid: false, reason: "Phone number must contain only digits. Special characters are not allowed." };
  }

  // 3. Length check
  if (phone.length < 10) {
    return { valid: false, reason: "Phone number is too short. Must be 10–15 digits." };
  }

  if (phone.length > 15) {
    return { valid: false, reason: "Phone number is too long. Must be 10–15 digits." };
  }

  // 4. Optional: check for country code (starts with + or 0 for local)
  // Example: enforce starting with country code + or just digits
  if (!/^(\+?\d{1,3})?\d{10,12}$/.test(phone)) {
    return { valid: false, reason: "Invalid phone number format. Country code may be missing." };
  }

  return { valid: true, reason: "Valid phone number." };
}

export function validateEmailOrPhone(input: string): {valid: boolean; reason: string} {
  input = input.trim();

  // Detect email
  if (input.includes("@")) {
    return validateEmail(input);
  }

  // Detect phone (digits only, optional leading +)
  if (/^\+?\d+$/.test(input.replace(/\s+/g, ''))) {
    return validatePhone(input);
  }

  // Fallback if neither (could be invalid username or random string)
  return { valid: false, reason: "Please enter a valid email address or phone number." };
}

interface PasswordOptions {
  username?: string;
  personalInfo?: string[];
  confirmPassword?: string;
}

interface ValidationResult {
  valid: boolean;
  reason: string;
}

export function validatePassword(
  password: string,
  options: PasswordOptions = {}
): ValidationResult {
  const username = options.username ?? "";
  const personalInfo = options.personalInfo ?? [];
  const confirmPassword = options.confirmPassword;

  password = password.trim();

  // 1. Required
  if (!password.length) {
    return { valid: false, reason: "Password is required. Please create a password." };
  }

  // 2. Length
  if (password.length < 8) {
    return { valid: false, reason: "Password must be at least 8 characters." };
  }
  if (password.length > 64) {
    return { valid: false, reason: "Password must not exceed 64 characters." };
  }

  // 3. Strength
  if (!/[A-Z]/.test(password)) {
    return { valid: false, reason: "Password must contain at least one uppercase letter." };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, reason: "Password must contain at least one lowercase letter." };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, reason: "Password must contain at least one number." };
  }
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]/.test(password)) {
    return { valid: false, reason: "Password must contain at least one special character." };
  }

  // 4. Common / Weak (basic check for extremely common passwords)
  const weakPasswords = ["password", "12345678", "qwerty", "letmein", "admin"];
  if (weakPasswords.includes(password.toLowerCase())) {
    return { valid: false, reason: "Password is too weak or commonly used." };
  }

  // 5. Security
  if (username && password.toLowerCase().includes(username.toLowerCase())) {
    return { valid: false, reason: "Password cannot contain your username." };
  }
  for (const info of personalInfo) {
    if (info && password.toLowerCase().includes(info.toLowerCase())) {
      return { valid: false, reason: "Password cannot contain personal information." };
    }
  }

  // 6. Format
  if (/\s/.test(password)) {
    return { valid: false, reason: "Spaces are not allowed in password." };
  }
  // Optionally reject any characters outside common printable ASCII
  if (!/^[\x20-\x7E]+$/.test(password)) {
    return { valid: false, reason: "Password contains invalid characters." };
  }

  // 7. Confirm password check
  if (typeof confirmPassword !== "undefined") {
    if (!confirmPassword.length) {
      return { valid: false, reason: "Please confirm your password." };
    }
    if (password !== confirmPassword) {
      return { valid: false, reason: "Passwords do not match." };
    }
  }

  return { valid: true, reason: "Valid password." };
}

export interface FormValidationResult {
  username: { valid: boolean; reason: string };
  phoneOrEmail: { valid: boolean; reason: string };
  createPassword: { valid: boolean; reason: string; weakUsername?: boolean };
  confirmPassword: { valid: boolean; reason: string };
  hasError: boolean
}

export function validateFormFields(params: {
  username: string;
  emailOrPhone: string;
  createPassword: string;
  confirmPassword: string;
  personalInfo?: string[];
}): FormValidationResult {
  const { username, emailOrPhone, createPassword, confirmPassword, personalInfo = [] } = params;

  // 1️⃣ Validate username
  const usernameResult = validateUsername(username);

  // 2️⃣ Validate email or phone
  const phoneOrEmailResult = validateEmailOrPhone(emailOrPhone);

  // 3️⃣ Validate password
  const passwordResult = validatePassword(createPassword, {
    username,
    personalInfo,
    confirmPassword,
  });

  // Add weakUsername flag if password contains username (even if it’s valid)
  const weakUsername = username.length > 0 && createPassword.toLowerCase().includes(username.toLowerCase());

  // 4️⃣ Confirm password separate message
  let confirmPasswordResult = { valid: true, reason: "Passwords match." };
  if (!confirmPassword.length) {
    confirmPasswordResult = { valid: false, reason: "Please confirm your password." };
  } else if (createPassword !== confirmPassword) {
    confirmPasswordResult = { valid: false, reason: "Passwords do not match." };
  }

  // 5️⃣ Determine if any field has an error
  const hasError =
    !usernameResult.valid ||
    !phoneOrEmailResult.valid ||
    !passwordResult.valid ||
    !confirmPasswordResult.valid;

  return {
    username: usernameResult,
    phoneOrEmail: phoneOrEmailResult,
    createPassword: { ...passwordResult, weakUsername },
    confirmPassword: confirmPasswordResult,
    hasError,
  };
}

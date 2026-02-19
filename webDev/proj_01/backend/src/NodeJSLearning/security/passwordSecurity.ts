import bcrypt from "bcryptjs";
import * as argon2 from 'argon2';

async function PasswordSecurityExample1() {
  const SALT_PASSWORD = 12;
  const MANUAL_SALT = await bcrypt.genSalt(13); // you can also create salt manually

  const hashPassword = async (password: string, salt: number) => {
    const hashedPwd = await bcrypt.hash(password, salt);
    return hashedPwd;
  };

  const comparePassword: (
    password: string,
    hashPassword: string,
  ) => Promise<boolean> = async (password: string, hashPassword: string) => {
    const comparison: boolean = await bcrypt.compare(password, hashPassword);
    return comparison;
  };

  const originalPassword = "12345987234";
  const hashPwd = await hashPassword(originalPassword, 12);
  console.log(
    `BYCRIPTED PASSWORD: ${hashPwd}, ORIGINAL PASSWORD: ${originalPassword}`,
  );

  const pwdComparison = await comparePassword(originalPassword, hashPwd);
  console.log(
    `BYCRIPTED PASSWORD: ${hashPwd}, ORIGINAL PASSWORD: ${originalPassword}, MATCHED: ${pwdComparison ? "TRUE" : "FALSE"}`,
  );

  const argonHash: (password: string, salt: number) => Promise<string> = async (password: string) => {
    const hash = await argon2.hash(password);
    return hash;
  };

  const argonComparison: (password: string, hashedPassword: string) => Promise<boolean> = async (password: string, hashedPassword: string) => {
    const comparisonResult: boolean = await argon2.verify(hashedPassword, password);
    return comparisonResult;
  };

  const hashThisPasswordArgon = "12345";
  const hashedPwdArgon: string = await argonHash(hashThisPasswordArgon, 12);
  const comparisonPwdArgon: boolean = await argonComparison(hashThisPasswordArgon, hashedPwdArgon);
  console.log(`ORIGINAL PASSWORD: ${hashThisPasswordArgon}, HASHSED PASSWORD: ${hashedPwdArgon}, MATCHED: ${comparisonPwdArgon ? 'TRUE':'FALSE'}`);
}

export default function PasswordSecurityLessons() {
  PasswordSecurityExample1();
}


/***
====================================================
 PASSWORD SECURITY RULES & BEST PRACTICES
 For Modern Web Applications (Node.js / Web / APIs)
====================================================

PURPOSE:
This document defines the standard rules for handling
user passwords securely in production systems.

Failure to follow these rules can lead to:
- Data breaches
- Account takeovers
- Legal issues
- Loss of user trust


----------------------------------------------------
1. NEVER STORE PLAIN-TEXT PASSWORDS
----------------------------------------------------
❌ WRONG:
- Saving passwords directly in database
- Logging passwords in console
- Sending passwords in emails

✅ CORRECT:
- Always hash passwords before storing
- Only store the hashed value

Example:
User password: "mypassword123"
Stored value: "$argon2id$v=19$..."


----------------------------------------------------
2. ALWAYS USE STRONG HASHING ALGORITHMS
----------------------------------------------------
Use ONLY password-specific hashing algorithms:

✅ Recommended:
- Argon2 (Preferred)
- bcrypt
- scrypt

❌ Never Use:
- MD5
- SHA1
- SHA256 alone
- Base64
- Encryption (AES, RSA) for passwords

Reason:
General hashes are fast → easy to crack.
Password hashes are slow → hard to crack.


----------------------------------------------------
3. ALWAYS USE SALTING (AUTOMATIC OR MANUAL)
----------------------------------------------------
Salt = random data added to password before hashing.

Purpose:
- Prevent rainbow table attacks
- Ensure same passwords ≠ same hashes

Rule:
- Let bcrypt/argon2 manage salt automatically
- Do NOT reuse salts manually

Example:
"password123" + random salt → unique hash


----------------------------------------------------
4. USE A STRONG COST / WORK FACTOR
----------------------------------------------------
Hashing must be slow by design.

Recommended:
- bcrypt rounds: 10–14 (12 is standard)
- Argon2: default or higher memory cost

Purpose:
- Slow down brute-force attacks
- Protect against GPU cracking


----------------------------------------------------
5. NEVER DECRYPT PASSWORDS
----------------------------------------------------
Passwords must be ONE-WAY only.

Rules:
- No decryption
- No reverse functions
- No "forgot password" recovery

Only allowed:
- Reset password
- Verify password


----------------------------------------------------
6. ALWAYS VERIFY USING HASH COMPARISON
----------------------------------------------------
❌ WRONG:
Compare plain text with stored text

✅ CORRECT:
Re-hash input and compare securely

Use:
- bcrypt.compare()
- argon2.verify()

Never write your own comparison logic.


----------------------------------------------------
7. ENFORCE PASSWORD STRENGTH RULES
----------------------------------------------------
Minimum Requirements:
- Length ≥ 8 characters (12+ recommended)
- At least:
  - 1 uppercase
  - 1 lowercase
  - 1 number
  - 1 symbol

Reject:
- "123456"
- "password"
- "qwerty"
- "admin123"

Optional:
- Use password strength libraries


----------------------------------------------------
8. PROTECT LOGIN SYSTEM FROM ATTACKS
----------------------------------------------------
Always implement:

✅ Rate Limiting
- Limit login attempts

✅ Account Lockout
- Lock after X failures

✅ CAPTCHA (Optional)
- Prevent bots

Purpose:
- Stop brute force
- Stop credential stuffing


----------------------------------------------------
9. SECURE PASSWORD TRANSMISSION
----------------------------------------------------
Passwords must only be sent over HTTPS.

❌ NEVER:
- Allow HTTP login
- Log request bodies
- Store in cookies

✅ ALWAYS:
- Use TLS/SSL
- Secure headers


----------------------------------------------------
10. IMPLEMENT SAFE PASSWORD RESET
----------------------------------------------------
Never send passwords via email.

Correct Flow:
1. User requests reset
2. Generate random token
3. Store hashed token
4. Send reset link
5. Expire after short time

Token lifetime: 10–30 minutes


----------------------------------------------------
11. DO NOT REVEAL AUTHENTICATION DETAILS
----------------------------------------------------
Login error messages must be generic.

❌ WRONG:
"User does not exist"
"Wrong password"

✅ CORRECT:
"Invalid credentials"

Reason:
Prevents user enumeration attacks


----------------------------------------------------
12. STORE HASHES SECURELY
----------------------------------------------------
Database Rules:
- Restrict access
- Encrypt backups
- Limit admin permissions

Never expose:
- Password hashes
- Auth tables
- Logs


----------------------------------------------------
13. USE MULTI-FACTOR AUTHENTICATION (OPTIONAL)
----------------------------------------------------
For high-security systems:

Implement:
- SMS OTP
- Email OTP
- Authenticator apps

MFA = second layer after password


----------------------------------------------------
14. REGULARLY UPDATE SECURITY SETTINGS
----------------------------------------------------
Security is not "set once".

Review:
- Hashing cost
- Algorithms
- Libraries
- Policies

Upgrade when standards change.


----------------------------------------------------
15. NEVER WRITE CUSTOM CRYPTO
----------------------------------------------------
Rule:
DO NOT invent your own hashing system.

Always use:
- Trusted libraries
- Audited packages

Custom crypto = guaranteed failure


----------------------------------------------------
STANDARD AUTHENTICATION FLOW
----------------------------------------------------

REGISTER:
User → Password → Hash → Store

LOGIN:
User → Password → Verify → Token/Session

RESET:
Request → Token → Verify → New Hash


----------------------------------------------------
RECOMMENDED STACK (NODE.JS)
----------------------------------------------------
Hashing:
- argon2
- bcryptjs

Auth:
- jsonwebtoken
- express-session

Protection:
- express-rate-limit
- helmet


----------------------------------------------------
FINAL RULE
----------------------------------------------------
If passwords leak, the system failed.

Security > Convenience
Security > Speed
Security > Simplicity

No exceptions.

====================================================
 END OF PASSWORD SECURITY DOCUMENT
====================================================
***/



import bcrypt from "bcryptjs";
import { argon2id } from "argon2";

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

  const argon2dHash = async (password: string) => {
    return await argon2id.hash(password);
  };
  console.log(`ARGON2D PASSWORD: ${argon2dHash(originalPassword)}`);
}

export default function PasswordSecurityLessons() {
  PasswordSecurityExample1();
}

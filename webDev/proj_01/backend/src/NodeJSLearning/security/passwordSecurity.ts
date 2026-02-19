import bcrypt from "bcryptjs";
import * as argon2 from "argon2";
import zxcvbn from "zxcvbn";

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

  const argonHash: (password: string, salt: number) => Promise<string> = async (
    password: string,
  ) => {
    const hash = await argon2.hash(password);
    return hash;
  };

  const argonComparison: (
    password: string,
    hashedPassword: string,
  ) => Promise<boolean> = async (password: string, hashedPassword: string) => {
    const comparisonResult: boolean = await argon2.verify(
      hashedPassword,
      password,
    );
    return comparisonResult;
  };

  const hashThisPasswordArgon = "12345";
  const hashedPwdArgon: string = await argonHash(hashThisPasswordArgon, 12);
  const comparisonPwdArgon: boolean = await argonComparison(
    hashThisPasswordArgon,
    hashedPwdArgon,
  );
  console.log(
    `ORIGINAL PASSWORD: ${hashThisPasswordArgon}, HASHSED PASSWORD: ${hashedPwdArgon}, MATCHED: ${comparisonPwdArgon ? "TRUE" : "FALSE"}`,
  );

  const testedPwd1 = "12345";
  const zxcvbnCompareResult = zxcvbn(testedPwd1);
  console.log(`
ZXCVBN RESULT:
----------------------------------
SCORE: ${zxcvbnCompareResult.score}

FEEDBACK:
  WARNING: ${zxcvbnCompareResult.feedback.warning}
  SUGGESTIONS:
    ${zxcvbnCompareResult.feedback.suggestions
      .map((e, i) => `MSG${i + 1}: "${e}"`)
      .join("\n    ")}

GUESSES: ${zxcvbnCompareResult.guesses}
GUESSES_LOG10: ${zxcvbnCompareResult.guesses_log10}

CRACK TIMES (SECONDS):
  ONLINE_THROTTLING_100_PER_HOUR: ${zxcvbnCompareResult.crack_times_seconds.online_throttling_100_per_hour}
  ONLINE_NO_THROTTLING_10_PER_SECOND: ${zxcvbnCompareResult.crack_times_seconds.online_no_throttling_10_per_second}
  OFFLINE_SLOW_HASHING_1E4_PER_SECOND: ${zxcvbnCompareResult.crack_times_seconds.offline_slow_hashing_1e4_per_second}
  OFFLINE_FAST_HASHING_1E10_PER_SECOND: ${zxcvbnCompareResult.crack_times_seconds.offline_fast_hashing_1e10_per_second}

CRACK TIMES (DISPLAY):
  ONLINE_THROTTLING_100_PER_HOUR: ${zxcvbnCompareResult.crack_times_display.online_throttling_100_per_hour}
  ONLINE_NO_THROTTLING_10_PER_SECOND: ${zxcvbnCompareResult.crack_times_display.online_no_throttling_10_per_second}
  OFFLINE_SLOW_HASHING_1E4_PER_SECOND: ${zxcvbnCompareResult.crack_times_display.offline_slow_hashing_1e4_per_second}
  OFFLINE_FAST_HASHING_1E10_PER_SECOND: ${zxcvbnCompareResult.crack_times_display.offline_fast_hashing_1e10_per_second}

CALC TIME: ${zxcvbnCompareResult.calc_time} ms
----------------------------------
`);
}

export default function PasswordSecurityLessons() {
  PasswordSecurityExample1();
}

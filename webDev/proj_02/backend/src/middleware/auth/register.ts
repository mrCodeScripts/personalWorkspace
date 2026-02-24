import { Request, Response } from "express";

export function RegisterNewAccount(req: Request, res: Response) {
  const sampleOfExistingData: {
    username: string;
    emailOrPhone: string;
    hashedPassword: string;
  }[] = [
    {
      username: "John Doe",
      emailOrPhone: "person1@gmail.com",
      hashedPassword: "12345",
    },
    {
      username: "John Dick",
      emailOrPhone: "person2@gmail.com",
      hashedPassword: "12345",
    },
    {
      username: "Jane Doe",
      emailOrPhone: "person3@gmail.com",
      hashedPassword: "12345",
    },
    {
      username: "Johnny Dick",
      emailOrPhone: "person4@gmail.com",
      hashedPassword: "12345",
    },
    {
      username: "Dick Head",
      emailOrPhone: "person5@gmail.com",
      hashedPassword: "12345",
    },
    {
      username: "Head John",
      emailOrPhone: "person6@gmail.com",
      hashedPassword: "12345",
    },
  ];

  const data = req.body;
  const username: string = data.username;
  const emailOrPhone: string = data.emailOrPhone;
  const createdPassword: string = data.createPassword;
  const confirmedPassword: string = data.confirmPassword;
}

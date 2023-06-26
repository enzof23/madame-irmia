"use server";

type FormProps = {
  email: string;
  message: string;
};

export async function submitSupportEmail({ email, message }: FormProps) {
  console.log(`${email} is sending a support message: ${message}`);
}

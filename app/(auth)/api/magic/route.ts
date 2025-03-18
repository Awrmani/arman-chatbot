// app/api/magic/route.ts
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';


import { login, LoginActionState } from "@/app/(auth)/actions";
import { getUserByMagicToken } from '@/db/queries';  // Your DB query function

// const NEXTAUTH_SECRET = process.env.AUTH_SECRET!;
// const COOKIE_NAME = 'authjs.session-token';

export async function GET(request: Request) {
  console.log("Magic link route reached");
  // Extract the token from the query parameters
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  
  if (!token) {
    return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
  }

  // Look up the user associated with the magic token
  const [user] = await getUserByMagicToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  console.log("User found:", user);

  // Create a FormData object to simulate the credentials form submission.
  const formData = new FormData();
  formData.append("email", user.email);
  formData.append("password", "dummy-password");
  formData.append("magic", "true");

  const result: LoginActionState = await login({ status: "idle" }, formData);
  console.log("Login action result:", result);

  if (result.status !== "success") {
    return NextResponse.json(
      { error: "Magic login failed", result },
      { status: 500 }
    );
  }

  // Redirect to the home/dashboard page with the session cookie set.
  return NextResponse.redirect(new URL('/', request.url));
}

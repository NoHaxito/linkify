import { github, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUser: GitHubUser = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }).then((res) => res.json());
    let githubUserEmail = githubUser.email;
    const githubUserEmails: GithubEmails[] = await fetch(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    ).then((res) => res.json());
    if (githubUserEmail === null) {
      githubUserEmail =
        githubUserEmails.find((email) => email.verified)?.email ||
        githubUserEmails[0].email;
    }
    const existingUser = await db.user.findFirst({
      where: { github_id: githubUser.id },
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateId(15);
    await db.user.create({
      data: {
        id: userId,
        github_id: githubUser.id,
        username: githubUser.login,
        email: githubUserEmail,
        avatar_url: githubUser.avatar_url,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e: any) {
    // the specific error message depends on the provider
    console.log(e);
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/login?error=${e.message}`,
      );
    }
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/login?error=${e.message}`,
    );
  }
}

interface GitHubUser {
  id: number;
  login: string;
  email: string | null;
  avatar_url: string;
}
interface GithubEmails {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

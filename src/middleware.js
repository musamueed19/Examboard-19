// middleware.js

import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Middleware is running");

  // Retrieve the "userData" cookie
  const userData = request.cookies.get("userData");
  console.log("Retrieved userData:", userData);

  const loginPath = "/auth/login"; // Define the login path

  // Check if the user is trying to access the login page
  if (request.nextUrl.pathname === loginPath) {
    // If the user is already authenticated, redirect them to the previous page instead of "/"
    if (userData) {
      const referer = request.headers.get("referer") || "/";
      console.log("REFERER ......... ---------------", referer);
      return NextResponse.redirect(new URL(referer, request.url)); // Redirect to the referring page
    }
    // Allow access to the login page if not authenticated
    return NextResponse.next();
  }

  // If userData is missing, redirect to login without including intended page
  if (!userData) {
    console.log("No userData found, redirecting to login.");
    return NextResponse.redirect(new URL(loginPath, request.url)); // Just redirect to login without any parameters
  }

  try {
    // Parse the userData cookie
    const parsedData = JSON.parse(userData.value);
    console.log("Parsed userData:", parsedData);

    // Check if email exists and is not empty
    if (!parsedData.user.email) {
      console.log("Email is missing in userData, redirecting to login.");
      return NextResponse.redirect(new URL(loginPath, request.url));
    }

    // If everything is valid, proceed to the desired route
    console.log("Authentication successful, proceeding to the desired route.");
    return NextResponse.next();
  } catch (error) {
    console.error("Error parsing userData:", error);
    return NextResponse.redirect(new URL(loginPath, request.url));
  }
}

// Adjust paths to match your requirements
export const config = {
  matcher: [
    "/",
    "/users",
    "/semesters/:path*",
    "/designations",
    "/courses",
    "/locations",
    "/user/changepassword",
    "/dailyQbStatus/:path*",
    "/ecws",
    "/faculties",
    "/auth/login", // Include the login path in the matcher
  ],
};

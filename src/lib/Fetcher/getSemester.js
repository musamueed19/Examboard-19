"use server";
import axios from "axios";

export async function getSemesterTitle(id) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/semesters/${id}`
    );

    return response.data.semester.title;
  } catch (error) {
    console.log("Error fetching Semester Title:", error);
    return "Unknown Semester"; // Fallback title
  }
}

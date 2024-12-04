

import EditSection from "./EditSectionCoordinator/page";
import CourseAllocationPage from "./ManageCourseAllocation/page";

export default async function SemesterAndExam({ params, searchParams }) {
  const { id } = await params;
  const { type } = (await searchParams) || null;

  if (!id) {
    return <p>Invalid Section ID.</p>;
  }
  console.log('the section id in slug ',id);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/sections`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Section data");
    }

    const section = await response.json();

    if (!section) {
      return <p>No data available for this Section.</p>;
    }

    const sectionWithType = { ...section, type };
    console.log(sectionWithType);

    return (
      <div className="container">
        <EditSection id={id} section={sectionWithType} />
        <CourseAllocationPage  id={id} section={sectionWithType} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching Section data:", error);
    return <p>Failed to load semester data.</p>;
  }
}

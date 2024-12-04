import MenuItems from "./MenuItems";

const menuItems = [
  {
    title: "Home",
    path: "home",
    img: "/home.svg",
  },
  {
    title: "Users",
    path: "users",
    img: "/users.svg",
  },
  {
    title: "Designations",
    path: "designations",
    img: "/designations.svg",
  },
  {
    title: "Locations",
    path: "locations",
    img: "/locations.svg",
  },
  {
    title: "Courses",
    path: "courses",
    img: "/courses.svg",
  },
  {
    title: "Semesters",
    path: "semesters",
    img: "/semesters.svg",
  },
  {
    title: "Faculties",
    path: "faculties",
    img: "/faculties.svg",
  },
  {
    title: "Sections & Coordinators",
    path: "sectioncoordinator",
    img: "/sections.svg",
  },
  {
    title: "Exam Strength",
    path: "ecws",
    img: "/examstrength.svg",
  },
  {
    title: "Exam Questions",
    path: "examquestions",
    img: "/examquestions.svg",
  },
  {
    title: "Daily QB Status",
    path: "dailyQbStatus",
    img: "/dailyqb.svg",
  },
];

export default function Menubar({ isHide }) {
  // console.log('Menubar', isHide);

  return (
    <div className="flex flex-col gap-3 mt-8 px-2 bg-gray-100/70 w-full rounded-md h-full">
      {menuItems.map((item) => (
        <MenuItems isTitleHide={isHide} key={item.title} item={item} />
      ))}
    </div>
  );
}

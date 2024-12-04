import TitleHeader from "@/components/common/TitleHeader";
import DashboardLayout from "./(dashboard)/layout";
import AccountStateHandler from "@/components/Dashboard/AccountStateHandler";
export default function Home() {
  
  return (
    <DashboardLayout>
      <div className="flex w-full h-full text-[#1d4ed8] items-center justify-center">
        <TitleHeader title="Welcome to Our Dashboard Page!" fontSize="4xl" />
      </div>
    </DashboardLayout>
  );
}
// return (
  // <DashboardLayout>
  //   <div className="flex w-full h-full text-[#1d4ed8] items-center justify-center">
  //     <TitleHeader title="Welcome to Our Dashboard Page!" fontSize="4xl" />
  //   </div>
  // </DashboardLayout>
// );
  
// export function loginStateHandler(isLogged) {
//   return <AccountStateHandler  />
// }












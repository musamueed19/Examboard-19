import ChangePasswordForm from "@/components/Forms/ChangePasswordForm";

function ChangePasswordPage() {
  return (
    <div className="w-full h-full bg-[#eeeeee] flex items-center justify-center">
      <div className="md:max-w-md w-full h-full md:h-fit p-8 bg-white rounded-md flex flex-col gap-8 items-center justify-center drop-shadow-xl">
        <h1 className="w-full text-[#226FFE] font-bold text-3xl text-center">
          Change Password
        </h1>

        <ChangePasswordForm />
      </div>
    </div>
  );
}

export default ChangePasswordPage;

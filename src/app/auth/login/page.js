import LoginForm from "@/components/Forms/LoginForm";

function LoginPage() {
  return (
    <div className="w-full h-full bg-[#eeeeee] flex items-center justify-center">
      <div className="md:max-w-md w-full h-full md:h-fit p-8 bg-white rounded-md flex flex-col gap-8 items-center justify-center drop-shadow-xl">
        <h1 className="w-full text-[#226FFE] font-bold text-3xl text-center">Sign in</h1>

        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;

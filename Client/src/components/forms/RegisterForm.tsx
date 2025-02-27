import AuthProviderButtons from "../ui/AuthProviderButtons";

const RegisterForm = () => {
  return (
    <form action="" className="auth-form">
      <h1 className="md:text-3xl text-2xl font-medium">Create an account</h1>
      <div className="mt-5 space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
        />
        <input
          type="text"
          placeholder="Email"
          className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
        />
        <input
          type="text"
          placeholder="Phone Number (optional)"
          className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium  outline-secondary"
        />
      </div>
      <button className="mt-5 w-full bg-primary text-white py-3">Register</button>
      <p className="mt-2 text-red-500">Something went wrong</p>
      <AuthProviderButtons />
    </form>
  );
};

export default RegisterForm;

import { FormEvent, useRef, useState } from "react";
import AuthProviderButtons from "../ui/AuthProviderButtons";
import { getFormValues } from "../../utils/function";
import envConfig from "../../config/env.config";
import { useRegisterMutation } from "../../redux/features/auth/auth.api";

const RegisterForm = () => {
  const [error, setError] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const ref = useRef<HTMLFormElement>(null);
  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError({});
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const fieldError: any = {};

      const target = e.target as HTMLFormElement;
      const values = getFormValues(target, ["fullName", "email", "password", "confirmPassword"]);
      const { fullName, email, password, confirmPassword } = values;

      if (!fullName) {
        fieldError.fullName = "Full name is empty";
      } else if (fullName.trim().length < 3) {
        fieldError.fullName = "Full name must be at least 3 characters long ";
      } else if (fullName.trim().length > 20) {
        fieldError.fullName = "Full name cannot exceed 20 characters";
      }
      if (!email) {
        fieldError.email = "Email is empty";
      }
      if (!password) {
        fieldError.password = "Password is empty";
      } else if (password.length < 6) {
        fieldError.password = "Password must be at least 6 characters long ";
      } else if (password.length > 32) {
        fieldError.password = "Password cannot exceed 32 characters";
      }
      if (!confirmPassword) {
        fieldError.confirmPassword = "Confirm Password is empty";
      } else if (confirmPassword !== password) {
        fieldError.confirmPassword = "Password doesn't match";
      }
      if (Object.values(fieldError).length) {
        return setError(fieldError);
      }

      const res = await register(values);

      if (res.data?.success) {
        setSuccessMessage(res.data.message);
        ref.current?.reset();
      } else {
        throw new Error((res.error as any).data.message);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <form ref={ref} action="" onSubmit={handelSubmit} className="auth-form">
        <h1 className="md:text-3xl text-2xl font-medium">Create an account</h1>
        <div className="mt-5 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            {error.fullName && <p className="mt-1 text-red-600">{error.fullName}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            {error.email && <p className="mt-1 text-red-600">{error.fullName}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium  outline-secondary"
            />
            {error.password && <p className="mt-1 text-red-600">{error.password}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium  outline-secondary"
            />
            {error.confirmPassword && <p className="mt-1 text-red-600">{error.confirmPassword}</p>}
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="mt-5 w-full bg-primary text-white py-3"
        >
          {isLoading ? "Just a moment.." : "Register"}
        </button>
        {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
        {successMessage && <p className="mt-2 text-primary">{successMessage}</p>}
      </form>
      <AuthProviderButtons />
    </>
  );
};

export default RegisterForm;

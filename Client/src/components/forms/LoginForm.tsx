import { FormEvent, useState } from "react";
import AuthProviderButtons from "../ui/AuthProviderButtons";
import { getFormValues } from "../../utils/function";
import { useLoginMutation } from "../../redux/features/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../provider/CurrentUserProvider";
import DemoLogin from "../ui/DemoLogin";

interface IProps {
  onSuccess?(): void;
}

const LoginForm = ({ onSuccess }: IProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const values = getFormValues(target, ["email", "password"]);
    setErrorMessage("");
    try {
      const res = await login(values);

      if (res.data?.success) {
        navigate("/");
      } else {
        throw new Error((res.error as any).data.message);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };
  return (
    <>
      <form onSubmit={handelSubmit} action="" className="auth-form">
        <h1 className="md:text-3xl text-2xl font-medium">Login your account</h1>
        <div className="mt-5 space-y-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="mt-5 w-full bg-primary text-white py-3"
        >
          {isLoading ? "Just a moment.." : "Login"}
        </button>
        {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
      </form>
      <AuthProviderButtons />
      <DemoLogin onSuccess={onSuccess} />
    </>
  );
};

export default LoginForm;

import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { useGoogleCallbackMutation } from "../../redux/features/auth/auth.api";
import { toast } from "sonner";

interface IProps {
  onSuccess?(): void;
}

const AuthProviderButtons = ({ onSuccess }: IProps) => {
  const [googleCallback, { isLoading, isError }] = useGoogleCallbackMutation();
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await googleCallback({
          accessToken: response.access_token,
        });

        const resData = res.data;
        if (resData?.success) {
          onSuccess && onSuccess();
          window.location.reload();
        } else {
          toast.error((res.error as any).data.message || "Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="md:p-5 p-3 ">
      <button
        disabled={isLoading}
        onClick={googleLogin as any}
        className=" w-full flex  justify-center  items-center gap-2 py-2 border border-gray-400 hover:bg-gray-100"
      >
        <img
          src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
          alt=""
          className="size-9 rounded-full "
        />
        <p className="font-semibold font-secondary">Continue With Google</p>
      </button>
      <button
        disabled={isLoading}
        className=" w-full flex  justify-center  items-center gap-2 py-2 border border-gray-400  mt-2 hover:bg-gray-100"
      >
        <img
          src="https://img.freepik.com/premium-vector/art-illustration_929495-41.jpg?semt=ais_hybrid"
          alt=""
          className="size-9 rounded-full"
        />
        <p className="font-semibold font-secondary">Continue With Google</p>
      </button>
    </div>
  );
};

export default AuthProviderButtons;

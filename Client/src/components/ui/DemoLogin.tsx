import React, { useState } from "react";
import { FcDonate } from "react-icons/fc";
import { GrUserAdmin } from "react-icons/gr";
import { useLoginMutation } from "../../redux/features/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { EUserRole } from "../../types/user.type";
import { useCurrentUser } from "../../provider/CurrentUserProvider";
function DemoLogin() {
  const [errorMessage, setErrorMessage] = useState("");
  const {refetch} = useCurrentUser()
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const handelLogin = async (role: EUserRole) => {
    setErrorMessage('')
    const isAdmin = role === EUserRole.Admin;
    const payload = {
      email: isAdmin ? "admin@gmail.com" : "siamhasan5161@gmail.com",
      password: "123456",
    };

    try {
      const res = await login(payload);

      if (res.data?.success) {
        if (isAdmin) {
          refetch()
          setTimeout(()=>{
              navigate("/dashboard");
          },1000)
        } else {
          navigate("/");
        }
      } else {
        throw new Error((res.error as any).data.message);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div>
      <p className=" font-medium font-secondary text-xl">Demo login</p>
      <div className="mt-5">
        <div className="flex justify-center items-center gap-4">
          <button type="button" onClick={()=>handelLogin(EUserRole.Admin)}  disabled={isLoading} className="px-4 py-2 border-2  rounded-md flex text-white bg-primary items-center gap-2 ">
            <span className="text-xl ">
              <GrUserAdmin />
            </span>
            <span className="font-medium">As admin</span>
          </button>
          <button type="button"   onClick={()=>handelLogin(EUserRole.Donor)} disabled={isLoading}  className="px-4 py-2 border-2 bg-blue-500 text-white  rounded-md flex  items-center gap-2 ">
            <span className="text-xl ">
              <FcDonate />
            </span>
            <span className="font-medium">As donor</span>
          </button>
        </div>
      </div>
      <p className="mt-1 text-red-500">{errorMessage}</p>
    </div>
  );
}

export default DemoLogin;

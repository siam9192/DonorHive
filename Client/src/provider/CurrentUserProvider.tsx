import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useGetCurrentUserQuery } from "../redux/features/auth/auth.api";
import { ICurrentUser } from "../types/auth.type";

type TContextValue = {
  user: ICurrentUser | null;
  isLoading: boolean;
  isFetching: boolean;
  setUser: (user: ICurrentUser | null) => void;
  refetch: () => void;
  error: {
    status: number;
    message: string;
  } | null;
};
const UserContext = createContext<TContextValue | null>(null);

function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ICurrentUser | null>(null);
  const { data, error, isLoading:uLoading, isFetching, refetch } = useGetCurrentUserQuery(undefined);
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    if (!uLoading && data?.success){
      setUser(data.data as ICurrentUser);
      setIsLoading(false)
    }
    else if(!uLoading && !data?.success) setIsLoading(false)
    
  }, [data, uLoading]);

  const value = {
    user,
    setUser,
    isLoading,
    isFetching,
    refetch,
    error: null,
  };



  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default CurrentUserProvider;

export function useCurrentUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Use current user must be used within the currentUserProvider context");
  }
  return context as TContextValue;
}

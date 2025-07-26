import { useAppContext } from "@/context/AppContext";
import { setCredits, setField } from "@/store/creditLimitsSlice";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetCreditLimits = () => {
  // Session
  const { data: session } = useSession();
  const creditLimits = useSelector((state: RootState) => state.creditLimits);

  // Redux
  const dispatch = useDispatch();
  const getCreditLimitsIfNotExists = async () => {
    if (!creditLimits.isFetched) {
      try {
        const res = await fetch(`/api/users/CreditLimits`);
        const response = await res.json();
        dispatch(setCredits(response.result));
        dispatch(setField({ name: "isFetched", value: true }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      getCreditLimitsIfNotExists();
    }
  }, [session?.user?.email]);
  return { getCreditLimitsIfNotExists };
};

export default useGetCreditLimits;

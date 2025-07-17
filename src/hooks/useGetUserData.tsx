"use client";
import { RootState } from "@/store/store";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";
import { useSession } from "next-auth/react";

import { useDispatch, useSelector } from "react-redux";

const useGetUserData = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData);
  const { data: session } = useSession();

  const getUserDataIfNotExists = async () => {
    // return makeAPICallWithRetry(async () => {
    if (!userData.isLoading && !userData.isFetched) {
      dispatch(setIsLoading(true));
      // Fetch userdata if not exists in Redux
      const res = await fetch(
        `/api/users/getOneByEmail?email=${session?.user?.email}`
      );
      const data = await res.json();

      dispatch(setUserData(data.result));
      dispatch(setIsLoading(false));
      dispatch(setField({ name: "isFetched", value: true }));
    }
    // });
  };
  return { getUserDataIfNotExists };
};

export default useGetUserData;

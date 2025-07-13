"use client";

import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import { setField as setFieldRegister } from "../store/registerSlice";
import { useEffect } from "react";

import "./dashboard.css";
import { setField, setIsLoading, setUserData } from "../store/userDataSlice";

const UserDataProvider = () => {
  // Session
  const { data: session } = useSession();

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  // when user is authenticated get userdata if not exists
  const getUserDataIfNotExists = async () => {
    if (!userData.isLoading && !userData.isFetched) {
      dispatch(setIsLoading(true));
      try {
        // Fetch userdata if not exists in Redux
        const res = await fetch(
          `/api/users/getOneByEmail?email=${session?.user?.email}`
        );
        const response = await res.json();
        const user = response.result;

        dispatch(setUserData(user));
        dispatch(setIsLoading(false));
        dispatch(setField({ name: "isFetched", value: true }));

        // if there is a file in files array of a user then set it as defaultResumeFile
        // if (user?.files && user?.files?.length > 0) {
        dispatch(
          setFieldRegister({
            name: "scrappedContent",
            value: user?.uploadedResume?.fileContent,
          })
        );
        dispatch(
          setField({
            name: "defaultResumeFile",
            value: user?.uploadedResume?.fileName,
          })
        );

        dispatch(
          setField({ name: "wizardCompleted", value: user.wizardCompleted })
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  // when page (session) loads, fetch user data if not exists
  useEffect(() => {
    if (session?.user?.email) {
      getUserDataIfNotExists();
    }
  }, [session?.user?.email]);

  return <></>;
};

export default UserDataProvider;

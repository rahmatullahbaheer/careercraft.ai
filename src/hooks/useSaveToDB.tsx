"use client";
import { makeid } from "../helpers/makeid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { setField, setUserData } from "@/store/userDataSlice";
import { setId, setResume } from "@/store/resumeSlice";
import { useAppContext } from "@/context/AppContext";
import { showSuccessToast } from "@/helpers/toast";
import { RootState } from "@/store/store";

const useSaveResumeToDB = () => {
  const { resume: resumeData, userData } = useSelector((state: RootState) => state);
  const { setAvailableCredits } = useAppContext();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { abortController } = useAppContext();

  const saveResumeToDB = async (data: any = "") => {
    // return makeAPICallWithRetry(async () => {

    const source = data === "" ? resumeData : data;
    let obj = source;

    if (!source.id || source.id === "") {
      obj = { ...source, id: makeid(), dateTime: new Date().toISOString() };
    }
    dispatch(setResume(obj));

    axios
      .post(
        "/api/resumeBots/saveResumeToDB",
        {
          email: userData.email,
          resumeData: obj,
        },
        { signal: abortController?.signal }
      )
      .then(async (resp) => {
        showSuccessToast("Resume Updated Successfully");

        if (userData.trialResume === false) {
          dispatch(setUserData({ trialResume: true }));
          axios
            .post(
              "/api/users/updateUserData",
              {
                data: {
                  email: userData.email,
                  trialResume: true,
                },
              },
              { signal: abortController?.signal }
            )
            .then(() => {
              setAvailableCredits(true);
            });
        } else {
          setAvailableCredits(true);
        }
        dispatch(setId(obj.id));
        // update user in redux
        const res = await fetch(
          `/api/users/getOneByEmail?email=${session?.user?.email}`,
          { signal: abortController?.signal }
        );

        const response = await res.json();
        const user = response.result;
        dispatch(setUserData(user));
        // get user package details
        const res2 = await fetch(
          `/api/users/getCreditPackageDetails?id=${user?.creditPackage}`,
          { signal: abortController?.signal }
        );
        const data = await res2.json();
        if (data.success) {
          const userPackage = data.result;
          // showSuccessToast("Resume Updated Successfully");
          // set user package details to redux
          dispatch(setField({ name: "userPackageData", value: userPackage }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { saveResumeToDB };
};

export default useSaveResumeToDB;

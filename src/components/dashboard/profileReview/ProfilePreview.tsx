import React from "react";
import EducationCard from "./EducationCard";
import { useDispatch, useSelector } from "react-redux";
import { EditIcon, addressIcon } from "@/helpers/iconsProvider";
import { setActiveStep, setStepFive } from "@/store/registerSlice";
import {
  Education,
  Publication,
  Certification,
  WorkExperience,
  Award,
  Reference,
  Training,
  Interest,
  Language,
  Project,
} from "@/store/userDataSlice";
import ExperienceCard from "./ExperienceCard";
import RecordCard from "./RecordCard";

const ProfilePreview = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.register);

  return (
    <div className="">
      <h1 className="text-2xl mt-6 font-semibold mb-2 dark:text-gray-100 text-gray-950">
        Review your Resume
      </h1>
      <p className=" mb-4 dark:text-gray-100 text-gray-950">
        Review and make any changes below.
      </p>
      <hr className="mb-4 dark:text-[#2e2f45] text-gray-950" />

      {/* Basic */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium dark:text-gray-100  text-gray-950">
            {data.stepOne.firstName === "" && data.stepOne.lastName === "" ? (
              "[Missing Name]"
            ) : (
              <>{data.stepOne.firstName + " " + data.stepOne.lastName}</>
            )}
          </h3>
          <div className="space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => dispatch(setActiveStep(1))}
            >
              {EditIcon}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm flex flex-col gap-3 ">
            <p className="flex flex-row gap-2 items-center dark:text-gray-100 text-gray-950">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <span>
                {data.stepTwo.phoneNumber
                  ? data.stepTwo.phoneNumber
                  : "[Missing Phone Number]"}
              </span>
            </p>
            <p className="flex flex-row gap-2 items-center dark:text-gray-100 text-gray-950">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <span>
                {data.stepTwo.Email ? data.stepTwo.Email : "[Missing Email]"}
              </span>
            </p>
            <p className="flex flex-row gap-2 items-center dark:text-gray-100 text-gray-950">
              <span className="text-gray-900 dark:text-gray-100 ">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z"
                    stroke="currentColor"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M6.15572 13V7.54545H6.99379V13H6.15572ZM6.58185 6.63636C6.4185 6.63636 6.27764 6.58073 6.15927 6.46946C6.04326 6.35819 5.98526 6.22443 5.98526 6.06818C5.98526 5.91193 6.04326 5.77817 6.15927 5.6669C6.27764 5.55563 6.4185 5.5 6.58185 5.5C6.74521 5.5 6.88488 5.55563 7.00089 5.6669C7.11926 5.77817 7.17844 5.91193 7.17844 6.06818C7.17844 6.22443 7.11926 6.35819 7.00089 6.46946C6.88488 6.58073 6.74521 6.63636 6.58185 6.63636ZM9.36683 9.71875V13H8.52876V7.54545H9.33842V8.39773H9.40945C9.53729 8.12074 9.73142 7.8982 9.99183 7.73011C10.2522 7.55966 10.5884 7.47443 11.0004 7.47443C11.3697 7.47443 11.6928 7.55019 11.9698 7.7017C12.2468 7.85085 12.4622 8.07812 12.6161 8.38352C12.77 8.68655 12.8469 9.07008 12.8469 9.53409V13H12.0089V9.59091C12.0089 9.16241 11.8976 8.8286 11.6751 8.58949C11.4525 8.34801 11.1471 8.22727 10.7589 8.22727C10.4914 8.22727 10.2522 8.28527 10.0415 8.40128C9.83321 8.51728 9.66868 8.68655 9.54794 8.90909C9.4272 9.13163 9.36683 9.40152 9.36683 9.71875Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span>
                {data.stepTwo.linkedin
                  ? data.stepTwo.linkedin
                  : "[Missing Linkedin]"}
              </span>
            </p>
          </div>
          <div className="space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => dispatch(setActiveStep(1))}
            >
              {EditIcon}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm flex flex-col gap-1 ">
            <p className="flex flex-row gap-2 items-center dark:text-gray-100 text-gray-950">
              {addressIcon}
              {data.stepThree?.country === "" &&
              data.stepThree?.street === "" &&
              data.stepThree?.cityState === "" &&
              data.stepThree?.postalCode === "" ? (
                <span>[Address Missing]</span>
              ) : (
                <span>
                  {data.stepThree?.country && data.stepThree?.country}{" "}
                  {data.stepThree?.street && ", " + data.stepThree?.street}{" "}
                  {data.stepThree?.cityState &&
                    ", " + data.stepThree?.cityState}{" "}
                  {data.stepThree?.postalCode &&
                    ", " + data.stepThree?.postalCode}{" "}
                </span>
              )}
            </p>
          </div>
          <div className="space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => dispatch(setActiveStep(1))}
            >
              {EditIcon}
            </button>
          </div>
        </div>
      </section>

      {/* Summary */}
      {/* <section className="mb-8 ">
        <h2 className="text-xl font-semibold mb-2 ">Summary</h2>
        <p className="mb-2 text-sm  italic">
          Written by AI According to your Resume
        </p>
        <div className="border p-4 rounded-lg ">
          <div className="flex justify-between items-center mb-4">
            <p>
              Experienced software engineer with a passion for creating
              efficient and scalable applications.
            </p>
          </div>
        </div>
      </section> */}

      {/* Work Experience */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2  dark:text-gray-100 text-gray-950">
          Work Experience
          <button
            type="button"
            onClick={(e) => {
              dispatch(setActiveStep(3));
            }}
            className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
          >
            {EditIcon}
          </button>
        </h2>
        <div className="w-[100%] grid md:grid-cols-2 gap-4">
          {data.stepFive.list.map(
            (workExperience: WorkExperience, index: number) => (
              <ExperienceCard
                key={index}
                rec={workExperience}
                isShowing={true}
              />
            )
          )}
          {data.stepFive.list.length === 0 && <p>No Experiences Found</p>}
        </div>
      </section>

      {/* Publications */}
      {data.stepEight.list.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2  dark:text-gray-100 text-gray-950">
            Publications
            <button
              type="button"
              onClick={(e) => {
                dispatch(setActiveStep(4));
              }}
              className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
            >
              {EditIcon}
            </button>
          </h2>
          <div className="w-[100%] grid md:grid-cols-2 gap-4">
            {data.stepEight.list.map(
              (publication: Publication, index: number) => (
                <RecordCard rec={publication} key={index} />
              )
            )}
          </div>
        </section>
      )}
      {/* Certifications */}
      {data.stepEight.list.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2  dark:text-gray-100 text-gray-950">
            Certifications
            <button
              type="button"
              onClick={(e) => {
                dispatch(setActiveStep(4));
              }}
              className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
            >
              {EditIcon}
            </button>
          </h2>
          <div className="w-[100%] grid md:grid-cols-2 gap-4">
            {data.stepSix.list.map(
              (certification: Certification, index: number) => (
                <RecordCard rec={certification} key={index} />
              )
            )}
          </div>
        </section>
      )}
      {/* Awards */}
      {data.stepNine.list.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2  dark:text-gray-100 text-gray-950">
            Awards
            <button
              type="button"
              onClick={(e) => {
                dispatch(setActiveStep(4));
              }}
              className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
            >
              {EditIcon}
            </button>
          </h2>
          <div className="w-[100%] grid md:grid-cols-2 gap-4">
            {data.stepNine.list.map((award: Award, index: number) => (
              <RecordCard rec={award} key={index} />
            ))}
          </div>
        </section>
      )}
      {/* References */}
      {data.stepTwelve.list.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2  dark:text-gray-100 text-gray-950">
            References
            <button
              type="button"
              onClick={(e) => {
                dispatch(setActiveStep(4));
              }}
              className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
            >
              {EditIcon}
            </button>
          </h2>
          <div className="w-[100%] grid md:grid-cols-2 gap-4">
            {data.stepTwelve.list.map((reference: Reference, index: number) => (
              <RecordCard rec={reference} key={index} />
            ))}
          </div>
        </section>
      )}
      {/* Trainings */}
      {data.stepSeven.list.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2  dark:text-gray-100 text-gray-950">
            Trainings
            <button
              type="button"
              onClick={(e) => {
                dispatch(setActiveStep(4));
              }}
              className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
            >
              {EditIcon}
            </button>
          </h2>
          <div className="w-[100%] grid md:grid-cols-2 gap-4">
            {data.stepSeven.list.map((training: Training, index: number) => (
              <RecordCard rec={training} key={index} />
            ))}
            {data.stepEight.list.length === 0 && <p>No Trainings Found</p>}
          </div>
        </section>
      )}
      {/* Interests & Hobbies */}
      {data.stepTen.list.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2  dark:text-gray-100 text-gray-950">
            Interests & Hobbies
            <button
              type="button"
              onClick={(e) => {
                dispatch(setActiveStep(4));
              }}
              className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
            >
              {EditIcon}
            </button>
          </h2>
          <div className="w-[100%] grid md:grid-cols-2 gap-4">
            {data.stepTen.list.map((interest: Interest, index: number) => (
              <RecordCard rec={interest} key={index} />
            ))}
          </div>
        </section>
      )}
      {/* Languages */}
      {data.stepEleven.list.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2  dark:text-gray-100 text-gray-950">
            Languages
            <button
              type="button"
              onClick={(e) => {
                dispatch(setActiveStep(4));
              }}
              className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
            >
              {EditIcon}
            </button>
          </h2>
          <div className="w-[100%] grid md:grid-cols-2 gap-4">
            {data.stepEleven.list.map((language: Language, index: number) => (
              <RecordCard rec={language} key={index} />
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.stepFourteen.list.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2  dark:text-gray-100 text-gray-950">
            Projects
            <button
              type="button"
              onClick={(e) => {
                dispatch(setActiveStep(4));
              }}
              className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
            >
              {EditIcon}
            </button>
          </h2>
          <div className="w-[100%] grid md:grid-cols-2 gap-4">
            {data.stepFourteen.list.map((project: Project, index: number) => (
              <RecordCard rec={project} key={index} />
            ))}
          </div>
        </section>
      )}
      {/* Education */}

      <section className="mb-8 ">
        <h2 className="text-xl font-semibold  dark:text-gray-100 text-gray-950">
          Education
          <button
            type="button"
            onClick={(e) => {
              dispatch(setActiveStep(2));
            }}
            className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
          >
            {EditIcon}
          </button>
        </h2>
        <div className="w-[100%] grid md:grid-cols-2 gap-4 mt-3">
          {data.stepFour.list.map((education: Education, index: number) => (
            <EducationCard key={index} rec={education} isShowing={true} />
          ))}
          {data.stepFour.list.length === 0 && <p>No Education Found</p>}
        </div>
      </section>

      {/* Custom Section  */}
      {/* <section className="mb-8 ">
        <h2 className="text-xl font-semibold  dark:text-gray-100 text-gray-950">
          Custom Sections
          <button
            type="button"
            onClick={(e) => {
              dispatch(setActiveStep(4));
            }}
            className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
          >
            {EditIcon}
          </button>
        </h2>
        <div className="">
          
        </div>
      </section> */}

      {/* Skills */}
      {/* <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2  dark:text-gray-100 text-gray-950 ">
          Skills
          <button
            type="button"
            onClick={(e) => {
              dispatch(setActiveStep(6));
            }}
            className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
          >
            {EditIcon}
          </button>
        </h2>
        <div className="flex flex-col gap-3">
          <ul className="w-[100%] grid md:grid-cols-2 gap-4">
            {data.stepSix.list.map((skill: string, index: number) => (
              <li
                key={index}
                className="flex items-center justify-between  rounded-md shadow-md dark:border-[1px] dark:border-[#2e2f45] p-3 dark:text-gray-100 text-gray-950"
              >
                <span>{skill}</span>
              </li>
            ))}
          </ul>
          {data.stepSix.list.length === 0 && <p>No Skills Found</p>}
        </div>
      </section> */}
    </div>
  );
};

export default ProfilePreview;

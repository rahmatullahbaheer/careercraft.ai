"use client";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import { useAppContext } from "@/context/AppContext";
import { EditIcon, deleteIcon } from "@/helpers/iconsProvider";
import { makeid } from "@/helpers/makeid";
import { showSuccessToast, showWarningToast } from "@/helpers/toast";
import {
  setStepEight,
  setStepEleven,
  setStepFourteen,
  setStepNine,
  setStepSeven,
  setStepSix,
  setStepTen,
  setStepTwelve,
} from "@/store/registerSlice";
import {
  Award,
  Certification,
  Interest,
  Language,
  Project,
  Publication,
  Reference,
  Training,
} from "@/store/userDataSlice";
import { useFormik } from "formik";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const RecordCard = ({ rec, recName, deleteHandler }: any) => {
  const [edit, setEdit] = useState(false);

  const [seeMore, setSeeMore] = useState(false);

  return (
    <>
      {edit && recName === "publications" && (
        <PublicationsForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "certifications" && (
        <CertificationsForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "awards" && (
        <AwardsForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "languages" && (
        <LangaugesForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "interests" && (
        <InterestsForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "trainings" && (
        <TrainingForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "references" && (
        <ReferencesForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "projects" && (
        <ProjectsForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}

      <div className="relative flex flex-col items-start justify-start py-4 pl-4 pr-12 border border-[#2e2f45] rounded-md">
        <div className="absolute right-2 top-4">
          <div className="flex flex-row justify-end gap-2">
            <button
              onClick={() => {
                setEdit(true);
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              {EditIcon}
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={deleteHandler}
            >
              {deleteIcon}
            </button>
          </div>
        </div>

        <h2 className="text-base font-semibold dark:text-gray-100 text-gray-950">
          {rec.name}
          {rec.title}
        </h2>

        <span className="text-sm dark:text-gray-100 text-gray-950">
          {rec.awardingOrganization}
          {rec.issuingOrganization}
          {rec.company}
        </span>

        <div className="flex flex-row items-center justify-between ">
          <span className="text-sm italic dark:text-gray-300 text-gray-950">
            {rec.date}
          </span>
          <span className="text-sm italic dark:text-gray-300 text-gray-950">
            {rec.startDate}
          </span>
          &nbsp;
          {rec.endDate && "-"}
          &nbsp;
          <span className="text-sm italic dark:text-gray-300 text-gray-950">
            {rec.endDate}
          </span>
        </div>
        <span
          className={`text-sm capitalize dark:text-gray-100 text-gray-950  ${
            seeMore ? "" : "line-clamp-1"
          }`}
        >
          {rec.description}
        </span>

        {rec.description && (
          <span
            className="cursor-pointer text-xs lowercase text-white/40"
            onClick={() => setSeeMore(!seeMore)}
          >
            {seeMore ? "see less <<" : "see more >>"}
          </span>
        )}

        <span className="text-sm dark:text-gray-100 text-gray-950">
          {rec.contactInformation}
          {rec.publisher}
        </span>

        <span className="text-sm italic capitalize dark:text-gray-300 text-gray-950">
          {rec.position}
        </span>

        <div className="flex flex-col justify-between">
          <span className="text-base font-semibold dark:text-gray-100 text-gray-950">
            {rec.language}
          </span>
          <span className="text-sm dark:text-gray-100 text-gray-950">
            {rec.proficiency}
          </span>
        </div>
      </div>
    </>
  );
};

// Add item Buttons
const AddItemBtn = ({ onClick, btnText = "Add Item" }: any) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
    >
      {btnText}
    </button>
  );
};
// forms
export const PublicationsForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
  formSubmitHandler = null,
}: any) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const stepEight = useSelector((state: any) => state.register.stepEight);

  const { list, state } = stepEight;

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      publisher: "",
      date: "",
      description: "",
    },

    onSubmit: async (values) => {
      if (formSubmitHandler !== null) {
        const { description } = values;
        const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings
        // Update the values with the description as an array
        const updatedValues = {
          ...values,
          description: descriptionArray,
        };
        formSubmitHandler(updatedValues);
        formCloseHandler();
      } else {
        const { description } = values;
        const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings
        // Update the values with the description as an array
        const updatedValues = {
          ...values,
          description: descriptionArray,
        };
        if (isEditing) {
          const updatedList = list.map((singleRec: Publication) => {
            if (singleRec.id === rec.id) {
              return updatedValues;
            } else {
              return singleRec;
            }
          });
          dispatch(setStepEight({ list: updatedList }));
          dispatch(setStepEight({ state: "show" }));
        } else {
          const obj = { id: makeid(), ...updatedValues };
          const newList = [obj, ...list];
          dispatch(setStepEight({ list: newList }));
          dispatch(setStepEight({ state: "show" }));
        }
        formCloseHandler();
      }
    },

    // validationSchema: Yup.object().shape({
    //   company: Yup.string().required("company is required"),
    // }),
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="mb-4 ">
          <label
            htmlFor="title"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="publisher"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Publisher
          </label>
          <input
            id="publisher"
            type="text"
            className="form-control"
            placeholder="Publisher"
            onChange={formik.handleChange}
            value={formik.values.publisher}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            className="form-control"
            placeholder="Date"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            onChange={formik.handleChange}
            placeholder="Description"
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="flex flex-row-reverse items-center justify-end gap-2 ">
          <input
            type="submit"
            className="cursor-pointer form-btn"
            value={isEditing ? "Update Publication" : "Add Publication"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className="cursor-pointer form-btn "
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};
export const CertificationsForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
  formSubmitHandler = null,
}: any) => {
  const dispatch = useDispatch();

  const stepSix = useSelector((state: any) => state.register.stepSix);
  const { list, state } = stepSix;

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      issuingOrganization: "",
      date: "",
      description: "",
    },

    onSubmit: async (values) => {
      if (formSubmitHandler !== null) {
        const { description } = values;
        const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

        // Update the values with the description as an array
        const updatedValues = {
          ...values,
          description: descriptionArray,
        };
        formSubmitHandler(updatedValues);
        formCloseHandler();
      } else {
        const { description } = values;
        const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

        // Update the values with the description as an array
        const updatedValues = {
          ...values,
          description: descriptionArray,
        };
        if (isEditing) {
          const updatedList = list.map((singleRec: Certification) => {
            if (singleRec.id === rec.id) {
              return updatedValues;
            } else {
              return singleRec;
            }
          });
          dispatch(setStepSix({ list: updatedList }));
          dispatch(setStepSix({ state: "show" }));
        } else {
          const obj = { id: makeid(), ...updatedValues };
          const newList = [obj, ...list];
          dispatch(setStepSix({ list: newList }));
          dispatch(setStepSix({ state: "show" }));
        }

        formCloseHandler();
      }
    },

    // validationSchema: Yup.object().shape({
    //   company: Yup.string().required("company is required"),
    // }),
  });
  const pathname = usePathname();
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="mb-4">
          <label
            htmlFor="title"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="issuingOrganization"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Issuing Organization
          </label>
          <input
            id="issuingOrganization"
            type="text"
            className="form-control"
            placeholder="Issuing Organization"
            onChange={formik.handleChange}
            value={formik.values.issuingOrganization}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            className="form-control"
            placeholder="Date"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            onChange={formik.handleChange}
            placeholder="Description"
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="flex flex-row-reverse items-center justify-end gap-2 mb-4">
          <input
            type="submit"
            className="cursor-pointer form-btn "
            value={isEditing ? "Update Certification" : "Add Certification"}
          />
          <input
            type="button"
            className="cursor-pointer form-btn"
            value="Cancel"
            onClick={formCloseHandler}
          />
        </div>
      </form>
    </div>
  );
};
export const AwardsForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
  formSubmitHandler = null,
}: any) => {
  const dispatch = useDispatch();
  const stepNine = useSelector((state: any) => state.register.stepNine);

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const { list, state } = stepNine;
  const formik = useFormik({
    initialValues: {
      title: "",
      awardingOrganization: "",
      date: "",
      description: "",
    },

    onSubmit: async (values) => {
      if (formSubmitHandler !== null) {
        const { description } = values;
        const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

        // Update the values with the description as an array
        const updatedValues = {
          ...values,
          description: descriptionArray,
        };
        formSubmitHandler(updatedValues);
        formCloseHandler();
      } else {
        const { description } = values;
        const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

        // Update the values with the description as an array
        const updatedValues = {
          ...values,
          description: descriptionArray,
        };
        if (isEditing) {
          const updatedList = list.map((singleRec: Award) => {
            if (singleRec.id === rec.id) {
              return updatedValues;
            } else {
              return singleRec;
            }
          });
          dispatch(setStepNine({ list: updatedList }));
          dispatch(setStepNine({ state: "show" }));
        } else {
          const obj = { id: makeid(), ...updatedValues };
          const newList = [obj, ...list];
          dispatch(setStepNine({ list: newList }));
          dispatch(setStepNine({ state: "show" }));
        }

        formCloseHandler();
      }
    },

    validationSchema: Yup.object().shape({
      title: Yup.string().required("title is required"),
      awardingOrganization: Yup.string().required(
        "awardingOrganization is required"
      ),
      date: Yup.string().required("date is required"),
    }),
  });
  const pathname = usePathname();
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="mb-4">
          <label
            htmlFor="title"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="awardingOrganization"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Awarding Organization
          </label>
          <input
            id="awardingOrganization"
            type="text"
            className="form-control"
            placeholder="Awarding Organization"
            onChange={formik.handleChange}
            value={formik.values.awardingOrganization}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            className="form-control"
            placeholder="Date"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            onChange={formik.handleChange}
            placeholder="Description"
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="flex flex-row-reverse items-center justify-end gap-2 ">
          <input
            type="submit"
            className="cursor-pointer form-btn"
            value={isEditing ? "Update Awards" : "Add Awards"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className="cursor-pointer form-btn"
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};
export const InterestsForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
  formSubmitHandler = null,
}: any) => {
  const dispatch = useDispatch();
  const stepTen = useSelector((state: any) => state.register.stepTen);
  const { list, state } = stepTen;
  const { isSidebar } = useAppContext();
  const { template15 } = useAppContext();

  console.log(isSidebar);
  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      description: "",
    },

    onSubmit: async (values) => {
      if (formSubmitHandler !== null) {
        const { description } = values;
        const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

        // Update the values with the description as an array
        const updatedValues = {
          ...values,
          description: descriptionArray,
        };
        formSubmitHandler(updatedValues);
        formCloseHandler();
      } else {
        const { description } = values;
        const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

        // Update the values with the description as an array
        const updatedValues = {
          ...values,
          description: descriptionArray,
        };
        if (isEditing) {
          const updatedList = list.map((singleRec: Interest) => {
            if (singleRec.id === rec.id) {
              return updatedValues;
            } else {
              return singleRec;
            }
          });
          dispatch(setStepTen({ list: updatedList }));
          dispatch(setStepTen({ state: "show" }));
        } else {
          const obj = { id: makeid(), ...updatedValues };
          const newList = [obj, ...list];
          dispatch(setStepTen({ list: newList }));
          dispatch(setStepTen({ state: "show" }));
        }

        formCloseHandler();
      }
    },
  });
  const pathname = usePathname();
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="mb-4">
          <label
            htmlFor="description"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" || (isSidebar && !template15)
                ? "text-gray-200"
                : "text-gray-950"
            }`}
          >
            Interest
          </label>
          <textarea
            id="description"
            className="form-control"
            onChange={formik.handleChange}
            placeholder="Interest"
            value={formik.values.description}
          ></textarea>
        </div>
        <div
          className={`items-center justify-end  ${
            isSidebar ? "flex flex-col gap-4" : "flex flex-row-reverse gap-2"
          }`}
        >
          <input
            type="submit"
            className={`cursor-pointer  whitespace-normal ${
              isSidebar
                ? "px-2 py-2 text-blue-500 border border-blue-500 rounded-lg"
                : "form-btn"
            }`}
            value={isEditing ? "Update Interest" : "Add Interest"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className={`cursor-pointer ${
              isSidebar
                ? "px-4 py-2 text-blue-500 border border-blue-500 rounded-lg"
                : "form-btn"
            }`}
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};
export const ReferencesForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
  formSubmitHandler = null,
}: any) => {
  const dispatch = useDispatch();
  const stepTwelve = useSelector((state: any) => state.register.stepTwelve);
  const { list, state } = stepTwelve;

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      position: "",
      company: "",
      contactInformation: "",
    },
    onSubmit: async (values) => {
      if (formSubmitHandler !== null) {
        formSubmitHandler(values);
        formCloseHandler();
      } else {
        if (isEditing) {
          const updatedList = list.map((singleRec: Reference) => {
            if (singleRec.id === rec.id) {
              return values;
            } else {
              return singleRec;
            }
          });
          dispatch(setStepTwelve({ list: updatedList }));
          dispatch(setStepTwelve({ state: "show" }));
        } else {
          const obj = { id: makeid(), ...values };
          const newList = [obj, ...list];
          dispatch(setStepTwelve({ list: newList }));
          dispatch(setStepTwelve({ state: "show" }));
        }
        formCloseHandler();
      }
    },

    validationSchema: Yup.object().shape({
      company: Yup.string().required("company is required"),
      position: Yup.string().required("position is required"),
      name: Yup.string().required("name is required"),
      contactInformation: Yup.string().required(
        "Contact Information is required"
      ),
    }),
  });
  const pathname = usePathname();
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="mb-4">
          <label
            htmlFor="name"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="position"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Position
          </label>
          <input
            id="position"
            type="text"
            className="form-control"
            placeholder="Position"
            onChange={formik.handleChange}
            value={formik.values.position}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="company"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            className="form-control"
            placeholder="Company"
            onChange={formik.handleChange}
            value={formik.values.company}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="contactInformation"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Contact Information
          </label>
          <input
            id="contactInformation"
            type="email"
            className="form-control"
            onChange={formik.handleChange}
            placeholder="Contact Information"
            value={formik.values.contactInformation}
          />
        </div>

        <div className="flex flex-row-reverse items-center justify-end gap-2 ">
          <input
            type="submit"
            className="cursor-pointer form-btn "
            value={isEditing ? "Update Preference" : "Add Reference"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className="cursor-pointer form-btn"
            value="Cancel"
          />{" "}
        </div>
      </form>
    </div>
  );
};
export const TrainingForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
  formSubmitHandler = null,
}: any) => {
  const dispatch = useDispatch();
  const stepSeven = useSelector((state: any) => state.register.stepSeven);
  const { list, state } = stepSeven;

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },

    onSubmit: async (values) => {
      if (formSubmitHandler !== null) {
        const { description } = values;
        const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

        // Update the values with the description as an array
        const updatedValues = {
          ...values,
          description: descriptionArray,
        };
        formSubmitHandler(updatedValues);
        formCloseHandler();
      } else {
        const { description } = values;
        const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

        // Update the values with the description as an array
        const updatedValues = {
          ...values,
          description: descriptionArray,
        };

        if (isEditing) {
          const updatedList = list.map((singleRec: Training) => {
            if (singleRec.id === rec.id) {
              return updatedValues;
            } else {
              return singleRec;
            }
          });
          dispatch(setStepSeven({ list: updatedList }));
          dispatch(setStepSeven({ state: "show" }));
        } else {
          const obj = { id: makeid(), ...updatedValues };
          const newList = [obj, ...list];
          dispatch(setStepSeven({ list: newList }));
          dispatch(setStepSeven({ state: "show" }));
        }
        formCloseHandler();
      }
    },

    validationSchema: Yup.object().shape({
      company: Yup.string().required("company is required"),
      position: Yup.string().required("position is required"),
      startDate: Yup.string().required("startDate is required"),
      endDate: Yup.string().required("endDate is required"),
    }),
  });
  const pathname = usePathname();
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="mb-4">
          <label
            htmlFor="company"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            className="form-control"
            placeholder="Company"
            value={formik.values.company}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="position"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Position
          </label>
          <input
            id="position"
            type="text"
            className="form-control"
            placeholder="Position"
            onChange={formik.handleChange}
            value={formik.values.position}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            className="form-control"
            placeholder="Start Date"
            onChange={formik.handleChange}
            value={formik.values.startDate}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            className="form-control"
            onChange={formik.handleChange}
            placeholder="End Date"
            value={formik.values.endDate}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            onChange={formik.handleChange}
            placeholder="Description"
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="flex flex-row-reverse items-center justify-end gap-2 ">
          <input
            type="submit"
            className="cursor-pointer form-btn"
            value={isEditing ? "Update Training" : "Add Training"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className="cursor-pointer form-btn"
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};
export const LangaugesForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
  formSubmitHandler = null,
}: any) => {
  const dispatch = useDispatch();
  const { isSidebar } = useAppContext();
  const { template15 } = useAppContext();
  const stepEleven = useSelector((state: any) => state.register.stepEleven);
  const { list, state } = stepEleven;

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      language: "",
      proficiency: "",
    },

    onSubmit: async (values) => {
      if (formSubmitHandler !== null) {
        formSubmitHandler(values);
        formCloseHandler();
      } else {
        if (isEditing) {
          const updatedList = list.map((singleRec: Language) => {
            if (singleRec.id === rec.id) {
              return values;
            } else {
              return singleRec;
            }
          });
          dispatch(setStepEleven({ list: updatedList }));
          dispatch(setStepEleven({ state: "show" }));
        } else {
          const obj = { id: makeid(), ...values };
          const newList = [obj, ...list];
          dispatch(setStepEleven({ list: newList }));
          dispatch(setStepEleven({ state: "show" }));
        }
        formCloseHandler();
      }
    },

    // validationSchema: Yup.object().shape({
    //   company: Yup.string().required("company is required"),
    // }),
  });

  const pathname = usePathname();
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="mb-4">
          <label
            htmlFor="language"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" || (isSidebar && !template15)
                ? "text-gray-200"
                : "text-gray-950"
            }`}
          >
            Language
          </label>
          <input
            id="language"
            type="text"
            className="form-control"
            placeholder="Language"
            value={formik.values.language}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="proficiency"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" || (isSidebar && !template15)
                ? "text-gray-200"
                : "text-gray-950"
            }`}
          >
            Proficiency
          </label>
          <select
            id="proficiency"
            value={formik.values.proficiency}
            onChange={formik.handleChange}
            className={`form-control ${
              pathname == "/profile-review" || (isSidebar && !template15)
                ? "text-gray-200"
                : "text-gray-950"
            }`}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div
          className={`items-center justify-end ${
            isSidebar ? "flex flex-col gap-4" : "flex flex-row-reverse gap-2"
          }`}
        >
          <input
            type="submit"
            className={`cursor-pointer  ${
              isSidebar
                ? "px-2 py-2 border border-blue-500 text-blue-500 rounded-lg"
                : "form-btn"
            }`}
            value={isEditing ? "Update Language" : "Add Language"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className={`cursor-pointer ${
              isSidebar
                ? "px-2 py-2 border border-blue-500 text-blue-500 rounded-lg"
                : "form-btn"
            }`}
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};
export const ProjectsForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
  formSubmitHandler = null,
}: any) => {
  const dispatch = useDispatch();
  const stepFourteen = useSelector((state: any) => state.register.stepFourteen);
  const { list, state } = stepFourteen;

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },

    onSubmit: async (values) => {
      if (formSubmitHandler !== null) {
        const { description } = values;
        const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

        // Update the values with the description as an array
        const updatedValues = {
          ...values,
          description: descriptionArray,
        };
        formSubmitHandler(updatedValues);
        formCloseHandler();
      } else {
        const { description } = values;
        const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

        // Update the values with the description as an array
        const updatedValues = {
          ...values,
          description: descriptionArray,
        };
        if (isEditing) {
          const updatedList = list.map((singleRec: Interest) => {
            if (singleRec.id === rec.id) {
              return updatedValues;
            } else {
              return singleRec;
            }
          });
          dispatch(setStepFourteen({ list: updatedList }));
          dispatch(setStepFourteen({ state: "show" }));
        } else {
          const obj = { id: makeid(), ...updatedValues };
          const newList = [obj, ...list];
          dispatch(setStepFourteen({ list: newList }));
          dispatch(setStepFourteen({ state: "show" }));
        }

        formCloseHandler();
      }
    },

    validationSchema: Yup.object().shape({
      title: Yup.string().required("title is required"),
    }),
  });
  const pathname = usePathname();
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="mb-4">
          <label
            htmlFor="title"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className={`block mb-2 text-sm font-bold  ${
              pathname == "/profile-review" ? "text-gray-200" : "text-gray-950"
            }`}
          >
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            onChange={formik.handleChange}
            placeholder="Description"
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="flex flex-row-reverse items-center justify-end gap-2">
          <input
            type="submit"
            className="cursor-pointer form-btn"
            value={isEditing ? "Update Project" : "Add Project"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className="cursor-pointer form-btn"
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

const StepCustom = () => {
  const [expanded, setExpanded] = useState<{
    languages: boolean;
    references: boolean;
    publications: boolean;
    certifications: boolean;
    awards: boolean;
    interests: boolean;
    trainings: boolean;
    projects: boolean;
  }>({
    languages: false,
    references: false,
    publications: false,
    awards: false,
    interests: false,
    certifications: false,
    trainings: false,
    projects: false,
  });
  const dispatch = useDispatch();
  const stepEight = useSelector((state: any) => state.register.stepEight);
  const { list: publicationsList } = stepEight;
  const stepSix = useSelector((state: any) => state.register.stepSix);
  const { list: certificationsList } = stepSix;
  const stepSeven = useSelector((state: any) => state.register.stepSeven);
  const { list: trainingsList } = stepSeven;
  const stepNine = useSelector((state: any) => state.register.stepNine);
  const { list: awardsList } = stepNine;
  const stepTen = useSelector((state: any) => state.register.stepTen);
  const { list: interestsList } = stepTen;
  const stepEleven = useSelector((state: any) => state.register.stepEleven);
  const { list: languagesList } = stepEleven;
  const stepTwelve = useSelector((state: any) => state.register.stepTwelve);
  const { list: referencesList } = stepTwelve;
  const stepFourteen = useSelector((state: any) => state.register.stepFourteen);
  const { list: projectsList } = stepFourteen;

  const setExpandedHelper = (key: string) => {
    setExpanded((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [recordName, setRecordName] = useState<string>("");
  const [recordID, setRecordID] = useState<string | undefined>("");
  const handleOpenConfirmationModal = (
    name: string,
    rec_id: string | undefined
  ) => {
    setConfirmationModal(true);
    setRecordName(name);
    setRecordID(rec_id);
  };
  const deleteSingleRecord = (
    section: string,
    recordId: string | undefined
  ) => {
    switch (section) {
      case "publications":
        const newList = publicationsList.filter(
          (rec: Publication) => rec.id !== recordId
        );
        dispatch(setStepEight({ list: newList }));
        setConfirmationModal(false);
        setRecordID("");
        setRecordName("");
        showSuccessToast("Publication has been deleted");
        break;
      case "awards":
        const newAwardsList = awardsList.filter(
          (rec: Award) => rec.id !== recordId
        );
        dispatch(setStepNine({ list: newAwardsList }));
        setConfirmationModal(false);
        setRecordID("");
        setRecordName("");
        showSuccessToast("Award has been deleted");
        break;
      case "certifications":
        const newCertificationsList = certificationsList.filter(
          (rec: Certification) => rec.id !== recordId
        );
        dispatch(setStepSix({ list: newCertificationsList }));
        setConfirmationModal(false);
        setRecordID("");
        setRecordName("");
        showSuccessToast("Certification has been deleted");
        break;
      case "interests":
        const newInterestsList = interestsList.filter(
          (rec: Interest) => rec.id !== recordId
        );
        dispatch(setStepTen({ list: newInterestsList }));
        setConfirmationModal(false);
        setRecordID("");
        setRecordName("");
        showSuccessToast("Interest has been deleted");
        break;
      case "references":
        const newReferencesList = referencesList.filter(
          (rec: Reference) => rec.id !== recordId
        );
        dispatch(setStepTwelve({ list: newReferencesList }));
        setConfirmationModal(false);
        setRecordID("");
        setRecordName("");
        showSuccessToast("Reference has been deleted");
        break;
      case "trainings":
        const newTrainingsList = trainingsList.filter(
          (rec: Training) => rec.id !== recordId
        );
        dispatch(setStepSeven({ list: newTrainingsList }));
        setConfirmationModal(false);
        setRecordID("");
        setRecordName("");
        showSuccessToast("Training has been deleted");
        break;
      case "languages":
        const newLanguagesList = languagesList.filter(
          (rec: Language) => rec.id !== recordId
        );
        dispatch(setStepEleven({ list: newLanguagesList }));
        setConfirmationModal(false);
        setRecordID("");
        setRecordName("");
        showSuccessToast("Language has been deleted");
        break;
      default:
        setConfirmationModal(false);
        setRecordID("");
        setRecordName("");
        showWarningToast("Item not deleted");
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-4 ">
      {confirmationModal && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete ?"
          onConfirm={() => deleteSingleRecord(recordName, recordID)}
          onCancel={() => {
            setConfirmationModal(false);
            setRecordID("");
            setRecordName("");
          }}
        />
      )}

      {/* publications */}
      <div className="w-full">
        <h1 className="form-heading">Publications</h1>
        {publicationsList.length === 0 && <p>No Publications Added</p>}
        <div className="custom-card">
          {publicationsList.map((rec: Publication) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"publications"}
                deleteHandler={() =>
                  handleOpenConfirmationModal("publications", rec.id)
                }
                formCloseHandler={() => setExpandedHelper("publications")}
              />
            </div>
          ))}
        </div>

        {expanded.publications ? (
          <PublicationsForm
            formCloseHandler={() => setExpandedHelper("publications")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("publications")} />
        )}
      </div>
      {/* certifications */}
      <div className="w-full">
        <h1 className="form-heading">Certifications</h1>
        {certificationsList.length === 0 && <p>No Certifications Added</p>}
        <div className="custom-card">
          {certificationsList.map((rec: Certification) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"certifications"}
                deleteHandler={() =>
                  handleOpenConfirmationModal("certifications", rec.id)
                }
                formCloseHandler={() => setExpandedHelper("certifications")}
              />
            </div>
          ))}
        </div>
        {expanded.certifications ? (
          <CertificationsForm
            formCloseHandler={() => setExpandedHelper("certifications")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("certifications")} />
        )}
      </div>
      {/* awards */}
      <div className="w-full">
        <h1 className="form-heading">Awards</h1>
        {awardsList.length === 0 && <p>No Awards Added</p>}
        <div className="custom-card">
          {awardsList.map((rec: Award) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"awards"}
                deleteHandler={() =>
                  handleOpenConfirmationModal("awards", rec.id)
                }
                formCloseHandler={() => setExpandedHelper("awards")}
              />
            </div>
          ))}
        </div>
        {expanded.awards ? (
          <AwardsForm formCloseHandler={() => setExpandedHelper("awards")} />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("awards")} />
        )}
      </div>
      {/* references */}
      <div className="w-full">
        <h1 className="form-heading">References</h1>
        {referencesList.length === 0 && <p>No References Added</p>}
        <div className="custom-card">
          {referencesList.map((rec: Reference) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"references"}
                deleteHandler={() =>
                  handleOpenConfirmationModal("references", rec.id)
                }
                formCloseHandler={() => setExpandedHelper("references")}
              />
            </div>
          ))}
        </div>
        {expanded.references ? (
          <ReferencesForm
            formCloseHandler={() => setExpandedHelper("references")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("references")} />
        )}
      </div>
      {/* trainings */}
      <div className="w-full">
        <h1 className="form-heading">Trainings</h1>
        {trainingsList.length === 0 && <p>No Trainings Added</p>}
        <div className="custom-card">
          {trainingsList.map((rec: Training) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"trainings"}
                deleteHandler={() =>
                  handleOpenConfirmationModal("trainings", rec.id)
                }
                formCloseHandler={() => setExpandedHelper("trainings")}
              />
            </div>
          ))}
        </div>

        {expanded.trainings ? (
          <TrainingForm
            formCloseHandler={() => setExpandedHelper("trainings")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("trainings")} />
        )}
      </div>
      {/* interests */}
      <div className="w-full">
        <h1 className="form-heading">Interests & Hobbies</h1>
        {interestsList.length === 0 && <p>No Interests Added</p>}
        <div className="custom-card">
          {interestsList.map((rec: Interest) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"interests"}
                deleteHandler={() =>
                  handleOpenConfirmationModal("interests", rec.id)
                }
                formCloseHandler={() => setExpandedHelper("interests")}
              />
            </div>
          ))}
        </div>
        {expanded.interests ? (
          <InterestsForm
            formCloseHandler={() => setExpandedHelper("interests")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("interests")} />
        )}
      </div>
      {/* languages */}
      <div className="w-full">
        <h1 className="form-heading">Languages</h1>
        {languagesList.length === 0 && <p>No Languages Added</p>}
        <div className="custom-card">
          {languagesList.map((rec: Language) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"languages"}
                deleteHandler={() =>
                  handleOpenConfirmationModal("languages", rec.id)
                }
                formCloseHandler={() => setExpandedHelper("languages")}
              />
            </div>
          ))}
        </div>
        {expanded.languages ? (
          <LangaugesForm
            formCloseHandler={() => setExpandedHelper("languages")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("languages")} />
        )}
      </div>
      {/* projects */}

      <div className="w-full">
        <h1 className="form-heading">Projects</h1>
        {projectsList.length === 0 && <p>No Projects Added</p>}
        <div className="custom-card">
          {projectsList.map((rec: Project) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"projects"}
                deleteHandler={() =>
                  handleOpenConfirmationModal("projects", rec.id)
                }
                formCloseHandler={() => setExpandedHelper("projects")}
              />
            </div>
          ))}
        </div>
        {expanded.projects ? (
          <ProjectsForm
            formCloseHandler={() => setExpandedHelper("projects")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("projects")} />
        )}
      </div>
    </div>
  );
};

export default StepCustom;

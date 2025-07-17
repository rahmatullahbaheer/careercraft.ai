"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getYearsList, months } from "@/helpers/listsProvider";
import { useSelector } from "react-redux";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import {
  AwardsForm,
  CertificationsForm,
  InterestsForm,
  LangaugesForm,
  ProjectsForm,
  PublicationsForm,
  ReferencesForm,
  TrainingForm,
} from "../profileReview/StepCustom";
import useHandler from "@/hooks/useHandler";
import { makeid } from "@/helpers/makeid";

const years = getYearsList();
type Props = {
  setShowCustomForm: any;
  recName: any;
};

const CustomForm = ({ setShowCustomForm, recName }: Props) => {
  const { handlers } = useHandler();
  const formHandlers: any = {
    publications: async (values: any) => {
      handlers.handleAddNewDetails(recName, values);
    },
    certifications: async (values: any) => {
      handlers.handleAddNewDetails(recName, values);
    },
    trainings: async (values: any) => {
      handlers.handleAddNewDetails(recName, values);
    },
    awards: async (values: any) => {
      handlers.handleAddNewDetails(recName, values);
    },
    projects: async (values: any) => {
      handlers.handleAddNewDetails(recName, values);
    },
    interests: async (values: any) => {
      handlers.handleAddNewDetails(recName, values);
    },
    references: async (values: any) => {
      handlers.handleAddNewDetails(recName, values);
    },
    languages: async (values: any) => {
      handlers.handleAddNewDetails(recName, values);
    },
  };

  return (
    <>
      {recName === "publications" && (
        <PublicationsForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers[recName]}
        />
      )}
      {recName === "certifications" && (
        <CertificationsForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.certifications}
        />
      )}
      {recName === "trainings" && (
        <TrainingForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.trainings}
        />
      )}
      {recName === "awards" && (
        <AwardsForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.awards}
        />
      )}
      {recName === "projects" && (
        <ProjectsForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.projects}
        />
      )}
      {recName === "interests" && (
        <InterestsForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.interests}
        />
      )}
      {recName === "references" && (
        <ReferencesForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.references}
        />
      )}
      {recName === "languages" && (
        <LangaugesForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.languages}
        />
      )}
    </>
  );
};

export default CustomForm;

import ResumeTemplate1 from "@/components/dashboard/resume-templates/templates/template_1";
import ResumeTemplate2 from "@/components/dashboard/resume-templates/templates/template_2";
import ResumeTemplate3 from "@/components/dashboard/resume-templates/templates/template_3";
import ResumeTemplate4 from "@/components/dashboard/resume-templates/templates/template_4";
import ResumeTemplate5 from "@/components/dashboard/resume-templates/templates/template_5";
import ResumeTemplate6 from "@/components/dashboard/resume-templates/templates/template_6";
import ResumeTemplate7 from "@/components/dashboard/resume-templates/templates/template_7";
import ResumeTemplate8 from "@/components/dashboard/resume-templates/templates/template_8";
import ResumeTemplate9 from "@/components/dashboard/resume-templates/templates/template_9";
import ResumeTemplate10 from "@/components/dashboard/resume-templates/templates/template_10";
import ResumeTemplate11 from "@/components/dashboard/resume-templates/templates/template_11";
import ResumeTemplate12 from "@/components/dashboard/resume-templates/templates/template_12";
import ResumeTemplate13 from "@/components/dashboard/resume-templates/templates/template_13";
import ResumeTemplate14 from "@/components/dashboard/resume-templates/templates/template_14";
import ResumeTemplate15 from "@/components/dashboard/resume-templates/templates/template_15";
import ResumeTemplate16 from "@/components/dashboard/resume-templates/templates/template_16";
import ResumeTemplate17 from "@/components/dashboard/resume-templates/templates/template_17";
import ResumeTemplate18 from "@/components/dashboard/resume-templates/templates/template_18";
import ResumeTemplate19 from "@/components/dashboard/resume-templates/templates/template_19";
import ResumeTemplate20 from "@/components/dashboard/resume-templates/templates/template_20";

import { Template } from "@/components/dashboard/resume-templates";

export const ALL_TEMPLATES: Template[] = [
  // {
  //   id: 1,
  //   title: "classic-executive",
  //   tags: ["one-page"],
  //   category: "freemium",
  //   preview: "/assets/images/templates/resume-1.png",
  //   template: (props) => <ResumeTemplate1 {...props} />,
  // },
  {
    id: 1,
    active: false,
    title: "",
    tags: ["one-page"],
    category: "premium",
    preview: "/assets/images/templates/resume-8.png",
    template: (props) => <ResumeTemplate2 {...props} />,
  },
  {
    id: 2,
    active: false,
    title: "classic-executive",
    tags: ["classic-executive"],
    category: "premium",
    preview: "/assets/images/templates/resume-3.png",
    template: (props) => <ResumeTemplate3 {...props} />,
  },
  {
    id: 3,
    title: "",
    active: false,
    tags: ["classic-executive"],
    category: "premium",
    preview: "/assets/images/templates/resume-4.png",
    template: (props) => <ResumeTemplate4 {...props} />,
  },
  {
    id: 4,
    title: "",
    active: false,
    tags: ["classic-executive"],
    category: "premium",
    preview: "/assets/images/templates/resume-20.png",
    template: (props) => <ResumeTemplate20 {...props} />,
  },

  {
    id: 5,
    active: false,
    title: "",
    tags: ["classic-executive"],
    category: "premium",
    preview: "/assets/images/templates/resume-6.png",
    template: (props) => <ResumeTemplate6 {...props} />,
  },
  {
    id: 6,
    title: "",
    active: false,
    tags: ["classic-executive"],
    category: "premium",
    preview: "/assets/images/templates/resume-7.png",
    template: (props) => <ResumeTemplate7 {...props} />,
  },
  {
    id: 7,
    title: "",
    active: true,
    tags: ["classic-executive"],
    category: "premium",
    preview: "/assets/images/templates/resume-8.png",
    template: (props) => <ResumeTemplate8 {...props} />,
  },
  {
    id: 8,
    title: "",
    active: false,
    tags: ["classic-executive"],
    category: "premium",
    preview: "/assets/images/templates/resume-9.png",
    template: (props) => <ResumeTemplate9 {...props} />,
  },
  {
    id: 9,
    title: "",
    active: false,
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-10.png",
    template: (props) => <ResumeTemplate10 {...props} />,
  },
  {
    id: 10,
    title: "",
    active: false,
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-11.png",
    template: (props) => <ResumeTemplate11 {...props} />,
  },
  {
    id: 11,
    title: "",
    active: false,
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-12.png",
    template: (props) => <ResumeTemplate12 {...props} />,
  },
  {
    id: 12,
    title: "",
    active: false,
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-13.png",
    template: (props) => <ResumeTemplate13 {...props} />,
  },
  {
    id: 13,
    title: "",
    active: false,
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-14.png",
    template: (props) => <ResumeTemplate14 {...props} />,
  },
  {
    id: 14,
    title: "",
    active: false,
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-15.png",
    template: (props) => <ResumeTemplate15 {...props} />,
  },
  {
    id: 15,
    title: "",
    active: false,
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-16.png",
    template: (props) => <ResumeTemplate16 {...props} />,
  },
  {
    id: 16,
    title: "",
    active: false,
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-17.png",
    template: (props) => <ResumeTemplate17 {...props} />,
  },
  {
    id: 17,
    title: "",
    active: false,
    tags: ["one-page"],
    category: "premium",
    preview: "/assets/images/templates/resume-18.png",
    template: (props) => <ResumeTemplate18 {...props} />,
  },
  {
    id: 18,
    title: "",
    active: false,
    tags: ["one-page"],
    category: "premium",
    preview: "/assets/images/templates/resume-19.png",
    template: (props) => <ResumeTemplate19 {...props} />,
  },
  {
    id: 19,
    title: "",
    active: false,
    tags: ["classic-executive"],
    category: "premium",
    preview: "/assets/images/templates/resume-5.png",
    template: (props) => <ResumeTemplate5 {...props} />,
  },
];

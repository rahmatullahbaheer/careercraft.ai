const cvHeadings: any = [
  {
    text: "",
    section: "email",
    headingKey: "contact",
    styles: "",
    attributes: [],
  },
  {
    text: "executive summary",
    section: "summary",
    headingKey: "summary",
    styles:
      "font-semibold border-t-2 border-b-2 border-gray-950/80 mt-2 flex flex-row items-center uppercase text-base text-gray-950/80 py-0.5",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "work experience",
    section: "workExperienceArray",
    headingKey: "workExperienceArray",
    attributes: [{ "icon-color": "black" }],
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center text-gray-950/80 py-0.5",
  },
  {
    text: "skills",
    section: "primarySkills",
    headingKey: "primarySkills",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "education",
    section: "education",
    headingKey: "education",
    attributes: [{ "icon-color": "black" }],
    styles:
      "font-semibold border-t-2 border-b-2 border-gray-950/80 mt-2 w-full uppercase text-base flex flex-row items-center text-gray-950/80 py-0.5",
  },
  {
    text: "certificates",
    section: "certifications",
    headingKey: "certifications",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "awards",
    section: "awards",
    headingKey: "awards",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "publications",
    section: "publications",
    headingKey: "publications",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "languages",
    section: "languages",
    headingKey: "languages",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "references",
    section: "references",
    headingKey: "references",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "interests",
    section: "interests",
    headingKey: "interests",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "Trainings",
    section: "trainings",
    headingKey: "trainings",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "Projects",
    section: "projects",
    headingKey: "projects",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
];

const templateLayout: any = {
  styles: "w-full",
  attributes: [{ "template-no": "8" }],

  fragment: {
    styles: "flex flex-col bg-white fragment py-5",
    header: {
      styles:
        "text-black relative m-2 flex flex-col w-[98%] justify-start items-start",
      elements: [
        {
          id: "name",
        },
        {
          id: "jobTitle",
        },
        {
          id: "shortName",
        },
      ],
    },
    contact: {
      styles:
        "flex flex-row flex-wrap text-base w-[98%] justify-between px-6 items-center m-2 p-3 gap-4",
      elements: [
        {
          id: "phone",
        },
        {
          id: "email",
        },
        {
          id: "linkedIn",
        },
        {
          id: "address",
        },
      ],
    },
    summary: {
      styles: "bg-red text-black text-justify px-6",
      elements: [
        {
          id: "summary",
        },
      ],
    },
    skills: {
      styles:
        "bg-red text-black w-full flex-1 gap-2 flex flex-row flex-wrap justify-start items-start px-6 my-6",
      elements: [
        {
          id: "primarySkills",
        },
      ],
    },
    workExperienceArray: {
      styles: "flex flex-col px-6 w-full",

      elements: [
        {
          id: "workExperienceArray",
        },
      ],
    },
    publications: {
      styles: "flex flex-col px-6 w-full text-gray-950/80",
      elements: [
        {
          id: "publications",
        },
      ],
    },
    certifications: {
      styles: "flex flex-col px-6 w-full text-gray-950/80",
      elements: [
        {
          id: "certifications",
        },
      ],
    },
    awards: {
      styles: "flex flex-col px-6 w-full text-gray-950/80",
      elements: [
        {
          id: "awards",
        },
      ],
    },
    trainings: {
      styles: "flex flex-col px-6 w-full text-gray-950/80",
      elements: [
        {
          id: "trainings",
        },
      ],
    },
    languages: {
      styles:
        "text-black flex flex-wrap justify-start items-start gap-3 px-6 text-gray-950/80",
      elements: [
        {
          id: "languages",
        },
      ],
    },
    interests: {
      styles:
        "text-black flex flex-col justify-start items-start gap-3 px-6 text-gray-950/80",
      elements: [
        {
          id: "interests",
        },
      ],
    },
    projects: {
      styles: "flex flex-col px-6 w-full text-gray-950/80",
      elements: [
        {
          id: "projects",
        },
      ],
    },
    references: {
      styles:
        "text-black flex flex-wrap justify-start items-start gap-3 px-6 text-gray-950/80",
      elements: [
        {
          id: "references",
        },
      ],
    },
    education: {
      styles:
        "text-gray-950/80 flex flex-row flex-wrap justify-start items-start px-6 w-full",
      elements: [
        {
          id: "education",
        },
      ],
    },
  },
};
const components: any = {
  shortName: {
    styles:
      "h-8 w-8 absolute right-16 border text-xl p-10 -ml-2 translate-x-2/4 font-semibold flex justify-center items-center rounded-full bg-gray-900 text-white text-center",
    tag: "span",
  },
  name: {
    styles:
      "text-2xl font-bold flex text-gray-950/80 items-center w-[70%] mx-6",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles: "text-base flex text-gray-950/80 w-[70%] mb-2 px-6 ",
  },
  contact: {
    styles: "w-full",
    elements: [
      {
        id: "phone",
        styles:
          "text-xs text-gray-950/80 mt-2 before:aspect-square break-all before:break-normal before:content-[url('data:image/svg+xml;base64,IDxzdmcKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgIGZpbGw9IiMwMDAwMDAiCiAgICBjbGFzc05hbWU9InctNCBoLTQiCiAgPgogICAgPHBhdGgKICAgICAgZmlsbFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0xLjUgNC41YTMgMyAwIDAgMSAzLTNoMS4zNzJjLjg2IDAgMS42MS41ODYgMS44MTkgMS40MmwxLjEwNSA0LjQyM2ExLjg3NSAxLjg3NSAwIDAgMS0uNjk0IDEuOTU1bC0xLjI5My45N2MtLjEzNS4xMDEtLjE2NC4yNDktLjEyNi4zNTJhMTEuMjg1IDExLjI4NSAwIDAgMCA2LjY5NyA2LjY5N2MuMTAzLjAzOC4yNS4wMDkuMzUyLS4xMjZsLjk3LTEuMjkzYTEuODc1IDEuODc1IDAgMCAxIDEuOTU1LS42OTRsNC40MjMgMS4xMDVjLjgzNC4yMDkgMS40Mi45NTkgMS40MiAxLjgyVjE5LjVhMyAzIDAgMCAxLTMgM2gtMi4yNUM4LjU1MiAyMi41IDEuNSAxNS40NDggMS41IDYuNzVWNC41WiIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAvPgogIDwvc3ZnPg==')] before:w-4 before:h-4 flex before:mr-2",
        tag: "span",
      },
      {
        id: "email",
        styles:
          "text-xs break-all before:break-normal before:aspect-square text-gray-950/80 mt-2 before:w-4 before:h-4 before:content-[url('data:image/svg+xml;base64,IDxzdmcKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgIGZpbGw9ImN1cnJlbnRDb2xvciIKICAgIGNsYXNzTmFtZT0idy00IGgtNCIKICA+CiAgICA8cGF0aCBkPSJNMS41IDguNjd2OC41OGEzIDMgMCAwIDAgMyAzaDE1YTMgMyAwIDAgMCAzLTNWOC42N2wtOC45MjggNS40OTNhMyAzIDAgMCAxLTMuMTQ0IDBMMS41IDguNjdaIiAvPgogICAgPHBhdGggZD0iTTIyLjUgNi45MDhWNi43NWEzIDMgMCAwIDAtMy0zaC0xNWEzIDMgMCAwIDAtMyAzdi4xNThsOS43MTQgNS45NzhhMS41IDEuNSAwIDAgMCAxLjU3MiAwTDIyLjUgNi45MDhaIiAvPgogIDwvc3ZnPg==')] flex before:mr-2",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles:
          "text-xs break-all before:break-normal before:aspect-square text-gray-950/80 mt-2 before:w-4 before:h-4 before:mr-2 flex before:content-[url('data:image/svg+xml;base64,IDxzdmcKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHdpZHRoPSIxNnB4IgogICAgaGVpZ2h0PSIxNnB4IgogICAgdmlld0JveD0iMCAwIDE2IDE2IgogICAgdmVyc2lvbj0iMS4xIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogID4KICAgIDxnPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsUnVsZT0ibm9uemVybyIKICAgICAgICBmaWxsPSIjMDAwMDAwIgogICAgICAgIGZpbGxPcGFjaXR5PSIxIgogICAgICAgIGQ9Ik0gMTQuMzkwNjI1IDAuNTAzOTA2IEwgMS41OTM3NSAwLjUwMzkwNiBDIDAuOTk2MDk0IDAuNSAwLjUwNzgxMiAwLjk4NDM3NSAwLjUwMzkwNiAxLjU4MjAzMSBMIDAuNTAzOTA2IDE0LjQxNzk2OSBDIDAuNTA3ODEyIDE1LjAxNTYyNSAwLjk5NjA5NCAxNS40OTYwOTQgMS41OTM3NSAxNS40OTYwOTQgTCAxNC40MDIzNDQgMTUuNDk2MDk0IEMgMTUgMTUuNDk2MDk0IDE1LjQ4ODI4MSAxNS4wMTU2MjUgMTUuNSAxNC40MTc5NjkgTCAxNS41IDEuNTgyMDMxIEMgMTUuNDg4MjgxIDAuOTg0Mzc1IDE1IDAuNSAxNC40MDIzNDQgMC41MDM5MDYgTCAxNC4zODY3MTkgMC41MDM5MDYgWiBNIDQuOTQ5MjE5IDEzLjI4MTI1IEwgMi43MjI2NTYgMTMuMjgxMjUgTCAyLjcyMjY1NiA2LjEyNSBMIDQuOTQ5MjE5IDYuMTI1IFogTSAzLjgzNTkzOCA1LjE0ODQzOCBDIDMuMTI1IDUuMTQ4NDM4IDIuNTQ2ODc1IDQuNTcwMzEyIDIuNTQ2ODc1IDMuODU1NDY5IEMgMi41NDY4NzUgMy4xNDQ1MzEgMy4xMjUgMi41NjY0MDYgMy44MzU5MzggMi41NjY0MDYgQyA0LjU0Njg3NSAyLjU2NjQwNiA1LjEyNSAzLjE0NDUzMSA1LjEyNSAzLjg1NTQ2OSBMIDUuMTI1IDMuODU5Mzc1IEMgNS4xMjUgNC41NzAzMTIgNC41NTA3ODEgNS4xNDg0MzggMy44Mzk4NDQgNS4xNDg0MzggWiBNIDEzLjI3NzM0NCAxMy4yODEyNSBMIDExLjA1ODU5NCAxMy4yODEyNSBMIDExLjA1ODU5NCA5LjgwMDc4MSBDIDExLjA1ODU5NCA4Ljk3MjY1NiAxMS4wMzkwNjIgNy45MDIzNDQgOS45MDIzNDQgNy45MDIzNDQgQyA4Ljc0MjE4OCA3LjkwMjM0NCA4LjU2NjQwNiA4LjgwODU5NCA4LjU2NjQwNiA5Ljc0MjE4OCBMIDguNTY2NDA2IDEzLjI4MTI1IEwgNi4zNDM3NSAxMy4yODEyNSBMIDYuMzQzNzUgNi4xMjUgTCA4LjQ3NjU2MiA2LjEyNSBMIDguNDc2NTYyIDcuMTAxNTYyIEwgOC41MDc4MTIgNy4xMDE1NjIgQyA4Ljk0NTMxMiA2LjM1NTQ2OSA5Ljc1MzkwNiA1LjkxNDA2MiAxMC42MTcxODggNS45NDUzMTIgTCAxMC42MTMyODEgNS45NDUzMTIgQyAxMi44NjMyODEgNS45NDUzMTIgMTMuMjc3MzQ0IDcuNDI1NzgxIDEzLjI3NzM0NCA5LjM1NTQ2OSBaIE0gMTMuMjc3MzQ0IDEzLjI4MTI1ICIKICAgICAgLz4KICAgIDwvZz4KICA8L3N2Zz4=')] before:justify-center before:items-center flex",
        tag: "a",
      },
      {
        id: "address",
        styles:
          "text-xs break-all before:break-normal before:aspect-square text-gray-950/80 mt-2 before:w-4 before:h-4 before:content-[url('data:image/svg+xml;base64,IDxzdmcKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgIGZpbGw9ImN1cnJlbnRDb2xvciIKICAgIGNsYXNzTmFtZT0idy00IGgtNCIKICA+CiAgICA8cGF0aCBkPSJNMTEuNDcgMy44NDFhLjc1Ljc1IDAgMCAxIDEuMDYgMGw4LjY5IDguNjlhLjc1Ljc1IDAgMSAwIDEuMDYtMS4wNjFsLTguNjg5LTguNjlhMi4yNSAyLjI1IDAgMCAwLTMuMTgyIDBsLTguNjkgOC42OWEuNzUuNzUgMCAxIDAgMS4wNjEgMS4wNmw4LjY5LTguNjg5WiIgLz4KICAgIDxwYXRoIGQ9Im0xMiA1LjQzMiA4LjE1OSA4LjE1OWMuMDMuMDMuMDYuMDU4LjA5MS4wODZ2Ni4xOThjMCAxLjAzNS0uODQgMS44NzUtMS44NzUgMS44NzVIMTVhLjc1Ljc1IDAgMCAxLS43NS0uNzV2LTQuNWEuNzUuNzUgMCAwIDAtLjc1LS43NWgtM2EuNzUuNzUgMCAwIDAtLjc1Ljc1VjIxYS43NS43NSAwIDAgMS0uNzUuNzVINS42MjVhMS44NzUgMS44NzUgMCAwIDEtMS44NzUtMS44NzV2LTYuMTk4YTIuMjkgMi4yOSAwIDAgMCAuMDkxLS4wODZMMTIgNS40MzJaIiAvPgogIDwvc3ZnPg==')] flex before:mr-2",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles: "text-xs text-gray-950/80 inline-block w-[32%]",
    tag: "span",
  },
  summary: {
    styles: "text-justify my-4 text-xs text-gray-950/80",
    tag: "span",
  },
  workExperienceArray: {
    styles: "my-2",
    elements: [
      {
        id: "title",
        styles: "text-base text-gray-950/80 mt-2 font-bold",
        tag: "span",
      },
      {
        styles: "flex gap-1 font-semibold pb-2 text-xs flex-wrap",
        tag: "div",
        container: [
          { id: "fromMonth", styles: "text-gray-950/80", tag: "span" },
          { id: "fromYear", styles: "text-gray-950/80", tag: "span" },
          {
            id: "toMonth",
            styles:
              "before:content-['-'] before:w-4 before:h-4 before:text-gray-950/80 text-gray-950/80 before:mr-1",
            tag: "span",
          },
          { id: "toYear", styles: "text-gray-950/80", tag: "span" },
          {
            id: "company",
            styles:
              "before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
            tag: "span",
          },
          {
            id: "cityState",
            styles:
              "before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 text-gray-950/80",
            tag: "span",
          },
          {
            id: "country",
            styles:
              "text-gray-950/80 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
          // { id: "isContinue", styles: "", tag: "span" },
        ],
      },
      {
        id: "achievements",
        styles:
          "text-xs flex text-justify text-gray-950/80 pb-1 before:content-['\\2022'] before:mr-2",
        tag: "span",
      },
    ],
  },
  education: {
    tag: "div",
    styles: "",
    elements: [
      {
        tag: "div",
        styles: "bg-gray-200 flex flex-col w-[30%] p-4 rounded-md",
        container: [
          {
            id: "educationLevel",
            styles: "font-semibold text-base",
            tag: "span",
          },
          { id: "fieldOfStudy", styles: "text-xs font-semibold", tag: "span" },
          {
            id: "schoolName",
            styles: "italic text-xs font-normal",
            tag: "span",
          },
          {
            id: "schoolLocation",
            styles: "text-xs italic font-normal",
            tag: "span",
          },
          {
            styles: "flex flex-row gap-2 italic",
            tag: "div",
            container: [
              { id: "fromMonth", styles: "text-xs", tag: "span" },
              {
                id: "fromYear",
                styles:
                  "text-xs after:content-['-'] after:w-4 after:h-4 after:text-gray-950/80 after:ml-2",
                tag: "span",
              },
              {
                id: "toMonth",
                styles: "text-xs",
                tag: "span",
              },
              { id: "toYear", styles: "text-xs", tag: "span" },
              // { id: "isContinue", styles: "", tag: "span" },
            ],
          },
        ],
      },
    ],
  },
  publications: {
    styles: "my-1",
    elements: [
      {
        id: "title",
        styles: "text-sm mt-1 font-semibold text-gray-950/80",
        tag: "span",
      },
      {
        styles:
          "flex gap-1 font-semibold pb-2 text-xs flex-wrap text-gray-950/80",
        tag: "div",
        container: [
          { id: "date", styles: "text-gray-950/80", tag: "span" },
          {
            id: "publisher",
            styles:
              "text-gray-950/80 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
        ],
      },
      {
        id: "description",
        styles:
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
        tag: "span",
      },
    ],
  },
  certifications: {
    styles: "my-1",
    elements: [
      {
        id: "title",
        styles: "text-sm mt-1 font-semibold text-gray-950/80",
        tag: "span",
      },
      {
        styles:
          "flex gap-1 font-semibold pb-2 text-xs flex-wrap text-gray-950/80",
        tag: "div",
        container: [
          { id: "date", styles: "text-gray-950/80", tag: "span" },
          {
            id: "issuingOrganization",
            styles:
              "text-gray-950/80 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
        ],
      },
      {
        id: "description",
        styles:
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
        tag: "span",
      },
    ],
  },
  projects: {
    styles: "my-1",
    elements: [
      {
        id: "title",
        styles: "text-sm mt-1 font-semibold text-gray-950/80",
        tag: "span",
      },
      {
        id: "description",
        styles:
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
        tag: "span",
      },
    ],
  },
  interests: {
    styles: "my-2",
    elements: [
      {
        id: "description",
        styles:
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
        tag: "span",
      },
    ],
  },
  awards: {
    styles: "my-1",
    elements: [
      {
        id: "title",
        styles: "text-sm mt-1 font-semibold text-gray-950/80",
        tag: "span",
      },
      {
        styles:
          "flex gap-1 font-semibold pb-2 text-xs flex-wrap text-gray-950/80",
        tag: "div",
        container: [
          { id: "date", styles: "text-gray-950/80", tag: "span" },
          {
            id: "awardingOrganization",
            styles:
              "text-gray-950/80 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
        ],
      },
      {
        id: "description",
        styles:
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
        tag: "span",
      },
    ],
  },
  trainings: {
    styles: "my-1",
    elements: [
      {
        id: "position",
        styles: "text-sm mt-1 font-semibold text-gray-950/80",
        tag: "span",
      },

      {
        styles:
          "flex gap-1 font-semibold pb-2 text-xs flex-wrap text-gray-950/80",
        tag: "div",
        container: [
          { id: "startDate", styles: "text-gray-950/80", tag: "span" },
          {
            id: "endDate",
            styles:
              "before:content-['-'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-1 text-gray-950/80",
            tag: "span",
          },
          {
            id: "company",
            styles:
              "text-gray-950/80 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
        ],
      },
      {
        id: "description",
        styles:
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
        tag: "span",
      },
    ],
  },
  references: {
    tag: "div",
    styles: "",
    elements: [
      {
        tag: "div",
        styles:
          "bg-gray-200 flex flex-col w-[31%] p-4 rounded-md text-gray-950/80",
        container: [
          {
            id: "name",
            styles: "font-semibold text-base text-gray-950/80",
            tag: "span",
          },
          {
            id: "position",
            styles: "text-xs font-semibold text-gray-950/80",
            tag: "span",
          },
          {
            id: "company",
            styles: "italic text-xs font-normal text-gray-950/80",
            tag: "span",
          },
          {
            id: "contactInformation",
            styles: "text-xs italic font-normal text-gray-950/80",
            tag: "span",
          },
        ],
      },
    ],
  },
  languages: {
    tag: "div",
    styles: "space-y-2",
    elements: [
      {
        tag: "div",
        styles:
          "flex flex-row justify-start items-center w-[31%] text-gray-950/80",
        container: [
          {
            id: "language",
            styles: "font-semibold text-sm text-gray-950/80 after:ml-2",
            tag: "span",
          },
          {
            id: "proficiency",
            styles:
              "text-xs font-normal text-gray-950/80 before:content-['-'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
        ],
      },
    ],
  },
};

const GenerationOrder = [
  "shortName",
  "name",
  "jobTitle",
  "contact",
  "primarySkills",
  "summary",
  "workExperienceArray",
  "publications",
  "certifications",
  "awards",
  "trainings",
  "languages",
  "interests",
  "projects",
  "references",
  "education",
];
export const template = {
  components,
  templateLayout,
  cvHeadings,
  GenerationOrder,
};

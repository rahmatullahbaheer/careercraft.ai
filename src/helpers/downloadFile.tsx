"use client";
// import { useColorContext } from "@/context/ResumeColorContext";
import { useRef, useState } from "react";

const DownloadService = ({
  componentRef,
  view,
  card,
  type,
  fileName,
  preview,
}:
any) => {
  const docRef = useRef<HTMLAnchorElement | null>(null);
  // const { color } = useColorContext();
  let htmlToDoc: string;
  const [loading, setLoading] = useState<boolean>(false);

  const templateCall = async () => {
    setLoading(true);
    if (card && type) {
      if (type === "coverLetter") {
        htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
        body {
          padding: 24px;
        }</style>
        ${card.coverLetterText}
        `;
      } else if (type === "email") {
        htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>
         <style>
        body {
          padding: 24px;
        }</style>
        ${card.emailText}
        `;
      } else if (type === "consultingBid") {
        htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>\
         <style>
        body {
          padding: 24px;
        }</style>
        ${card.consultingBidText}
        `;
      }
    } else if (type === "onPage") {
      const html = componentRef.current.outerHTML;
      htmlToDoc = `
      <script src="https://cdn.tailwindcss.com"></script>
       <style>
        body {
           padding: 24px;
        }</style>      
      ${html}`;
    } else {
      if (view) {
        await view();
      }
      const html = componentRef.current.outerHTML;
      htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
* {
  box-sizing: border-box;
}

h2[data-name="email"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="email"][data-icon-color="white"][data-type-heading="true"]::before,
h2[data-name="summary"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="summary"][data-icon-color="white"][data-type-heading="true"]::before,
h2[data-name="primarySkills"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="primarySkills"][data-icon-color="white"][data-type-heading="true"]::before,
h2[data-name="education"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="education"][data-icon-color="white"][data-type-heading="true"]::before,
h2[data-name="workExperienceArray"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="workExperienceArray"][data-icon-color="white"][data-type-heading="true"]::before,
h2[data-name="publications"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="publications"][data-icon-color="white"][data-type-heading="true"]::before,
h2[data-name="references"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="references"][data-icon-color="white"][data-type-heading="true"]::before,
h2[data-name="awards"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="awards"][data-icon-color="white"][data-type-heading="true"]::before,
h2[data-name="trainings"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="trainings"][data-icon-color="white"][data-type-heading="true"]::before,
h2[data-name="certifications"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="certifications"][data-icon-color="white"][data-type-heading="true"]::before,
h2[data-name="languages"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="languages"][data-icon-color="white"][data-type-heading="true"]::before,
h2[data-name="interests"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="interests"][data-icon-color="white"][data-type-heading="true"]::before,
h2[data-name="projects"][data-icon-color="black"][data-type-heading="true"]::before,
h2[data-name="projects"][data-icon-color="white"][data-type-heading="true"]::before,
[data-primarySkills-index]::before,
[data-achievements-index]::before, [data-description-index]::before {
  font-family: sans-serif;
  font-size: 16px;
  color: currentColor;
  display: inline-block;
  height: 16px !important;
  width: 16px !important;
  margin-right: 6px;
  aspect-ratio: 1/1;
}

h2[data-name="email"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzMzMzMzMyIgY2xhc3M9InctNiBoLTYiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTQuNSAzLjc1YTMgMyAwIDAgMC0zIDN2MTAuNWEzIDMgMCAwIDAgMyAzaDE1YTMgMyAwIDAgMCAzLTNWNi43NWEzIDMgMCAwIDAtMy0zaC0xNVptNC4xMjUgM2EyLjI1IDIuMjUgMCAxIDAgMCA0LjUgMi4yNSAyLjI1IDAgMCAwIDAtNC41Wm0tMy44NzMgOC43MDNhNC4xMjYgNC4xMjYgMCAwIDEgNy43NDYgMCAuNzUuNzUgMCAwIDEtLjM1MS45MiA3LjQ3IDcuNDcgMCAwIDEtMy41MjIuODc3IDcuNDcgNy40NyAwIDAgMS0zLjUyMi0uODc3Ljc1Ljc1IDAgMCAxLS4zNTEtLjkyWk0xNSA4LjI1YS43NS43NSAwIDAgMCAwIDEuNWgzLjc1YS43NS43NSAwIDAgMCAwLTEuNUgxNVpNMTQuMjUgMTJhLjc1Ljc1IDAgMCAxIC43NS0uNzVoMy43NWEuNzUuNzUgMCAwIDEgMCAxLjVIMTVhLjc1Ljc1IDAgMCAxLS43NS0uNzVabS43NSAyLjI1YS43NS43NSAwIDAgMCAwIDEuNWgzLjc1YS43NS43NSAwIDAgMCAwLTEuNUgxNVoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KPC9zdmc+Cgo=");
}
h2[data-name="email"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9InctNiBoLTYiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTQuNSAzLjc1YTMgMyAwIDAgMC0zIDN2MTAuNWEzIDMgMCAwIDAgMyAzaDE1YTMgMyAwIDAgMCAzLTNWNi43NWEzIDMgMCAwIDAtMy0zaC0xNVptNC4xMjUgM2EyLjI1IDIuMjUgMCAxIDAgMCA0LjUgMi4yNSAyLjI1IDAgMCAwIDAtNC41Wm0tMy44NzMgOC43MDNhNC4xMjYgNC4xMjYgMCAwIDEgNy43NDYgMCAuNzUuNzUgMCAwIDEtLjM1MS45MiA3LjQ3IDcuNDcgMCAwIDEtMy41MjIuODc3IDcuNDcgNy40NyAwIDAgMS0zLjUyMi0uODc3Ljc1Ljc1IDAgMCAxLS4zNTEtLjkyWk0xNSA4LjI1YS43NS43NSAwIDAgMCAwIDEuNWgzLjc1YS43NS43NSAwIDAgMCAwLTEuNUgxNVpNMTQuMjUgMTJhLjc1Ljc1IDAgMCAxIC43NS0uNzVoMy43NWEuNzUuNzUgMCAwIDEgMCAxLjVIMTVhLjc1Ljc1IDAgMCAxLS43NS0uNzVabS43NSAyLjI1YS43NS43NSAwIDAgMCAwIDEuNWgzLjc1YS43NS43NSAwIDAgMCAwLTEuNUgxNVoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KPC9zdmc+Cgo=");
}
h2[data-name="summary"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0idy00IGgtNCI+CiAgPHBhdGggZD0iTTggOGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZaTTEyLjczNSAxNGMuNjE4IDAgMS4wOTMtLjU2MS44NzItMS4xMzlhNi4wMDIgNi4wMDIgMCAwIDAtMTEuMjE1IDBjLS4yMi41NzguMjU0IDEuMTM5Ljg3MiAxLjEzOWg5LjQ3WiIgLz4KPC9zdmc+Cg==");
}
h2[data-name="summary"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9InctNCBoLTQiPgogIDxwYXRoIGQ9Ik04IDhhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2Wk0xMi43MzUgMTRjLjYxOCAwIDEuMDkzLS41NjEuODcyLTEuMTM5YTYuMDAyIDYuMDAyIDAgMCAwLTExLjIxNSAwYy0uMjIuNTc4LjI1NCAxLjEzOS44NzIgMS4xMzloOS40N1oiIC8+Cjwvc3ZnPg==");
}
h2[data-name="primarySkills"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0idy00IGgtNCI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTUgNC41QTMuNSAzLjUgMCAwIDEgMTEuNDM1IDhjLS45OS0uMDE5LTIuMDkzLjEzMi0yLjcuOTEzbC00LjEzIDUuMzFhMi4wMTUgMi4wMTUgMCAxIDEtMi44MjctMi44MjhsNS4zMDktNC4xM2MuNzgtLjYwNy45MzItMS43MS45MTQtMi43TDggNC41YTMuNSAzLjUgMCAwIDEgNC40NzctMy4zNjJjLjMyNS4wOTQuMzkuNDk3LjE1LjczNkwxMC42IDMuOTAyYS40OC40OCAwIDAgMC0uMDMzLjY1M2MuMjcxLjMxNC41NjUuNjA4Ljg3OS44NzlhLjQ4LjQ4IDAgMCAwIC42NTMtLjAzM2wyLjAyNy0yLjAyN2MuMjM5LS4yNC42NDItLjE3NS43MzYuMTUuMDkuMzEuMTM4LjYzNy4xMzguOTc2Wk0zLjc1IDEzYS43NS43NSAwIDEgMS0xLjUgMCAuNzUuNzUgMCAwIDEgMS41IDBaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIC8+CiAgPHBhdGggZD0iTTExLjUgOS41Yy4zMTMgMCAuNjItLjAyOS45MTctLjA4NGwxLjk2MiAxLjk2MmEyLjEyMSAyLjEyMSAwIDAgMS0zIDNsLTIuODEtMi44MSAxLjM1LTEuNzM0Yy4wNS0uMDY0LjE1OC0uMTU4LjQyNi0uMjMzLjI3OC0uMDc4LjYzOS0uMTEgMS4wNjItLjEwMmwuMDkzLjAwMVpNNSA0bDEuNDQ2IDEuNDQ1YTIuMjU2IDIuMjU2IDAgMCAxLS4wNDcuMjFjLS4wNzUuMjY4LS4xNjkuMzc3LS4yMzMuNDI3bC0uNjEuNDc0TDQgNUgyLjY1NWEuMjUuMjUgMCAwIDEtLjIyNC0uMTM5bC0xLjM1LTIuN2EuMjUuMjUgMCAwIDEgLjA0Ny0uMjg5bC43NDUtLjc0NWEuMjUuMjUgMCAwIDEgLjI4OS0uMDQ3bDIuNyAxLjM1QS4yNS4yNSAwIDAgMSA1IDIuNjU0VjRaIiAvPgo8L3N2Zz4K");
}
h2[data-name="primarySkills"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9InctNCBoLTQiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIKICAgIGQ9Ik0xNSA0LjVBMy41IDMuNSAwIDAgMSAxMS40MzUgOGMtLjk5LS4wMTktMi4wOTMuMTMyLTIuNy45MTNsLTQuMTMgNS4zMWEyLjAxNSAyLjAxNSAwIDEgMS0yLjgyNy0yLjgyOGw1LjMwOS00LjEzYy43OC0uNjA3LjkzMi0xLjcxLjkxNC0yLjdMOCA0LjVhMy41IDMuNSAwIDAgMSA0LjQ3Ny0zLjM2MmMuMzI1LjA5NC4zOS40OTcuMTUuNzM2TDEwLjYgMy45MDJhLjQ4LjQ4IDAgMCAwLS4wMzMuNjUzYy4yNzEuMzE0LjU2NS42MDguODc5Ljg3OWEuNDguNDggMCAwIDAgLjY1My0uMDMzbDIuMDI3LTIuMDI3Yy4yMzktLjI0LjY0Mi0uMTc1LjczNi4xNS4wOS4zMS4xMzguNjM3LjEzOC45NzZaTTMuNzUgMTNhLjc1Ljc1IDAgMSAxLTEuNSAwIC43NS43NSAwIDAgMSAxLjUgMFoiCiAgICBjbGlwLXJ1bGU9ImV2ZW5vZGQiIC8+CiAgPHBhdGgKICAgIGQ9Ik0xMS41IDkuNWMuMzEzIDAgLjYyLS4wMjkuOTE3LS4wODRsMS45NjIgMS45NjJhMi4xMjEgMi4xMjEgMCAwIDEtMyAzbC0yLjgxLTIuODEgMS4zNS0xLjczNGMuMDUtLjA2NC4xNTgtLjE1OC40MjYtLjIzMy4yNzgtLjA3OC42MzktLjExIDEuMDYyLS4xMDJsLjA5My4wMDFaTTUgNGwxLjQ0NiAxLjQ0NWEyLjI1NiAyLjI1NiAwIDAgMS0uMDQ3LjIxYy0uMDc1LjI2OC0uMTY5LjM3Ny0uMjMzLjQyN2wtLjYxLjQ3NEw0IDVIMi42NTVhLjI1LjI1IDAgMCAxLS4yMjQtLjEzOWwtMS4zNS0yLjdhLjI1LjI1IDAgMCAxIC4wNDctLjI4OWwuNzQ1LS43NDVhLjI1LjI1IDAgMCAxIC4yODktLjA0N2wyLjcgMS4zNUEuMjUuMjUgMCAwIDEgNSAyLjY1NFY0WiIgLz4KPC9zdmc+");
}
h2[data-name="education"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0idy00IGgtNCI+CiAgPHBhdGggZD0iTTcuNzAyIDEuMzY4YS43NS43NSAwIDAgMSAuNTk3IDBjMi4wOTguOTEgNC4xMDUgMS45OSA2LjAwNCAzLjIyM2EuNzUuNzUgMCAwIDEtLjE5NCAxLjM0OEEzNC4yNyAzNC4yNyAwIDAgMCA4LjM0MSA4LjI1YS43NS43NSAwIDAgMS0uNjgyIDBjLS42MjUtLjMyLTEuMjYyLS42Mi0xLjkwOS0uOTAxdi0uNTQyYTM2Ljg3OCAzNi44NzggMCAwIDEgMi41NjgtMS4zMy43NS43NSAwIDAgMC0uNjM2LTEuMzU3IDM4LjM5IDM4LjM5IDAgMCAwLTMuMDYgMS42MDUuNzUuNzUgMCAwIDAtLjM3Mi42NDh2LjM2NWMtLjc3My0uMjk0LTEuNTYtLjU2LTIuMzU5LS44YS43NS43NSAwIDAgMS0uMTk0LTEuMzQ3IDQwLjkwMSA0MC45MDEgMCAwIDEgNi4wMDUtMy4yMjNaTTQuMjUgOC4zNDhjLS41My0uMjEyLTEuMDY3LS40MTEtMS42MTEtLjU5NmE0MC45NzMgNDAuOTczIDAgMCAwLS40MTggMi45Ny43NS43NSAwIDAgMCAuNDc0Ljc3NmMuMTc1LjA2OC4zNS4xMzguNTI0LjIxYTUuNTQ0IDUuNTQ0IDAgMCAxLS41OC42ODEuNzUuNzUgMCAxIDAgMS4wNiAxLjA2Yy4zNS0uMzQ5LjY1NS0uNzI2LjkxNS0xLjEyNGEyOS4yODIgMjkuMjgyIDAgMCAwLTEuMzk1LS42MTdBNS40ODMgNS40ODMgMCAwIDAgNC4yNSA4LjV2LS4xNTJaIiAvPgogIDxwYXRoIGQ9Ik03LjYwMyAxMy45NmMtLjk2LS42LTEuOTU4LTEuMTQ3LTIuOTg5LTEuNjM1YTYuOTgxIDYuOTgxIDAgMCAwIDEuMTItMy4zNDFjLjQxOS4xOTIuODM0LjM5MyAxLjI0NC42MDJhMi4yNSAyLjI1IDAgMCAwIDIuMDQ1IDAgMzIuNzg3IDMyLjc4NyAwIDAgMSA0LjMzOC0xLjgzNGMuMTc1Ljk3OC4zMTUgMS45NjkuNDE5IDIuOTdhLjc1Ljc1IDAgMCAxLS40NzQuNzc2IDI5LjM4NSAyOS4zODUgMCAwIDAtNC45MDkgMi40NjEuNzUuNzUgMCAwIDEtLjc5NCAwWiIgLz4KPC9zdmc+Cg==");
}
h2[data-name="education"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9InctNCBoLTQiPgogIDxwYXRoIGQ9Ik03LjcwMiAxLjM2OGEuNzUuNzUgMCAwIDEgLjU5NyAwYzIuMDk4LjkxIDQuMTA1IDEuOTkgNi4wMDQgMy4yMjNhLjc1Ljc1IDAgMCAxLS4xOTQgMS4zNDhBMzQuMjcgMzQuMjcgMCAwIDAgOC4zNDEgOC4yNWEuNzUuNzUgMCAwIDEtLjY4MiAwYy0uNjI1LS4zMi0xLjI2Mi0uNjItMS45MDktLjkwMXYtLjU0MmEzNi44NzggMzYuODc4IDAgMCAxIDIuNTY4LTEuMzMuNzUuNzUgMCAwIDAtLjYzNi0xLjM1NyAzOC4zOSAzOC4zOSAwIDAgMC0zLjA2IDEuNjA1Ljc1Ljc1IDAgMCAwLS4zNzIuNjQ4di4zNjVjLS43NzMtLjI5NC0xLjU2LS41Ni0yLjM1OS0uOGEuNzUuNzUgMCAwIDEtLjE5NC0xLjM0NyA0MC45MDEgNDAuOTAxIDAgMCAxIDYuMDA1LTMuMjIzWk00LjI1IDguMzQ4Yy0uNTMtLjIxMi0xLjA2Ny0uNDExLTEuNjExLS41OTZhNDAuOTczIDQwLjk3MyAwIDAgMC0uNDE4IDIuOTcuNzUuNzUgMCAwIDAgLjQ3NC43NzZjLjE3NS4wNjguMzUuMTM4LjUyNC4yMWE1LjU0NCA1LjU0NCAwIDAgMS0uNTguNjgxLjc1Ljc1IDAgMSAwIDEuMDYgMS4wNmMuMzUtLjM0OS42NTUtLjcyNi45MTUtMS4xMjRhMjkuMjgyIDI5LjI4MiAwIDAgMC0xLjM5NS0uNjE3QTUuNDgzIDUuNDgzIDAgMCAwIDQuMjUgOC41di0uMTUyWiIgLz4KICA8cGF0aCBkPSJNNy42MDMgMTMuOTZjLS45Ni0uNi0xLjk1OC0xLjE0Ny0yLjk4OS0xLjYzNWE2Ljk4MSA2Ljk4MSAwIDAgMCAxLjEyLTMuMzQxYy40MTkuMTkyLjgzNC4zOTMgMS4yNDQuNjAyYTIuMjUgMi4yNSAwIDAgMCAyLjA0NSAwIDMyLjc4NyAzMi43ODcgMCAwIDEgNC4zMzgtMS44MzRjLjE3NS45NzguMzE1IDEuOTY5LjQxOSAyLjk3YS43NS43NSAwIDAgMS0uNDc0Ljc3NiAyOS4zODUgMjkuMzg1IDAgMCAwLTQuOTA5IDIuNDYxLjc1Ljc1IDAgMCAxLS43OTQgMFoiIC8+Cjwvc3ZnPg==");
}
h2[data-name="workExperienceArray"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0idy00IGgtNCI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEgNFYzYTIgMiAwIDAgMC0yLTJIN2EyIDIgMCAwIDAtMiAydjFINGEyIDIgMCAwIDAtMiAydjNhMiAyIDAgMCAwIDIgMmg4YTIgMiAwIDAgMCAyLTJWNmEyIDIgMCAwIDAtMi0yaC0xWk05IDIuNUg3YS41LjUgMCAwIDAtLjUuNXYxaDNWM2EuNS41IDAgMCAwLS41LS41Wk05IDlhMSAxIDAgMSAxLTIgMCAxIDEgMCAwIDEgMiAwWiIgY2xpcC1ydWxlPSJldmVub2RkIiAvPgogIDxwYXRoIGQ9Ik0zIDExLjgzVjEyYTIgMiAwIDAgMCAyIDJoNmEyIDIgMCAwIDAgMi0ydi0uMTdjLS4zMTMuMTEtLjY1LjE3LTEgLjE3SDRjLS4zNSAwLS42ODctLjA2LTEtLjE3WiIgLz4KPC9zdmc+Cg==");
}
h2[data-name="workExperienceArray"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9InctNCBoLTQiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTExIDRWM2EyIDIgMCAwIDAtMi0ySDdhMiAyIDAgMCAwLTIgMnYxSDRhMiAyIDAgMCAwLTIgMnYzYTIgMiAwIDAgMCAyIDJoOGEyIDIgMCAwIDAgMi0yVjZhMiAyIDAgMCAwLTItMmgtMVpNOSAyLjVIN2EuNS41IDAgMCAwLS41LjV2MWgzVjNhLjUuNSAwIDAgMC0uNS0uNVpNOSA5YTEgMSAwIDEgMS0yIDAgMSAxIDAgMCAxIDIgMFoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KICA8cGF0aCBkPSJNMyAxMS44M1YxMmEyIDIgMCAwIDAgMiAyaDZhMiAyIDAgMCAwIDItMnYtLjE3Yy0uMzEzLjExLS42NS4xNy0xIC4xN0g0Yy0uMzUgMC0uNjg3LS4wNi0xLS4xN1oiIC8+Cjwvc3ZnPgo=");
}      
h2[data-name="publications"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iIzAwMCIgY2xhc3M9InctNSBoLTUiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIgMy41QTEuNSAxLjUgMCAwIDEgMy41IDJoOUExLjUgMS41IDAgMCAxIDE0IDMuNXYxMS43NUEyLjc1IDIuNzUgMCAwIDAgMTYuNzUgMThoLTEyQTIuNzUgMi43NSAwIDAgMSAyIDE1LjI1VjMuNVptMy43NSA3YS43NS43NSAwIDAgMCAwIDEuNWg0LjVhLjc1Ljc1IDAgMCAwIDAtMS41aC00LjVabTAgM2EuNzUuNzUgMCAwIDAgMCAxLjVoNC41YS43NS43NSAwIDAgMCAwLTEuNWgtNC41Wk01IDUuNzVBLjc1Ljc1IDAgMCAxIDUuNzUgNWg0LjVhLjc1Ljc1IDAgMCAxIC43NS43NXYyLjVhLjc1Ljc1IDAgMCAxLS43NS43NWgtNC41QS43NS43NSAwIDAgMSA1IDguMjV2LTIuNVoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KICA8cGF0aCBkPSJNMTYuNSA2LjVoLTF2OC43NWExLjI1IDEuMjUgMCAxIDAgMi41IDBWOGExLjUgMS41IDAgMCAwLTEuNS0xLjVaIiAvPgo8L3N2Zz4K");
}
h2[data-name="publications"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9InctNSBoLTUiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIgMy41QTEuNSAxLjUgMCAwIDEgMy41IDJoOUExLjUgMS41IDAgMCAxIDE0IDMuNXYxMS43NUEyLjc1IDIuNzUgMCAwIDAgMTYuNzUgMThoLTEyQTIuNzUgMi43NSAwIDAgMSAyIDE1LjI1VjMuNVptMy43NSA3YS43NS43NSAwIDAgMCAwIDEuNWg0LjVhLjc1Ljc1IDAgMCAwIDAtMS41aC00LjVabTAgM2EuNzUuNzUgMCAwIDAgMCAxLjVoNC41YS43NS43NSAwIDAgMCAwLTEuNWgtNC41Wk01IDUuNzVBLjc1Ljc1IDAgMCAxIDUuNzUgNWg0LjVhLjc1Ljc1IDAgMCAxIC43NS43NXYyLjVhLjc1Ljc1IDAgMCAxLS43NS43NWgtNC41QS43NS43NSAwIDAgMSA1IDguMjV2LTIuNVoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KICA8cGF0aCBkPSJNMTYuNSA2LjVoLTF2OC43NWExLjI1IDEuMjUgMCAxIDAgMi41IDBWOGExLjUgMS41IDAgMCAwLTEuNS0xLjVaIiAvPgo8L3N2Zz4K");
}

h2[data-name="certifications"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHRpdGxlPmNlcnRpZmljYXRlLXJpYmJvbi1zb2xpZDwvdGl0bGU+CiAgPGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+CiAgICA8ZyBpZD0iaW52aXNpYmxlX2JveCIgZGF0YS1uYW1lPSJpbnZpc2libGUgYm94Ij4KICAgICAgPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSJub25lIiAvPgogICAgPC9nPgogICAgPGcgaWQ9Imljb25zX1EyIiBkYXRhLW5hbWU9Imljb25zIFEyIj4KICAgICAgPGc+CiAgICAgICAgPGNpcmNsZSBjeD0iMjQiIGN5PSIxOCIgcj0iNyIgLz4KICAgICAgICA8cGF0aAogICAgICAgICAgZD0iTTQwLDE4QTE2LDE2LDAsMSwwLDE1LDMxLjJWNDMuOWEyLDIsMCwwLDAsMy4xLDEuN0wyNCw0MWw1LjksNC42QTIsMiwwLDAsMCwzMyw0My45VjMxLjJBMTYsMTYsMCwwLDAsNDAsMThaTTEyLDE4QTEyLDEyLDAsMSwxLDI0LDMwLDEyLDEyLDAsMCwxLDEyLDE4WiIgLz4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+");
}
h2[data-name="certifications"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHRpdGxlPmNlcnRpZmljYXRlLXJpYmJvbi1zb2xpZDwvdGl0bGU+CiAgPGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+CiAgICA8ZyBpZD0iaW52aXNpYmxlX2JveCIgZGF0YS1uYW1lPSJpbnZpc2libGUgYm94Ij4KICAgICAgPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSJub25lIiAvPgogICAgPC9nPgogICAgPGcgaWQ9Imljb25zX1EyIiBkYXRhLW5hbWU9Imljb25zIFEyIj4KICAgICAgPGc+CiAgICAgICAgPGNpcmNsZSBjeD0iMjQiIGN5PSIxOCIgcj0iNyIgZmlsbD0iI2ZmZmZmZiIgLz4KICAgICAgICA8cGF0aAogICAgICAgICAgZD0iTTQwLDE4QTE2LDE2LDAsMSwwLDE1LDMxLjJWNDMuOWEyLDIsMCwwLDAsMy4xLDEuN0wyNCw0MWw1LjksNC42QTIsMiwwLDAsMCwzMyw0My45VjMxLjJBMTYsMTYsMCwwLDAsNDAsMThaTTEyLDE4QTEyLDEyLDAsMSwxLDI0LDMwLDEyLDEyLDAsMCwxLDEyLDE4WiIgZmlsbD0iI2ZmZmZmZiIgLz4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==");
}

h2[data-name="awards"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iIzAwMDAwMCIgY2xhc3M9InctNSBoLTUiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEwIDFjLTEuODI4IDAtMy42MjMuMTQ5LTUuMzcxLjQzNWEuNzUuNzUgMCAwIDAtLjYyOS43NHYuMzg3Yy0uODI3LjE1Ny0xLjY0Mi4zNDUtMi40NDUuNTY0YS43NS43NSAwIDAgMC0uNTUyLjY5OCA1IDUgMCAwIDAgNC41MDMgNS4xNTIgNiA2IDAgMCAwIDIuOTQ2IDEuODIyQTYuNDUxIDYuNDUxIDAgMCAxIDcuNzY4IDEzSDcuNUExLjUgMS41IDAgMCAwIDYgMTQuNVYxN2gtLjc1QzQuNTYgMTcgNCAxNy41NiA0IDE4LjI1YzAgLjQxNC4zMzYuNzUuNzUuNzVoMTAuNWEuNzUuNzUgMCAwIDAgLjc1LS43NWMwLS42OS0uNTYtMS4yNS0xLjI1LTEuMjVIMTR2LTIuNWExLjUgMS41IDAgMCAwLTEuNS0xLjVoLS4yNjhhNi40NTMgNi40NTMgMCAwIDEtLjY4NC0yLjIwMiA2IDYgMCAwIDAgMi45NDYtMS44MjIgNSA1IDAgMCAwIDQuNTAzLTUuMTUyLjc1Ljc1IDAgMCAwLS41NTItLjY5OEEzMS44MDQgMzEuODA0IDAgMCAwIDE2IDIuNTYydi0uMzg3YS43NS43NSAwIDAgMC0uNjI5LS43NEEzMy4yMjcgMzMuMjI3IDAgMCAwIDEwIDFaTTIuNTI1IDQuNDIyQzMuMDEyIDQuMyAzLjUwNCA0LjE5IDQgNC4wOVY1YzAgLjc0LjEzNCAxLjQ0OC4zOCAyLjEwM2EzLjUwMyAzLjUwMyAwIDAgMS0xLjg1NS0yLjY4Wm0xNC45NSAwYTMuNTAzIDMuNTAzIDAgMCAxLTEuODU0IDIuNjhDMTUuODY2IDYuNDQ5IDE2IDUuNzQgMTYgNXYtLjkxYy40OTYuMDk5Ljk4OC4yMSAxLjQ3NS4zMzJaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIC8+Cjwvc3ZnPgoKCg==");
}
h2[data-name="awards"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9InctNSBoLTUiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEwIDFjLTEuODI4IDAtMy42MjMuMTQ5LTUuMzcxLjQzNWEuNzUuNzUgMCAwIDAtLjYyOS43NHYuMzg3Yy0uODI3LjE1Ny0xLjY0Mi4zNDUtMi40NDUuNTY0YS43NS43NSAwIDAgMC0uNTUyLjY5OCA1IDUgMCAwIDAgNC41MDMgNS4xNTIgNiA2IDAgMCAwIDIuOTQ2IDEuODIyQTYuNDUxIDYuNDUxIDAgMCAxIDcuNzY4IDEzSDcuNUExLjUgMS41IDAgMCAwIDYgMTQuNVYxN2gtLjc1QzQuNTYgMTcgNCAxNy41NiA0IDE4LjI1YzAgLjQxNC4zMzYuNzUuNzUuNzVoMTAuNWEuNzUuNzUgMCAwIDAgLjc1LS43NWMwLS42OS0uNTYtMS4yNS0xLjI1LTEuMjVIMTR2LTIuNWExLjUgMS41IDAgMCAwLTEuNS0xLjVoLS4yNjhhNi40NTMgNi40NTMgMCAwIDEtLjY4NC0yLjIwMiA2IDYgMCAwIDAgMi45NDYtMS44MjIgNSA1IDAgMCAwIDQuNTAzLTUuMTUyLjc1Ljc1IDAgMCAwLS41NTItLjY5OEEzMS44MDQgMzEuODA0IDAgMCAwIDE2IDIuNTYydi0uMzg3YS43NS43NSAwIDAgMC0uNjI5LS43NEEzMy4yMjcgMzMuMjI3IDAgMCAwIDEwIDFaTTIuNTI1IDQuNDIyQzMuMDEyIDQuMyAzLjUwNCA0LjE5IDQgNC4wOVY1YzAgLjc0LjEzNCAxLjQ0OC4zOCAyLjEwM2EzLjUwMyAzLjUwMyAwIDAgMS0xLjg1NS0yLjY4Wm0xNC45NSAwYTMuNTAzIDMuNTAzIDAgMCAxLTEuODU0IDIuNjhDMTUuODY2IDYuNDQ5IDE2IDUuNzQgMTYgNXYtLjkxYy40OTYuMDk5Ljk4OC4yMSAxLjQ3NS4zMzJaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIC8+Cjwvc3ZnPgoKCg==");
}
h2[data-name="trainings"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iIzAwMDAwMCIgY2xhc3M9InctNSBoLTUiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE2LjQwMyAxMi42NTJhMyAzIDAgMCAwIDAtNS4zMDQgMyAzIDAgMCAwLTMuNzUtMy43NTEgMyAzIDAgMCAwLTUuMzA1IDAgMyAzIDAgMCAwLTMuNzUxIDMuNzUgMyAzIDAgMCAwIDAgNS4zMDUgMyAzIDAgMCAwIDMuNzUgMy43NTEgMyAzIDAgMCAwIDUuMzA1IDAgMyAzIDAgMCAwIDMuNzUxLTMuNzVabS0yLjU0Ni00LjQ2YS43NS43NSAwIDAgMC0xLjIxNC0uODgzbC0zLjQ4MyA0Ljc5LTEuODgtMS44OGEuNzUuNzUgMCAxIDAtMS4wNiAxLjA2MWwyLjUgMi41YS43NS43NSAwIDAgMCAxLjEzNy0uMDg5bDQtNS41WiIgY2xpcC1ydWxlPSJldmVub2RkIiAvPgo8L3N2Zz4KCg==");
}
h2[data-name="trainings"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9InctNSBoLTUiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE2LjQwMyAxMi42NTJhMyAzIDAgMCAwIDAtNS4zMDQgMyAzIDAgMCAwLTMuNzUtMy43NTEgMyAzIDAgMCAwLTUuMzA1IDAgMyAzIDAgMCAwLTMuNzUxIDMuNzUgMyAzIDAgMCAwIDAgNS4zMDUgMyAzIDAgMCAwIDMuNzUgMy43NTEgMyAzIDAgMCAwIDUuMzA1IDAgMyAzIDAgMCAwIDMuNzUxLTMuNzVabS0yLjU0Ni00LjQ2YS43NS43NSAwIDAgMC0xLjIxNC0uODgzbC0zLjQ4MyA0Ljc5LTEuODgtMS44OGEuNzUuNzUgMCAxIDAtMS4wNiAxLjA2MWwyLjUgMi41YS43NS43NSAwIDAgMCAxLjEzNy0uMDg5bDQtNS41WiIgY2xpcC1ydWxlPSJldmVub2RkIiAvPgo8L3N2Zz4KCg==");
}
h2[data-name="interests"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iIzAwMDAwMCIgY2xhc3M9InctNSBoLTUiPgogIDxwYXRoIGQ9Ik0xNS45OCAxLjgwNGExIDEgMCAwIDAtMS45NiAwbC0uMjQgMS4xOTJhMSAxIDAgMCAxLS43ODQuNzg1bC0xLjE5Mi4yMzhhMSAxIDAgMCAwIDAgMS45NjJsMS4xOTIuMjM4YTEgMSAwIDAgMSAuNzg1Ljc4NWwuMjM4IDEuMTkyYTEgMSAwIDAgMCAxLjk2MiAwbC4yMzgtMS4xOTJhMSAxIDAgMCAxIC43ODUtLjc4NWwxLjE5Mi0uMjM4YTEgMSAwIDAgMCAwLTEuOTYybC0xLjE5Mi0uMjM4YTEgMSAwIDAgMS0uNzg1LS43ODVsLS4yMzgtMS4xOTJaTTYuOTQ5IDUuNjg0YTEgMSAwIDAgMC0xLjg5OCAwbC0uNjgzIDIuMDUxYTEgMSAwIDAgMS0uNjMzLjYzM2wtMi4wNTEuNjgzYTEgMSAwIDAgMCAwIDEuODk4bDIuMDUxLjY4NGExIDEgMCAwIDEgLjYzMy42MzJsLjY4MyAyLjA1MWExIDEgMCAwIDAgMS44OTggMGwuNjgzLTIuMDUxYTEgMSAwIDAgMSAuNjMzLS42MzNsMi4wNTEtLjY4M2ExIDEgMCAwIDAgMC0xLjg5OGwtMi4wNTEtLjY4M2ExIDEgMCAwIDEtLjYzMy0uNjMzTDYuOTUgNS42ODRaTTEzLjk0OSAxMy42ODRhMSAxIDAgMCAwLTEuODk4IDBsLS4xODQuNTUxYTEgMSAwIDAgMS0uNjMyLjYzM2wtLjU1MS4xODNhMSAxIDAgMCAwIDAgMS44OThsLjU1MS4xODNhMSAxIDAgMCAxIC42MzMuNjMzbC4xODMuNTUxYTEgMSAwIDAgMCAxLjg5OCAwbC4xODQtLjU1MWExIDEgMCAwIDEgLjYzMi0uNjMzbC41NTEtLjE4M2ExIDEgMCAwIDAgMC0xLjg5OGwtLjU1MS0uMTg0YTEgMSAwIDAgMS0uNjMzLS42MzJsLS4xODMtLjU1MVoiIC8+Cjwvc3ZnPgo=");
}
h2[data-name="interests"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9InctNSBoLTUiPgogIDxwYXRoIGQ9Ik0xNS45OCAxLjgwNGExIDEgMCAwIDAtMS45NiAwbC0uMjQgMS4xOTJhMSAxIDAgMCAxLS43ODQuNzg1bC0xLjE5Mi4yMzhhMSAxIDAgMCAwIDAgMS45NjJsMS4xOTIuMjM4YTEgMSAwIDAgMSAuNzg1Ljc4NWwuMjM4IDEuMTkyYTEgMSAwIDAgMCAxLjk2MiAwbC4yMzgtMS4xOTJhMSAxIDAgMCAxIC43ODUtLjc4NWwxLjE5Mi0uMjM4YTEgMSAwIDAgMCAwLTEuOTYybC0xLjE5Mi0uMjM4YTEgMSAwIDAgMS0uNzg1LS43ODVsLS4yMzgtMS4xOTJaTTYuOTQ5IDUuNjg0YTEgMSAwIDAgMC0xLjg5OCAwbC0uNjgzIDIuMDUxYTEgMSAwIDAgMS0uNjMzLjYzM2wtMi4wNTEuNjgzYTEgMSAwIDAgMCAwIDEuODk4bDIuMDUxLjY4NGExIDEgMCAwIDEgLjYzMy42MzJsLjY4MyAyLjA1MWExIDEgMCAwIDAgMS44OTggMGwuNjgzLTIuMDUxYTEgMSAwIDAgMSAuNjMzLS42MzNsMi4wNTEtLjY4M2ExIDEgMCAwIDAgMC0xLjg5OGwtMi4wNTEtLjY4M2ExIDEgMCAwIDEtLjYzMy0uNjMzTDYuOTUgNS42ODRaTTEzLjk0OSAxMy42ODRhMSAxIDAgMCAwLTEuODk4IDBsLS4xODQuNTUxYTEgMSAwIDAgMS0uNjMyLjYzM2wtLjU1MS4xODNhMSAxIDAgMCAwIDAgMS44OThsLjU1MS4xODNhMSAxIDAgMCAxIC42MzMuNjMzbC4xODMuNTUxYTEgMSAwIDAgMCAxLjg5OCAwbC4xODQtLjU1MWExIDEgMCAwIDEgLjYzMi0uNjMzbC41NTEtLjE4M2ExIDEgMCAwIDAgMC0xLjg5OGwtLjU1MS0uMTg0YTEgMSAwIDAgMS0uNjMzLS42MzJsLS4xODMtLjU1MVoiIC8+Cjwvc3ZnPgo=");
}
h2[data-name="languages"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iIzAwMDAwMCIgY2xhc3NOYW1lPSJ3LTUgaC01Ij4KICA8cGF0aCBkPSJNNy43NSAyLjc1YS43NS43NSAwIDAgMC0xLjUgMHYxLjI1OGEzMi45ODcgMzIuOTg3IDAgMCAwLTMuNTk5LjI3OC43NS43NSAwIDEgMCAuMTk4IDEuNDg3QTMxLjU0NSAzMS41NDUgMCAwIDEgOC43IDUuNTQ1IDE5LjM4MSAxOS4zODEgMCAwIDEgNyA5LjU2YTE5LjQxOCAxOS40MTggMCAwIDEtMS4wMDItMi4wNS43NS43NSAwIDAgMC0xLjM4NC41NzcgMjAuOTM1IDIwLjkzNSAwIDAgMCAxLjQ5MiAyLjkxIDE5LjYxMyAxOS42MTMgMCAwIDEtMy44MjggNC4xNTQuNzUuNzUgMCAxIDAgLjk0NSAxLjE2NEEyMS4xMTYgMjEuMTE2IDAgMCAwIDcgMTIuMzMxYy4wOTUuMTMyLjE5Mi4yNjIuMjkuMzkxYS43NS43NSAwIDAgMCAxLjE5NC0uOTFjLS4yMDQtLjI2Ni0uNC0uNTM4LS41OS0uODE1YTIwLjg4OCAyMC44ODggMCAwIDAgMi4zMzMtNS4zMzJjLjMxLjAzMS42MTguMDY4LjkyNC4xMDhhLjc1Ljc1IDAgMCAwIC4xOTgtMS40ODcgMzIuODMyIDMyLjgzMiAwIDAgMC0zLjU5OS0uMjc4VjIuNzVaIiAvPgogIDxwYXRoIGZpbGxSdWxlPSJldmVub2RkIiBkPSJNMTMgOGEuNzUuNzUgMCAwIDEgLjY3MS40MTVsNC4yNSA4LjVhLjc1Ljc1IDAgMSAxLTEuMzQyLjY3TDE1Ljc4NyAxNmgtNS41NzNsLS43OTMgMS41ODVhLjc1Ljc1IDAgMSAxLTEuMzQyLS42N2w0LjI1LTguNUEuNzUuNzUgMCAwIDEgMTMgOFptMi4wMzcgNi41TDEzIDEwLjQyNyAxMC45NjQgMTQuNWg0LjA3M1oiIGNsaXBSdWxlPSJldmVub2RkIiAvPgo8L3N2Zz4K");
}
h2[data-name="languages"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iI2ZmZmZmZiIgY2xhc3NOYW1lPSJ3LTUgaC01Ij4KICA8cGF0aCBkPSJNNy43NSAyLjc1YS43NS43NSAwIDAgMC0xLjUgMHYxLjI1OGEzMi45ODcgMzIuOTg3IDAgMCAwLTMuNTk5LjI3OC43NS43NSAwIDEgMCAuMTk4IDEuNDg3QTMxLjU0NSAzMS41NDUgMCAwIDEgOC43IDUuNTQ1IDE5LjM4MSAxOS4zODEgMCAwIDEgNyA5LjU2YTE5LjQxOCAxOS40MTggMCAwIDEtMS4wMDItMi4wNS43NS43NSAwIDAgMC0xLjM4NC41NzcgMjAuOTM1IDIwLjkzNSAwIDAgMCAxLjQ5MiAyLjkxIDE5LjYxMyAxOS42MTMgMCAwIDEtMy44MjggNC4xNTQuNzUuNzUgMCAxIDAgLjk0NSAxLjE2NEEyMS4xMTYgMjEuMTE2IDAgMCAwIDcgMTIuMzMxYy4wOTUuMTMyLjE5Mi4yNjIuMjkuMzkxYS43NS43NSAwIDAgMCAxLjE5NC0uOTFjLS4yMDQtLjI2Ni0uNC0uNTM4LS41OS0uODE1YTIwLjg4OCAyMC44ODggMCAwIDAgMi4zMzMtNS4zMzJjLjMxLjAzMS42MTguMDY4LjkyNC4xMDhhLjc1Ljc1IDAgMCAwIC4xOTgtMS40ODcgMzIuODMyIDMyLjgzMiAwIDAgMC0zLjU5OS0uMjc4VjIuNzVaIiAvPgogIDxwYXRoIGZpbGxSdWxlPSJldmVub2RkIiBkPSJNMTMgOGEuNzUuNzUgMCAwIDEgLjY3MS40MTVsNC4yNSA4LjVhLjc1Ljc1IDAgMSAxLTEuMzQyLjY3TDE1Ljc4NyAxNmgtNS41NzNsLS43OTMgMS41ODVhLjc1Ljc1IDAgMSAxLTEuMzQyLS42N2w0LjI1LTguNUEuNzUuNzUgMCAwIDEgMTMgOFptMi4wMzcgNi41TDEzIDEwLjQyNyAxMC45NjQgMTQuNWg0LjA3M1oiIGNsaXBSdWxlPSJldmVub2RkIiAvPgo8L3N2Zz4K");
}
h2[data-name="references"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iIzAwMDAwMCIgY2xhc3M9InctNSBoLTUiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjg2OCAyLjg4NGMtLjMyMS0uNzcyLTEuNDE1LS43NzItMS43MzYgMGwtMS44MyA0LjQwMS00Ljc1My4zODFjLS44MzMuMDY3LTEuMTcxIDEuMTA3LS41MzYgMS42NTFsMy42MiAzLjEwMi0xLjEwNiA0LjYzN2MtLjE5NC44MTMuNjkxIDEuNDU2IDEuNDA1IDEuMDJMMTAgMTUuNTkxbDQuMDY5IDIuNDg1Yy43MTMuNDM2IDEuNTk4LS4yMDcgMS40MDQtMS4wMmwtMS4xMDYtNC42MzcgMy42Mi0zLjEwMmMuNjM1LS41NDQuMjk3LTEuNTg0LS41MzYtMS42NWwtNC43NTItLjM4Mi0xLjgzMS00LjQwMVoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KPC9zdmc+CgoK");
}
h2[data-name="references"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9InctNSBoLTUiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjg2OCAyLjg4NGMtLjMyMS0uNzcyLTEuNDE1LS43NzItMS43MzYgMGwtMS44MyA0LjQwMS00Ljc1My4zODFjLS44MzMuMDY3LTEuMTcxIDEuMTA3LS41MzYgMS42NTFsMy42MiAzLjEwMi0xLjEwNiA0LjYzN2MtLjE5NC44MTMuNjkxIDEuNDU2IDEuNDA1IDEuMDJMMTAgMTUuNTkxbDQuMDY5IDIuNDg1Yy43MTMuNDM2IDEuNTk4LS4yMDcgMS40MDQtMS4wMmwtMS4xMDYtNC42MzcgMy42Mi0zLjEwMmMuNjM1LS41NDQuMjk3LTEuNTg0LS41MzYtMS42NWwtNC43NTItLjM4Mi0xLjgzMS00LjQwMVoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KPC9zdmc+CgoK");
} 

h2[data-name="projects"][data-icon-color="black"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzc05hbWU9InctNiBoLTYiPgogIDxwYXRoIGZpbGxSdWxlPSJldmVub2RkIiBkPSJNOS4zMTUgNy41ODRDMTIuMTk1IDMuODgzIDE2LjY5NSAxLjUgMjEuNzUgMS41YS43NS43NSAwIDAgMSAuNzUuNzVjMCA1LjA1Ni0yLjM4MyA5LjU1NS02LjA4NCAxMi40MzZBNi43NSA2Ljc1IDAgMCAxIDkuNzUgMjIuNWEuNzUuNzUgMCAwIDEtLjc1LS43NXYtNC4xMzFBMTUuODM4IDE1LjgzOCAwIDAgMSA2LjM4MiAxNUgyLjI1YS43NS43NSAwIDAgMS0uNzUtLjc1IDYuNzUgNi43NSAwIDAgMSA3LjgxNS02LjY2NlpNMTUgNi43NWEyLjI1IDIuMjUgMCAxIDAgMCA0LjUgMi4yNSAyLjI1IDAgMCAwIDAtNC41WiIgY2xpcFJ1bGU9ImV2ZW5vZGQiIC8+CiAgPHBhdGggZD0iTTUuMjYgMTcuMjQyYS43NS43NSAwIDEgMC0uODk3LTEuMjAzIDUuMjQzIDUuMjQzIDAgMCAwLTIuMDUgNS4wMjIuNzUuNzUgMCAwIDAgLjYyNS42MjcgNS4yNDMgNS4yNDMgMCAwIDAgNS4wMjItMi4wNTEuNzUuNzUgMCAxIDAtMS4yMDItLjg5NyAzLjc0NCAzLjc0NCAwIDAgMS0zLjAwOCAxLjUxYzAtMS4yMy41OTItMi4zMjMgMS41MS0zLjAwOFoiIC8+Cjwvc3ZnPgo=");
}
h2[data-name="projects"][data-icon-color="white"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZmZmZiIgY2xhc3NOYW1lPSJ3LTYgaC02Ij4KICA8cGF0aCBmaWxsUnVsZT0iZXZlbm9kZCIgZD0iTTkuMzE1IDcuNTg0QzEyLjE5NSAzLjg4MyAxNi42OTUgMS41IDIxLjc1IDEuNWEuNzUuNzUgMCAwIDEgLjc1Ljc1YzAgNS4wNTYtMi4zODMgOS41NTUtNi4wODQgMTIuNDM2QTYuNzUgNi43NSAwIDAgMSA5Ljc1IDIyLjVhLjc1Ljc1IDAgMCAxLS43NS0uNzV2LTQuMTMxQTE1LjgzOCAxNS44MzggMCAwIDEgNi4zODIgMTVIMi4yNWEuNzUuNzUgMCAwIDEtLjc1LS43NSA2Ljc1IDYuNzUgMCAwIDEgNy44MTUtNi42NjZaTTE1IDYuNzVhMi4yNSAyLjI1IDAgMSAwIDAgNC41IDIuMjUgMi4yNSAwIDAgMCAwLTQuNVoiIGNsaXBSdWxlPSJldmVub2RkIiAvPgogIDxwYXRoIGQ9Ik01LjI2IDE3LjI0MmEuNzUuNzUgMCAxIDAtLjg5Ny0xLjIwMyA1LjI0MyA1LjI0MyAwIDAgMC0yLjA1IDUuMDIyLjc1Ljc1IDAgMCAwIC42MjUuNjI3IDUuMjQzIDUuMjQzIDAgMCAwIDUuMDIyLTIuMDUxLjc1Ljc1IDAgMSAwLTEuMjAyLS44OTcgMy43NDQgMy43NDQgMCAwIDEtMy4wMDggMS41MWMwLTEuMjMuNTkyLTIuMzIzIDEuNTEtMy4wMDhaIiAvPgo8L3N2Zz4K");
}

[data-primarySkills-index]::before,
[data-achievements-index]::before,
[data-description-index]::before {
  content: "\\2022";
}

.cv-container {
  scale:1 !important;
}

[data-template-no="2"] [data-primarySkills-index]::before {
  content: none;
}


span:empty {
  display: none;
}

.page {
  position: relative;
}
.fragmentDecor::before {
  content: " ";
  position: absolute;
  top: 0;
  bottom: -20;
  height: 1119px;
  width: 40px;
  background-color: #e04127;
}

h2:empty {
  display: none;
}

.page {
  position: relative;
  height: 29.62cm !important;
  background-color: #fff;
}        

.page div:empty {
  display: none;
}

.page:not(:first-child):last-child {
  padding-top: 5px !important;
}

        </style>
        ${html}`;
    }

    setLoading(true);
    await fetch(`/api/template`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html: htmlToDoc,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          console.log(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          console.log("Invalid content type in response");
        }

        const res = await response.json();
        const arrayBufferView = new Uint8Array(res.result.data);

        const blob = new Blob([arrayBufferView], {
          type: "application/pdf",
        });
        const url = URL.createObjectURL(blob);
        if(docRef.current){
          docRef.current.href = url;
          if (!preview) {
            docRef.current.download = fileName;
          }
          // docRef.current.download = fileName;
          docRef.current.click();
        }
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  return (
      <div className="hidden xs:block md:block group">
        <a className="hidden" href="#" ref={docRef} target="_blank"></a>

        <button
          onClick={templateCall}
          type="button"
          disabled={loading}
          className={`w-full sm:max-w-max sm:w-48 lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35] transition-all duration-300  group ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            {preview ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3 md:w-4 md:h-4 dark:text-gray-100 text-gray-950"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3 md:w-4 md:h-4 dark:text-gray-100 text-gray-950"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            )}
            <span className="text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm">
              {preview
                ? "Print Preview "
                : loading
                ? "Downloading..."
                : "Download"}
            </span>
          </div>
        </button>
      </div>
  );
};

export default DownloadService;

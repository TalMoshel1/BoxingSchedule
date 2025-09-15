import React from "react";
import { Navigate } from "react-router-dom";

import Calendar from "../pages/Calendar.jsx";

import ApproveLink from "../pages/ApprovalLink.jsx";
import Private2 from "../pages/Private2.jsx";
import Group2 from "../pages/Group2.jsx";

import SignIn from "../pages/SignIn.jsx";
import { Helmet } from "react-helmet";
import calendarIcon from "../assets/calendarPage.png";
import groupIcon from "../assets/groupPage.png";
import FormContainer from "../components/formContainer.jsx";

const injectPageMetaData = (title, content, icon) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={content} />
        {icon && <link rel="icon" type="image/png" href={icon} sizes="16x16" />}
      </Helmet>
    </>
  );
};



export const routes = [
  {
    path: "/",
    name: "Home",
    element: <Navigate to="/calendar" replace />,
    isPrivate: false,
  },
  {path: 'requestPrivte', name:'reqquestPrivate', element:(
      <>
        {injectPageMetaData(
          "ניהול סטודיו - מערכת שעות",
          "see private training, group training and cancel training",
          calendarIcon
        )}{" "}
        <FormContainer>
        <Private2 />
        </FormContainer>
      </>
    ),
    isPrivate: true },
  {
    path: "/calendar",
    name: "Calendar",
    element: (
      <>
        {injectPageMetaData(
          "ניהול סטודיו - מערכת שעות",
          "see private training, group training and cancel training",
          calendarIcon
        )}{" "}
        <Calendar />
      </>
    ),
    isPrivate: false,
  },
  { path: "/signin", name: "SignIn", element: <SignIn />, isPrivate: false },
  {
    path: "/setgrouplesson",
    name: "Group",
    element: (
      <>
        <FormContainer>
          {injectPageMetaData(
            "ניהול סטודיו - צור אימון קבוצתי",
            "Set a group lesson",
            groupIcon
          )}{" "}
          <Group2 />
        </FormContainer>
      </>
    ),
    isPrivate: true,
  },
  {
    path: "/approveLink/:lessonId",
    name: "ApproveLink",
    element: (
      <>
        {injectPageMetaData(
          "אישור אימון קבוצתי",
          "Link to Approve a request for private training"
        )}{" "}
        <ApproveLink />
      </>
    ),
    isPrivate: true,
  },

  {
    path: "/notAuthorized",
    name: "Not Authorized",
    element: (
      <>
        <Helmet>
          <title>אין גישה לעמוד זה</title>
          <meta name="description" content="No access to this page" />
        </Helmet>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: "1",
          }}
        >
          <h1 style={{ marginBottom: "5rem" }}>
            {/* שגיאה 403 <br /> */}
            אין גישה לעמוד זה
            אנא התחבר מחדש
          </h1>
        </div>
      </>
    ),
    isPrivate: false,
  },
];

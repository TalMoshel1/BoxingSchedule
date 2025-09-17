import React, { useState } from "react";
import styled from "styled-components";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { incrementHour } from "../utils/incrementHour.js";
import { openWhatsApp } from "../utils/sendWhatsApp.js";
import { useSelector } from "react-redux";

const SubmitPrivateRequest = ({ step, previous, body }) => {
  const [message, setMessage] = useState("");

  const trainerPhone = useSelector((state) => state.calendar.trainerPhone);

  const sendPostPrivateRequest = async () => {
    try {
      const endTime = incrementHour(body.startTime);
      let data = { ...body };
      data.endTime = endTime;
      // data.day = body.day.$d
      let day = new Date(body.day.$d);
      day.setDate(day.getDate() + 1);

      data.day = day;
      const response = await fetch(
        "https://http://appointment-back-qd2z.onrender.com/api/lessons/requestPrivateLesson",
        // "http://localhost:3002/api/lessons/requestPrivateLesson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const res = await response.json();

      openWhatsApp(res, `${trainerPhone}`, "coach");

      setMessage("אימון נשלח לאישור מאמן");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const Container = styled.main`
    @media (orientation: portrait) {
      margin-top: 1rem;
    }

    @media (orientation: landscape) {
      // width: 45%;
      margin-top: 1rem;
    }

    position: relative;
    // border: 1px solid white;
    border-radius: 20px;
    overflow: hidden;
    .whatsapp {
      height: 100%;
    }
  `;
  return (
    <Container className="submitRequestContainer">
      <section
        className="whatsapp"
        style={{
          background:
            "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <WhatsAppIcon
          style={{
            color: "green",
            transform: "scale(2)",
            position: "relative",
            top: "1.5rem",
          }}
        />
        <p
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            // lineHeight: "2rem",
            fontSize: "1rem",
            marginTop: "2rem",
          }}
        >
          <br /> לאחר הלחיצה על{" "}
          <button
            disabled
            style={{
              pointerEvents: "none",
              all: "unset",
              border: "1px solid #A8A8A8	",
              padding: "0.5rem",
              fontSize: "1rem",
              marginBottom: "1rem",
              blur: "0.5",
              color: "#A8A8A8	",
            }}
          >
            שלח
          </button>{" "}
          :
          <br />
          * לחץ על פתיחה/אישור בחלון שנפתח.
          <br />* לחץ על "פתיחת צ'אט" באתר WhatsApp.
        </p>

        <button
          type="submit"
          onClick={sendPostPrivateRequest}
          style={{
            all: "unset",
            cursor: "pointer",
            border: "1px solid grey",
            padding: "0.5rem",
            fontSize: "1rem",
            marginBottom: "1rem",
          }}
        >
          שלח
        </button>

        <div
          className="arrowRight"
          style={{
            right: "1rem",
            top: "1rem",
            position: "absolute",
            display: "flex",
            justifyContent: "start",
            cursor: "pointer",
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
          }}
          onClick={previous}
        >
          ערוך
          <KeyboardArrowRightIcon />
        </div>
      </section>
    </Container>
  );
};

export default SubmitPrivateRequest;

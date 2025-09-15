// import React, { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import ClipLoader from "react-spinners/ClipLoader";
// import SubmitPrivateRequest from "./SubmitPrivateRequest.jsx";
// import { useNavigate } from "react-router-dom";
// import { Box, TextField } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import * as privateFunctions from "../utils/private/functions.js";
// import * as privateStyled from "../utils/private/styled-components.js";
// import "./css/Private2.css";

// const RequestPrivateLesson = () => {
//   const trainerPhone = useSelector((state) => state.calendar.trainerPhone);
//   const [day, setDay] = useState();
//   const [startTime, setStartTime] = useState("");
//   const [trainer, setTrainer] = useState("");
//   const [studentName, setStudentName] = useState("");
//   const [studentPhone, setStudentPhone] = useState("");
//   const [studentMail, setStudentMail] = useState("");
//   const [cantIn, setCantIn] = useState([]);
//   const [message, setMessage] = useState("");
//   const [showOptions, setShowOptions] = useState(false);
//   const [thisDayLessons, setThisDayLessons] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [step, setStep] = useState(0);
//   const [showTrainerOptions, setShowTrainerOptions] = useState(false); 
//   const studentNameRef = useRef(null);
//   const studentPhoneRef = useRef(null);
//   const studentMailRef = useRef(null);
//   const trainerRef = useRef(null);
//   const labelRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (trainerPhone === "") {
//         console.log('navigated to signin')
//       navigate("/signin", { state: { state: "/requestPrivte" } });
//     }
//   }, []);

//   const handleFowardStep = () => {
//     if (!day) {
//       return alert("יש לבחור תאריך");
//     }
//     if (!startTime) {
//       alert("יש לבחור שעה");
//       return;
//     }
//     if (!trainer || trainer === "בחר מאמן") {
//       alert("יש לבחור מאמן");
//       return;
//     }

//     if (!studentName) {
//       return alert("יש לכתוב שם");
//     }

//     if (!studentPhone || !privateFunctions.isTenDigitNumber(studentPhone)) {
//       alert("יש להזין מספר טלפון תקין עם עשרה מספרים בלבד");
//       studentPhoneRef.current.focus();
//       return;
//     }
//     if (!studentMail) {
//       return alert("יש לכתוב מייל");
//     }

//     setStep(step + 1);
//   };

//   const handlePreviousStep = () => {
//     if (step === 1) {
//       setStep(step - 1);
//     }
//   };

//   useEffect(() => {
//     if (day) {
//       privateFunctions.getDayLessons(day, setLoading, setThisDayLessons);
//     }
//   }, [day]);

//   useEffect(() => {
//     if (thisDayLessons.length > 0) {
//       const lessonsArray = thisDayLessons
//         .filter((l) => l.isApproved)
//         .map((l, index) => (
//           <div key={index} style={{ direction: "ltr" }}>
//             {l.startTime} - {l.endTime}
//             <br />
//           </div>
//         ));
//       setCantIn(lessonsArray);
//     } else {
//       setCantIn([]);
//     }
//   }, [thisDayLessons]);

//   const selectRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (selectRef.current && !selectRef.current.contains(event.target)) {
//         setShowOptions(false);
//       }
//       if (trainerRef.current && !trainerRef.current.contains(event.target)) {
//         setShowTrainerOptions(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [selectRef, trainerRef]);

//   const handleSelectOption = (time) => {
//     setStartTime(time);
//     setShowOptions(false);
//   };

//   const handleSelectTrainerOption = (trainer) => {
//     setTrainer(trainer);
//     setShowTrainerOptions(false);
//   };

//   if (message) {
//     return <p>{message}</p>;
//   }

//   if (trainerPhone !== "") {
//     return (
//       <>
//         <main className="private-main">
//           <div className="form-container">
//             <privateStyled.SlideContainer
//               className="slideContainer"
//               style={{
//                 right: `${step === 0 ? "100%" : "0"}`,
//               }}
//             >
//               <div className="privateForm-container">
//                 <privateStyled.PrivateForm>
//                   <div
//                     className="line"
//                     style={{
//                       content: "",
//                       width: "100%",
//                       height: "3px",
//                       backgroundColor: "#e6e5eb",
//                       marginBottom: "0.5rem",
//                     }}
//                   ></div>

//                   <h1 className="private-lesson-title">קביעת אימון פרטי</h1>

//                   <privateStyled.Line1 className="line1">
//                     <privateStyled.DateContainer className="date">
//                       <label
//                         className="date-label"
//                         htmlFor="date"
//                         ref={labelRef}
//                       ></label>

//                       <Box className="date-picker-container">
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                           <privateStyled.StyledBox>
//                             <DatePicker
//                               value={day}
//                               onAccept={(e) => {
//                                 const value = dayjs(e.$d);
//                                 setDay(value);
//                               }}
//                               slotProps={{
//                                 textField: {
//                                   placeholder: "תאריך",
//                                   sx: { color: "black" },
//                                 },
//                               }}
//                               renderInput={(params) => (
//                                 <TextField label="שמוליק" {...params} />
//                               )}
//                             />
//                           </privateStyled.StyledBox>
//                         </LocalizationProvider>
//                       </Box>
//                     </privateStyled.DateContainer>

//                     <privateStyled.Hour className="hour" style={{ height: "2.35rem" }}>
//                       <label htmlFor="" alt="hour"></label>
//                       <privateStyled.StyledSelectContainer
//                         ref={selectRef}
//                         className="hours-container"
//                       >
//                         <div
//                           className="custom-select private-proportions "
//                           onClick={() => setShowOptions(!showOptions)}
//                         >
//                           <label
//                             htmlFor="time"
//                             className={
//                               !startTime
//                                 ? "select-disabled private-proportions private-label"
//                                 : "private-proportions private-label"
//                             }
//                           >
//                             {loading ? (
//                               <ClipLoader size={10} />
//                             ) : startTime ? (
//                               startTime
//                             ) : (
//                               <span style={{ color: "grey" }}>בחר שעה</span>
//                             )}
//                           </label>
//                         </div>
//                         <div
//                           className={`options-container ${
//                             showOptions ? "show" : ""
//                           }`}
//                           STYLE={{ cursor: "pointer" }}
//                         >
//                           {privateFunctions.generateTimeOptions(
//                             cantIn,
//                             handleSelectOption
//                           )}
//                         </div>
//                       </privateStyled.StyledSelectContainer>
//                     </privateStyled.Hour>

//                     <privateStyled.Trainer
//                       className="trainer"
//                       style={{ height: "2.35rem !important" }}
//                     >
//                       <label
//                         htmlFor="trainer"
//                         className="private-label"
//                       ></label>
//                       <privateStyled.StyledSelectContainer
//                         className="trainer-container"
//                         ref={trainerRef}
//                       >
//                         <div
//                           className="custom-select"
//                           onClick={() =>
//                             setShowTrainerOptions(!showTrainerOptions)
//                           }
//                         >
//                           <label
//                             htmlFor="trainer"
//                             className={
//                               !trainer
//                                 ? "select-disabled private-label"
//                                 : "private-label"
//                             }
//                           >
//                             {trainer ? (
//                               trainer
//                             ) : (
//                               <span style={{ color: "grey" }}>בחר מאמן</span>
//                             )}
//                           </label>
//                         </div>
//                         <div
//                           className={`options-container ${
//                             showTrainerOptions ? "show" : ""
//                           }`}
//                           style={{ cursor: "pointer" }}
//                         >
//                           <div
//                             className="option"
//                             onClick={() => handleSelectTrainerOption("דוד")}
//                           >
//                             דוד
//                           </div>
//                           <div
//                             className="option"
//                             onClick={() => handleSelectTrainerOption("אלדד")}
//                           >
//                             אלדד
//                           </div>
//                         </div>
//                       </privateStyled.StyledSelectContainer>
//                     </privateStyled.Trainer>
//                   </privateStyled.Line1>

//                   <privateStyled.Line2>
//                     <privateStyled.Name className="name-container">
//                       <label htmlFor="studentName"></label>
//                       <input
//                         placeholder="שם"
//                         type="text"
//                         id="studentName"
//                         value={studentName}
//                         className="private-input"
//                         onChange={(e) => setStudentName(e.target.value)}
//                         required
//                         ref={studentNameRef}
//                       />
//                     </privateStyled.Name>
//                     <privateStyled.Phone className="phone-container">
//                       {" "}
//                       <label htmlFor="studentPhone" alt="student phone"></label>
//                       <input
//                         placeholder="מספר פלאפון"
//                         type="text"
//                         id="studentPhone"
//                         value={studentPhone}
//                         className="private-input"
//                         onChange={(e) => setStudentPhone(e.target.value)}
//                         required
//                         ref={studentPhoneRef}
//                       />
//                     </privateStyled.Phone>

//                     <privateStyled.Mail className="mail-container">
//                       <label htmlFor="studentMail"></label>
//                       <input
//                         placeholder="כתובת מייל"
//                         type="email"
//                         id="studentMail"
//                         value={studentMail}
//                         className="private-input"
//                         onChange={(e) => setStudentMail(e.target.value)}
//                         required
//                         ref={studentMailRef}
//                       />
//                     </privateStyled.Mail>
//                     <div
//                       className="line"
//                       style={{
//                         content: "",
//                         width: "100%",
//                         height: "3px",
//                         backgroundColor: "#e6e5eb",
//                       }}
//                     ></div>
//                   </privateStyled.Line2>
//                   <div className="arrowLeft-container">
//                     <privateStyled.ArrowLeft
//                       animate={
//                         day &&
//                         startTime &&
//                         trainer !== "בחר מאמן" &&
//                         studentName &&
//                         studentMail &&
//                         privateFunctions.isTenDigitNumber(studentPhone)
//                       }
//                       onClick={handleFowardStep}
//                     >
//                       <span>המשך</span>
//                     </privateStyled.ArrowLeft>
//                   </div>
//                   <div className="line" style={{content:'', width: '100%', height: '3px', backgroundColor:'#e6e5eb', marginTop: '0.5rem'}}></div>

//                 </privateStyled.PrivateForm>
//               </div>

//               <div className="submitPrivateRequest-container">
//                 <SubmitPrivateRequest
//                   step={step}
//                   previous={handlePreviousStep}
//                   body={{
//                     day,
//                     startTime,
//                     studentName,
//                     studentPhone,
//                     studentMail,
//                     trainer,
//                   }}
//                 />
//               </div>
//             </privateStyled.SlideContainer>
//           </div>
//         </main>
//       </>
//     );
//   }
// };

// export default RequestPrivateLesson;

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import SubmitPrivateRequest from "./SubmitPrivateRequest.jsx";
import { useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import * as privateFunctions from "../utils/private/functions.js";
import * as privateStyled from "../utils/private/styled-components.js";
import "./css/Private2.css";

const RequestPrivateLesson = () => {
  const trainerPhone = useSelector((state) => state.calendar.trainerPhone);
  const [day, setDay] = useState();
  const [startTime, setStartTime] = useState("");
  const [trainer, setTrainer] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentMail, setStudentMail] = useState("");
  const [cantIn, setCantIn] = useState([]);
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [thisDayLessons, setThisDayLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [showTrainerOptions, setShowTrainerOptions] = useState(false); 
  const studentNameRef = useRef(null);
  const studentPhoneRef = useRef(null);
  const studentMailRef = useRef(null);
  const trainerRef = useRef(null);
  const labelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (trainerPhone === "") {
      navigate("/signin", { state: { state: "/requestPrivte" } });
    }
  }, []);

  const handleFowardStep = () => {
    if (!day) {
      return alert("יש לבחור תאריך");
    }
    if (!startTime) {
      alert("יש לבחור שעה");
      return;
    }
    if (!trainer || trainer === "בחר מאמן") {
      alert("יש לבחור מאמן");
      return;
    }

    if (!studentName) {
      return alert("יש לכתוב שם");
    }

    if (!studentPhone || !privateFunctions.isTenDigitNumber(studentPhone)) {
      alert("יש להזין מספר טלפון תקין עם עשרה מספרים בלבד");
      studentPhoneRef.current.focus();
      return;
    }
    if (!studentMail) {
      return alert("יש לכתוב מייל");
    }

    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step === 1) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    if (day) {
      privateFunctions.getDayLessons(day, setLoading, setThisDayLessons);
    }
  }, [day]);

  useEffect(() => {
    if (thisDayLessons.length > 0) {
      const lessonsArray = thisDayLessons
        .filter((l) => l.isApproved)
        .map((l, index) => (
          <div key={index} style={{ direction: "ltr" }}>
            {l.startTime} - {l.endTime}
            <br />
          </div>
        ));
      setCantIn(lessonsArray);
    } else {
      setCantIn([]);
    }
  }, [thisDayLessons]);

  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
      if (trainerRef.current && !trainerRef.current.contains(event.target)) {
        setShowTrainerOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef, trainerRef]);

  const handleSelectOption = (time) => {
    setStartTime(time);
    setShowOptions(false);
  };

  const handleSelectTrainerOption = (trainer) => {
    setTrainer(trainer);
    setShowTrainerOptions(false);
  };

  if (message) {
    return <p>{message}</p>;
  }

  if (trainerPhone !== "") {
    return (
      <>
        <main className="private-main">
          <div className="form-container">
            <privateStyled.SlideContainer
              className="slideContainer"
              style={{
                right: `${step === 0 ? "100%" : "0"}`,
              }}
            >
              <div className="privateForm-container">
                <privateStyled.PrivateForm>
                  <div
                    className="line"
                    style={{
                      content: "",
                      width: "100%",
                      height: "3px",
                      backgroundColor: "#e6e5eb",
                      marginBottom: "0.5rem",
                    }}
                  ></div>

                  <h1 className="private-lesson-title">קביעת אימון פרטי</h1>

                  <privateStyled.Line1 className="line1">
                    <privateStyled.DateContainer className="date">
                      <label
                        className="date-label"
                        htmlFor="date"
                        ref={labelRef}
                      ></label>

                      <Box className="date-picker-container">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <privateStyled.StyledBox>
                            <DatePicker
                              value={day}
                              onAccept={(e) => {
                                const value = dayjs(e.$d);
                                setDay(value);
                              }}
                              slotProps={{
                                textField: {
                                  placeholder: "תאריך",
                                  sx: { color: "black" },
                                },
                              }}
                              renderInput={(params) => (
                                <TextField label="שמוליק" {...params} />
                              )}
                            />
                          </privateStyled.StyledBox>
                        </LocalizationProvider>
                      </Box>
                    </privateStyled.DateContainer>

                    <privateStyled.Hour className="hour" style={{ height: "2.35rem" }}>
                      <label htmlFor="" alt="hour"></label>
                      <privateStyled.StyledSelectContainer
                        ref={selectRef}
                        className="hours-container"
                      >
                        <div
                          className="custom-select private-proportions "
                          onClick={() => setShowOptions(!showOptions)}
                        >
                          <label
                            htmlFor="time"
                            className={
                              !startTime
                                ? "select-disabled private-proportions private-label"
                                : "private-proportions private-label"
                            }
                          >
                            {loading ? (
                              <ClipLoader size={10} />
                            ) : startTime ? (
                              startTime
                            ) : (
                              <span style={{ color: "grey" }}>בחר שעה</span>
                            )}
                          </label>
                        </div>
                        <div
                          className={`options-container ${
                            showOptions ? "show" : ""
                          }`}
                          STYLE={{ cursor: "pointer" }}
                        >
                          {privateFunctions.generateTimeOptions(
                            cantIn,
                            handleSelectOption
                          )}
                        </div>
                      </privateStyled.StyledSelectContainer>
                    </privateStyled.Hour>

                    <privateStyled.Trainer
                      className="trainer"
                      style={{ height: "2.35rem !important" }}
                    >
                      <label
                        htmlFor="trainer"
                        className="private-label"
                      ></label>
                      <privateStyled.StyledSelectContainer
                        className="trainer-container"
                        ref={trainerRef}
                      >
                        <div
                          className="custom-select"
                          onClick={() =>
                            setShowTrainerOptions(!showTrainerOptions)
                          }
                        >
                          <label
                            htmlFor="trainer"
                            className={
                              !trainer
                                ? "select-disabled private-label"
                                : "private-label"
                            }
                          >
                            {trainer ? (
                              trainer
                            ) : (
                              <span style={{ color: "grey" }}>בחר מאמן</span>
                            )}
                          </label>
                        </div>
                        <div
                          className={`options-container ${
                            showTrainerOptions ? "show" : ""
                          }`}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="option"
                            onClick={() => handleSelectTrainerOption("דוד")}
                          >
                            דוד
                          </div>
                          <div
                            className="option"
                            onClick={() => handleSelectTrainerOption("אלדד")}
                          >
                            אלדד
                          </div>
                        </div>
                      </privateStyled.StyledSelectContainer>
                    </privateStyled.Trainer>
                  </privateStyled.Line1>

                  <privateStyled.Line2>
                    <privateStyled.Name className="name-container">
                      <label htmlFor="studentName"></label>
                      <input
                        placeholder="שם"
                        type="text"
                        id="studentName"
                        value={studentName}
                        className="private-input"
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                        ref={studentNameRef}
                      />
                    </privateStyled.Name>
                    <privateStyled.Phone className="phone-container">
                      {" "}
                      <label htmlFor="studentPhone" alt="student phone"></label>
                      <input
                        placeholder="מספר פלאפון"
                        type="text"
                        id="studentPhone"
                        value={studentPhone}
                        className="private-input"
                        onChange={(e) => setStudentPhone(e.target.value)}
                        required
                        ref={studentPhoneRef}
                      />
                    </privateStyled.Phone>

                    <privateStyled.Mail className="mail-container">
                      <label htmlFor="studentMail"></label>
                      <input
                        placeholder="כתובת מייל"
                        type="email"
                        id="studentMail"
                        value={studentMail}
                        className="private-input"
                        onChange={(e) => setStudentMail(e.target.value)}
                        required
                        ref={studentMailRef}
                      />
                    </privateStyled.Mail>
                    <div
                      className="line"
                      style={{
                        content: "",
                        width: "100%",
                        height: "3px",
                        backgroundColor: "#e6e5eb",
                      }}
                    ></div>
                  </privateStyled.Line2>
                  <div className="arrowLeft-container">
                    <privateStyled.ArrowLeft
                      animate={
                        day &&
                        startTime &&
                        trainer !== "בחר מאמן" &&
                        studentName &&
                        studentMail &&
                        privateFunctions.isTenDigitNumber(studentPhone)
                      }
                      onClick={handleFowardStep}
                    >
                      <span>המשך</span>
                    </privateStyled.ArrowLeft>
                  </div>
                  <div className="line" style={{content:'', width: '100%', height: '3px', backgroundColor:'#e6e5eb', marginTop: '0.5rem'}}></div>

                </privateStyled.PrivateForm>
              </div>

              <div className="submitPrivateRequest-container">
                <SubmitPrivateRequest
                  step={step}
                  previous={handlePreviousStep}
                  body={{
                    day,
                    startTime,
                    studentName,
                    studentPhone,
                    studentMail,
                    trainer,
                  }}
                />
              </div>
            </privateStyled.SlideContainer>
          </div>
        </main>
      </>
    );
  }
};

export default RequestPrivateLesson;
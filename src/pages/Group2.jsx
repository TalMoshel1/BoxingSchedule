import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch } from "react-redux";
import { toggleSetGroupModal } from "../redux/calendarSlice.js";
import { repeatEndDate } from "../utils/repeatEndDate.js";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StyledBox } from "./Group/style-component.jsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as styledGroup from "./Group/style-component.jsx";
import ClipLoader from "react-spinners/ClipLoader.js";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { removeCookie } from "../utils/removeCookie.js";
import CustonAlert from "../components/CustomAlert.jsx";
import { ErrorContext } from "../context/ErrorContext.jsx";

const Group2 = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    trainer: "דוד",
    name: "",
    description: "",
    day: "",
    startTime: "",
    endTime: "",
    repeatsWeekly: false,
    repeatMonth: "1",
    isApproved: true,
    type: "group",
  });
  const [message, setMessage] = useState("");
  const [displayPage, setDisplayPage] = useState(true);
  const [showMonthsOptions, setShowMonthsOptions] = useState(false);
  const monthRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const dayRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const timePattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  const { setErrorString } = useContext(ErrorContext);

  const textColor = formData.repeatsWeekly ? "black" : "grey";

  const handleDisplayMonth = () => {
    if (formData.repeatsWeekly && !showMonthsOptions) {
      return setShowMonthsOptions(true);
    }
    setShowMonthsOptions(false);
  };

  const handleMonthChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      repeatMonth: value,
    }));
    setShowMonthsOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monthRef.current && !monthRef.current.contains(event.target)) {
        setShowMonthsOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [monthRef]);

  const generateMonthOptions = () => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return months.map((month) => (
      <div
        key={month}
        tabindex="0"
        className="option"
        onClick={() => {
          handleMonthChange(month);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleMonthChange(month);
          }
        }}
        role="option"
        aria-selected={formData.repeatMonth === month ? "true" : "false"}
      >
        {month}
      </div>
    ));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      day: e.$d,
    }));
  };

  const handleSubmit = async (e) => {
    if (!formData.day) {
      dayRef.current.focus();
      return;
    }
    e.preventDefault();
    if (!formData.name) {
      nameRef.current.focus();
      return;
    }
    if (!formData.description) {
      descriptionRef.current.focus();
      return;
    }

    if (!timePattern.test(formData.startTime)) {
      startTimeRef.current.focus();
      return;
    }
    if (!timePattern.test(formData.endTime)) {
      endTimeRef.current.focus();
      return;
    }

    const { repeatMonth, ...formDataToSend } = formData;
    let day = new Date(formData.day);
    day.setDate(day.getDate() + 1);

    const repeatEnd = repeatEndDate(day, parseInt(repeatMonth, 10));

    try {
      setDisplayPage(false);
      const response = await fetch("http://appointment-back-qd2z.onrender.com/api/lessons/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({
          ...formDataToSend,
          repeatEndDate: repeatEnd,
          day: day,
        }),
      });
      const data = await response.json();
      if (
        data.message === "Token is missing" ||
        data.message === "Token is invalid or expired" ||
        data.message === "Unauthorized: Insufficient role"
      ) {
        removeCookie();
        setErrorString("שגיאה באימות!");
      }
      if (data.message === "קבוע לך שיעור במועד זה") {
        setErrorString(data.message);
      }

      if (data.message === "כבר קבועים שיעורים באחד ממועדים אלו") {
        setErrorString(data.message);
      }
      setDisplayPage(true);
    } catch (error) {
      console.error("Error creating group lesson:", error);
      setErrorString("Error");
      handleCloseCreateGroupLesson();
      setDisplayPage(true);
    }
  };

  const handleCloseCreateGroupLesson = () => {
    dispatch(toggleSetGroupModal());
  };

  const handleCloseError = () => {
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleDisplayMonth();
    }
  };

  // const handleKetDownDate = (event) => {
  //   if (event.key === "Enter") {
  //     setIsDateOpen((prev) => !prev);
  //   }
  // };

  if (message) {
    return (
      <styledGroup.Main>
        <div onClick={handleCloseError} style={{ direction: "rtl" }}>
          X
        </div>
        <strong>{message}</strong>
      </styledGroup.Main>
    );
  }

  // if (displayPage) {
  //   return  <div style={{width:'100%', display: 'flex', justifyContent:'center'}}><ClipLoader color="#000000" loading={true} size={150} /></div>
  // }

  return (
    <>
      <styledGroup.RequestForm onSubmit={handleSubmit}>
        <div
          className="line"
          style={{
            content: "",
            width: "100%",
            height: "3px",
            backgroundColor: "#e6e5eb",
          }}
        ></div>

        <h1
          style={{
            textAlign: "center",
            marginBlockStart: "0rem",
            marginBlockEnd: "0rem",
            marginBottom: "0.5rem",
            color: "black",
          }}
        >
          קביעת אימון קבוצתי
        </h1>

        <div className="line3">
          <styledGroup.FormItemContainer
            style={{ flexDirection: "row", height: "2.35rem", gap: "0.5rem" }}
          >
            <label style={{ color: textColor }}>אימון חוזר:</label>
            <styledGroup.StyledCheckbox
              type="checkbox"
              aria-label={`אימון חוזר - ${
                formData.repeatsWeekly ? "כן" : "לא"
              }`}
              aria-pressed={`${formData.repeatsWeekly ? "כן" : "לא"}`}
              role="button"
              name="repeatsWeekly"
              checked={formData.repeatsWeekly}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleChange({
                    target: {
                      name: "repeatsWeekly",
                      type: "checkbox",
                      checked: !formData.repeatsWeekly,
                    },
                  });
                  handleDisplayMonth();
                }
              }}
            />

            <styledGroup.StyledSelectContainer
              ref={monthRef}
              role="combobox"
              aria-expanded={showMonthsOptions ? "true" : "false"}
              aria-controls="monthOptionsList"
              aria-haspopup="listbox"
              aria-label="Select month amount"
              style={{
                width: "100%",
                minWidth: "6.820625rem",
                flexGrow: "1",
                height: "100%",
                color: "black !important",
              }}
            >
              <div
                className="custom-select"
                onClick={() => handleDisplayMonth()}
                onKeyDown={handleKeyDown}
                tabindex={formData.repeatsWeekly ? "0" : "-1"}
                aria-haspopup="listbox"
                aria-label="month amount"
                style={{
                  height: "100%",
                  maxHeight: "2.35rem",
                  overflow: "hidden",
                  width: "100%",
                  top: "33%",
                  cursor: formData.repeatsWeekly ? "pointer" : "not-allowed", // Disable cursor
                  backgroundColor: formData.repeatsWeekly
                    ? "#e6e5eb"
                    : "#f0f0f0",
                }}
              >
                <label
                  htmlFor="months"
                  name="months"
                  style={{
                    color: formData.repeatsWeekly ? "black" : "grey",
                    cursor: formData.repeatsWeekly ? "pointer" : "not-allowed",
                    position: "relative",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "block",
                  }}
                >
                  {formData.repeatsWeekly ? (
                    <span aria-label="בחירת כמות חודשים">
                      {formData.repeatMonth}
                    </span>
                  ) : (
                    <span
                      aria-label="לכמה חודשים"
                      style={{ color: "grey", fontSize: "1rem" }}
                    >
                      לכמה חודשים
                    </span>
                  )}
                </label>
              </div>
              <div
                className={`options-container ${
                  showMonthsOptions ? "show" : ""
                }`}
                ref={monthRef}
                role="listbox"
              >
                {showMonthsOptions}

                {generateMonthOptions()}
              </div>
            </styledGroup.StyledSelectContainer>
          </styledGroup.FormItemContainer>
        </div>

        <div className="line3">
          <styledGroup.FormItemContainer customClass="">
            <label>תאריך האימון:</label>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              style={{ width: "100% !important" }}
            >
              <StyledBox>
                <MobileDatePicker
                  value={formData.day ? dayjs(formData.day) : null}
                  onAccept={(e) => {
                    const value = dayjs(e.$d);
                    handleDateChange(value);
                  }}
                  inputRef={dayRef}
                  aria-label="תאריך האימון"
                  slotProps={{
                    textField: {
                      placeholder: "תאריך",
                      sx: { color: "black" },
                    },
                  }}
                />
              </StyledBox>
            </LocalizationProvider>
          </styledGroup.FormItemContainer>
        </div>

        <div className="line3">
          <styledGroup.FormItemContainer>
            <label>שם האימון:</label>
            <input
              placeholder="שם"
              aria-label="שם האימון"
              ref={nameRef}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </styledGroup.FormItemContainer>
          <styledGroup.FormItemContainer>
            <label>תיאור האימון:</label>
            <input
              style={{ alignContent: "center" }}
              placeholder="תיאור"
              aria-label="תיאור האימון"
              ref={descriptionRef}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </styledGroup.FormItemContainer>
        </div>

        <div className="line3">
          <styledGroup.FormItemContainer>
            <label>שעת התחלה: פורמט- XX:XX</label>
            <input
              aria-label="שעת התחלה: פורמט - XXXX"
              placeholder="שעת התחלה פורמט XX:XX"
              ref={startTimeRef}
              type="text"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              pattern={timePattern.source}
              required
            />
          </styledGroup.FormItemContainer>

          <styledGroup.FormItemContainer>
            <label>שעת סיום:</label>
            <input
              placeholder="שעת סיום פורמט XX:XX"
              aria-label="שעת סיום פורמט XX:XX"
              ref={endTimeRef}
              type="text"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              pattern={timePattern.source}
              required
            />
          </styledGroup.FormItemContainer>
        </div>
        <div
          className="line"
          style={{
            content: "",
            width: "100%",
            height: "3px",
            backgroundColor: "#e6e5eb",
          }}
        ></div>

        {displayPage ? (
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            style={{ border: "none" }}
            aria-labelledby="הוסף אימון"
          >
            הוסף אימון
          </button>
        ) : (
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              border: "none",
            }}
          >
            <ClipLoader color="#000000" loading={true} size={20} />
          </button>
        )}
        <div
          className="line"
          style={{
            content: "",
            width: "100%",
            height: "3px",
            backgroundColor: "#e6e5eb",
          }}
        ></div>
      </styledGroup.RequestForm>
      <CustonAlert />
    </>
  );
};

export default Group2;

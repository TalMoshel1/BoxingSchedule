import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  toggleSetDeleteLessonModal,
  setLessonsToDisplay,
} from "../redux/calendarSlice.js";
import { AdminContext } from "../context/AdminContext.jsx";
import { removeCookie } from "../utils/removeCookie.js";
import { useKickOut } from "../hooks/KickOut.jsx";
import { ErrorContext } from "../context/ErrorContext.jsx";

const DeleteLesson = ({
  lesson: propLesson,
  closeModal,
  hideLesson,
  removeLesson,
}) => {
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.calendar.deleteLessonModalData);

  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const { setErrorString } = useContext(ErrorContext);

  const handleToggleModal = (obj) => {
    dispatch(toggleSetDeleteLessonModal());
    if (obj) {
      dispatch(setLessonsToDisplay(obj));
    }
  };

  const handleDeleteAllChange = (event) => {
    setIsDeleteAll(event.target.checked);
  };

  const deleteLesson = async (lessonId) => {
    try {
      const response = await fetch(
        `http://appointment-back-qd2z.onrender.com/api/lessons/${lessonId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deleteAll: isDeleteAll }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        removeCookie("token");
        setErrorString("שגיאה באימות!");
        throw new Error(
          `http error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (hideLesson) {
        hideLesson(lessonId);
        return closeModal();
      }
      if (removeLesson) {
        removeLesson(lessonId);
        return closeModal();
      }
      handleToggleModal({ type: "deleteDisplayedLesson", id: lessonId });
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  const DeleteContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    align-items: center;

    button {
      padding: 1rem;
      font-size: 1rem;
      border: none;
    }
  `;

  const currentLesson = propLesson || (lesson && lesson.lesson) || {};

  const repeatsWeekly = currentLesson.repeatsWeekly || false;

  return (
    <DeleteContainer>
      {repeatsWeekly && (
        <>
          <label
            style={{
              color: "#fff",
              direction: "rtl",
              textAlign: "center",
              fontWeight: "100",
            }}
          >
            מחק את כל השיעורים בסדרה זו
          </label>
          <input
            type="checkbox"
            checked={isDeleteAll}
            onChange={handleDeleteAllChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsDeleteAll((prev) => !prev);
              }
            }}
          />
        </>
      )}

      <button
        type="button"
        style={{
          backgroundColor: "#F0F0F0",
          color: "black !important",
          padding: "1rem",
          borderRadius: "20px",
          width: "max-content",
        }}
        onClick={() => {
          if (currentLesson._id) {
            deleteLesson(currentLesson._id);
            if (closeModal) {
              closeModal();
            }
          } else {
            console.error("No lesson ID provided.");
          }
        }}
      >
        מחק
      </button>
    </DeleteContainer>
  );
};

export default DeleteLesson;

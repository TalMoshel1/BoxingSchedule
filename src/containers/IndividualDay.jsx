import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import DeleteLesson from "./deleteLesson";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { AdminContext } from "../context/AdminContext";
import CustonAlert from "../components/CustomAlert";
import {
  CloseButton,
  ListItem,
  ListContainer,
  InfoButton,
} from "./IndividualDay/styled-component";

export const IndividualDay = ({ displayedData }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonIdToHide, setLessonIdToHide] = useState([]);
  const { isVerified } = useContext(AdminContext);

  const displayLessons = () => {
    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const sortByEndTime = (arr) => {
      return arr.sort((a, b) => parseTime(a.endTime) - parseTime(b.endTime));
    };

    const filteredLessons = displayedData.filter((lesson) => {
      return !lessonIdToHide.includes(lesson._id);
    });

    if (lessonIdToHide.length > 0 && filteredLessons.length === 0) {
      return [];
    }

    const approvedLessons = filteredLessons.filter(
      (lesson) => lesson.isApproved
    );

    return sortByEndTime(approvedLessons);
  };

  const hideLesson = (lessonId) => {
    setLessonIdToHide((prev) => [...prev, lessonId]);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("boxing");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenDeleteModal = (lesson) => {
    setCurrentLesson(lesson);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentLesson(null);
    setModalType("");
  };

  const renderModalContent = () => {
    if (modalType === "delete") {
      return (
        <DeleteLesson
          lesson={currentLesson}
          closeModal={handleCloseModal}
          hideLesson={hideLesson}
        />
      );
    }
    return null;
  };

  const time = displayedData[0]?.day;

  return (
    <>
      <ListContainer isModalOpen={isModalOpen}>
        {displayLessons().every((lesson) => lesson.type === "private") &&
        <>
              <h1 style={{ color: "grey" }}>
            אין שיעורים היום
            <span>
              {" "}
              <CelebrationIcon />
            </span>
          </h1>
        </>}
        {displayLessons().length > 0 ? (
          displayLessons().map((l, index) => {
            if (l.isApproved && l.type !== "group" && isVerified) {
              return (
                <li
                  style={{
                    width: "95%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      marginLeft: "1rem",
                      direction: "ltr",
                      alignContent: "center",
                    }}
                  >
                    {l.startTime} - {l.endTime}
                  </span>
                  <ListItem key={index}>
                    {isVerified === true && (
                      <CloseButton
                        style={{ fill: "black !important" }}
                        onClick={() => handleOpenDeleteModal(l)}
                      >
                        <CloseIcon style={{ fill: "black !important" }} />
                      </CloseButton>
                    )}

                    <div style={{ width: "100%" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
              
                        <strong>
                          <span>אימון אישי</span>
                          <br />
                          <span
                            style={{
                              direction: "rtl",
                              height: "fit-content",
                              display: "flex",
                              alignItems: "center",
                              fontSize: "0.8rem",
                              fontWeight: "100",
                              color: "grey",
                            }}
                          >
                            {" "}
                            <PermIdentityIcon />
                            מאמן: {l.trainer}
                          </span>
                          {l.type === "private" && isVerified === true && (
                            <span
                              style={{
                                direction: "rtl",
                                fontSize: "0.8rem",
                                fontWeight: "100",
                                color: "grey",
                              }}
                            >
                              {" "}
                              {l.studentName} {l.studentPhone}
                            </span>
                          )}
                        </strong>
                      </div>
                    </div>
                  </ListItem>
                </li>
              );
            } else if (l.type === "group") {
              return (
                <li
                  style={{
                    width: "95%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      marginLeft: "1rem",
                      direction: "ltr",
                      alignContent: "center",
                    }}
                  >
                    {l.startTime} - {l.endTime}
                  </span>
                  <ListItem key={index}>
                    {isVerified === true && (
                      <CloseButton
                        style={{ fill: "black !important" }}
                        onClick={() => handleOpenDeleteModal(l)}
                      >
                        <CloseIcon style={{ fill: "black !important" }} />
                      </CloseButton>
                    )}

                    <div style={{ width: "100%" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <strong>
                          <span>{l.name}</span>
                          <br />
                          <span
                            style={{
                              direction: "rtl",
                              height: "fit-content",
                              display: "flex",
                              alignItems: "center",
                              fontSize: "0.8rem",
                              fontWeight: "100",
                              color: "grey",
                            }}
                          >
                            {" "}
                            <PermIdentityIcon />
                            {l.trainer}
                          </span>
                          <span
                            style={{
                              fontSize: "0.8rem",
                              fontWeight: "100",
                              color: "grey",
                            }}
                          >
                            {l.description}
                          </span>
                        </strong>
                      </div>
                    </div>
                  </ListItem>
                </li>
              );
            }
          })
        ) : (
          <></>
        )}
      </ListContainer>

      <CustonAlert />

      {isModalOpen && (
        <Modal type={modalType} closeModal={handleCloseModal}>
          {renderModalContent()}
        </Modal>
      )}
    </>
  );
};

export default IndividualDay;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Day from "../components/Day.jsx";
import {
  formatDate,
  isCurrentBiggerThanNextFetch,
  isCurrentSmallerThanNextFetch,
} from "../utils/compareTime.js";
import { setTriggerRefetch } from "../redux/calendarSlice.js";
import "./Days/Days.css";
import ClipLoader from "react-spinners/ClipLoader";
import { renderDays } from "../utils/renderDays.js";
import IndividualDay from "./IndividualDay.jsx";
import { SpinnerContainer } from "./Days/styled-components.jsx";
import { isToday } from "../utils/isTimeToday.js";

const Days = () => {
  const dispatch = useDispatch();
  const [daysState, setDaysState] = useState([]);
  const [fetchApi, setFetchApi] = useState(false);
  const [fetchedLessons, setFetchedLessons] = useState([]);
  const currentDateStr = useSelector((state) => state.calendar.currentDate);
  const renderedDaysDate = useSelector(
    (state) => state.calendar.renderedDaysDate
  );
  const fourWeeksCounter = useSelector(
    (state) => state.calendar.fourWeeksCounter
  );
  const [lessonsCache, setLessonsCache] = useState({});
  const triggerRefetch = useSelector((state) => state.calendar.triggerRefetch);

  const currentDate = new Date(currentDateStr);
  const [lessonsToDisplay, setLessonsToDisplay] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [todayDay, setDayToday] = useState(null);
  const [begginingOfWeek, setBegginingOfWeek] = useState();

  useEffect(() => {
    console.log("fetchedLessons: ", fetchedLessons);
  }, [fetchedLessons]);

  useEffect(() => {
    if (isToday(currentDate) || !fourWeeksCounter.count) {
      setFetchApi(true);
    }
    if (fourWeeksCounter.count) {
      const newDays = renderDays(new Date(renderedDaysDate), "week");
      setDaysState((prev) => {
        return JSON.stringify(prev) === JSON.stringify(newDays)
          ? prev
          : newDays;
      });
      return setFetchApi(false);
    }
    // else if (isCurrentSmallerThanNextFetch(currentDate, next4weeks)) {
    //   const newDays = renderDays(new Date(renderedDaysDate), "week");
    //   setDaysState((prev) =>
    //     JSON.stringify(prev) === JSON.stringify(newDays) ? prev : newDays
    //   );
    //   return setFetchApi(false)
    // ;
    // }
  }, [currentDate, renderedDaysDate]);

  // useEffect(() => {
  //   console.log('current:Date: ', currentDate)
  //   console.log('next4weeks: ', next4weeks)
  //   if (isToday(currentDate)) {
  //     return setFetchApi(true);
  //   }
  //   if (isCurrentBiggerThanNextFetch(currentDate, next4weeks)) {
  //     console.log('ok ')
  //     console.log('renderedDaysDate: ', renderedDaysDate)
  //     const newDays = renderDays(new Date(renderedDaysDate), "week");
  //     setDaysState((prev) => {
  //       return JSON.stringify(prev) === JSON.stringify(newDays)
  //         ? prev
  //         :
  //         newDays
  //     });

  //     return setFetchApi(true);
  //   } else if (isCurrentSmallerThanNextFetch(currentDate, next4weeks)) {
  //     const newDays = renderDays(new Date(renderedDaysDate), "week");
  //     setDaysState((prev) =>
  //       JSON.stringify(prev) === JSON.stringify(newDays) ? prev : newDays
  //     );
  //     return setFetchApi(false);
  //   }
  // }, [currentDate, renderedDaysDate]);

  useEffect(() => {
    const sendPostRequest = async () => {
      setIsDisplay(false);
      try {
        const response = await fetch(
          "https://appointment-back-qd2z.onrender.com/api/lessons/month",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              start: new Date(currentDate),
            }),
          }
        );

        if (!response.ok) {
          setIsDisplay(true);
          throw new Error(
            `http error! Status: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        // setLessonsCache(data)
        setFetchedLessons((prev) => {
          if (!prev) {
            return { current: data };
          }

          return { cache: prev, current: data };
        });

        // setFetchedLessons(data);
        const today = new Date();
        const formattedToday = today
          .toDateString()
          .split(" ")
          .slice(0, 3)
          .join(", ");
        const days = renderDays(currentDate, "week");

        setDaysState((prev) => {
          const days = renderDays(currentDate, "week");
          return JSON.stringify(prev) === JSON.stringify(days) ? prev : days;
        });

        const todayDay = days.find(
          (day) =>
            day.date.toDateString().split(" ").slice(0, 3).join(", ") ===
            formattedToday
        );

        if (todayDay) {
          setDayToday(todayDay);
          retrieveDataForDay(todayDay.displayedDate, data);
        } else {
          setSelectedDate(days[0]);
          retrieveDataForDay(days[0].displayedDate, data);
        }

        setIsDisplay(true);
      } catch (error) {
        setIsDisplay(true);
      }
    };

    if (fetchApi === true) {
      sendPostRequest();
    } else if (triggerRefetch === true) {
      console.log("ok!");
      // const lessons = retrieveDataForDay(currentDate, fetchedLessons.current, 'cache')
    }
  }, [fetchApi, triggerRefetch]);

  const retrieveDataForDay = (dayDisplayedDate, fetchedLessonsProp) => {
    if (fetchedLessonsProp) {
      const lessonsForDay = fetchedLessonsProp.filter((lesson) => {
        const lessonDayFormated = formatDate(lesson.day);
        return formatDate(dayDisplayedDate) === lessonDayFormated;
      });

      setLessonsToDisplay(lessonsForDay);
      return lessonsForDay;
    }

    const lessonsForDay = fetchedLessons?.filter((lesson) => {
      const lessonDayFormated = formatDate(lesson.day);
      return dayDisplayedDate === lessonDayFormated;
    });

    return setLessonsToDisplay(lessonsForDay);
  };

  useEffect(() => {
    if (daysState && fetchedLessons.current?.length > 0) {
      const today = new Date();
      const formattedToday = today
        .toDateString()
        .split(" ")
        .slice(0, 3)
        .join(", ");

      const todayDay = daysState.find(
        (day) =>
          day.date.toDateString().split(" ").slice(0, 3).join(", ") ===
          formattedToday
      );

      if (todayDay) {
        setDayToday(todayDay);
        retrieveDataForDay(todayDay.displayedDate, fetchedLessons.current);
      } else {
        setSelectedDate(daysState[0]);
        retrieveDataForDay(daysState[0].displayedDate, fetchedLessons.current);
      }
      setIsDisplay(true);
    }
  }, [daysState, fetchedLessons]);

  const whichDayIsSelected = (selectedDate, day, todayDay, i) => {
    if (selectedDate?.displayedDate) {
      if (selectedDate?.displayedDate === day.displayedDate) {
        return true;
      }
    }

    if (
      todayDay?.displayedDate === day.displayedDate &&
      !selectedDate?.displayedDate
    ) {
      if (todayDay?.displayedDate === day.displayedDate) {
        return true;
      }
    }

    if (i === 0) {
      if (fourWeeksCounter.count !== 0 && isToday(day)) {
        return true;
      }
    }
  };

  // useEffect(() => {
  //   let newSelectedDate = null;

  //   if (daysState.length > 0 && fetchedLessons) {
  //     daysState.forEach((day, i) => {
  //       if (i === 0 && isTodayDateSmallerThanSunday(todayDay.date, day.date && !selectedDate?.displayedDate)) {
  //        return newSelectedDate = day;

  //       }
  //       if (selectedDate?.displayedDate === day.displayedDate) {
  //         return newSelectedDate = day;
  //       }
  //        if (!selectedDate?.displayedDate && todayDay?.displayedDate === day.displayedDate) {
  //         console.log('current is today!')

  //          newSelectedDate = day;
  //          console.log('newSelectedDate: ', newSelectedDate)
  //       }

  //     });

  //     if (newSelectedDate?.displayedDate !== selectedDate?.displayedDate) {
  //       console.log('!')
  //       // setSelectedDate(newSelectedDate);

  //       // retrieveDataForDay(newSelectedDate, fetchedLessons);
  //     }

  //   }

  // }, [selectedDate?.displayedDate, todayDay, daysState, currentDate]);

  if (isDisplay && daysState.length > 0) {
    return (
      <>
        <div className="days-container">
          {daysState?.map((day, index) => {
            if (!day.displayedDate.includes("Sat")) {
              return (
                <Day
                  key={index}
                  tabindex={0}
                  date={day}
                  isSelected={whichDayIsSelected(
                    selectedDate,
                    day,
                    todayDay,
                    index
                  )}
                  isToday={
                    todayDay?.displayedDate === day.displayedDate &&
                    !selectedDate?.displayedDate
                      ? "#00d180"
                      : todayDay?.displayedDate === day.displayedDate &&
                        selectedDate?.displayedDate
                      ? "rgba(0, 209, 128,0.5)"
                      : false
                  }
                  onSelectDate={() => {
                    const date = new Date(day.date);
                    const today = new Date();

                    const sameYear = date.getFullYear() === today.getFullYear();
                    const sameMonth = date.getMonth() === today.getMonth();
                    const sameDay = date.getDate() === today.getDate();

                    if (sameYear && sameMonth && sameDay) {
                      setSelectedDate();
                      return retrieveDataForDay(day.displayedDate);
                    }

                    setSelectedDate(day);
                    retrieveDataForDay(day.displayedDate);
                  }}
                />
              );
            }
          })}
        </div>
        <IndividualDay displayedData={lessonsToDisplay} />
      </>
    );
  } else {
    return (
      <SpinnerContainer>
        <ClipLoader />
      </SpinnerContainer>
    );
  }
};

export default Days;

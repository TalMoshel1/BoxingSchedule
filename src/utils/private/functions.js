function isTenDigitNumber(str) {
  return /^\d{10}$/.test(str);
}

const getDayLessons = async (day, setLoading, setThisDayLessons) => {
  let fixedDay = new Date(day.$d);
  fixedDay.setDate(fixedDay.getDate() + 1);
  try {
    setLoading(true);
    const response = await fetch(
      "https://http://appointment-back-qd2z.onrender.com/api/lessons/day",
            // "http://localhost:3002/api/lessons/day",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: fixedDay,
        }),
      }
    );

    if (!response.ok) {
      setLoading(false);
      throw new Error(
        `HTTP error! Status: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    setThisDayLessons(data);
    setLoading(false);
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
};

const generateTimeOptions = (cantIn, handleSelectOption) => {
  const options = [];
  let hour = 8;
  let minute = 0;

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  while (hour < 20 || (hour === 20 && minute === 0)) {
    const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
    const timeInMinutes = parseTime(time);

    const isDisabled = cantIn.some((l) => {
      const start = l.props.children[0];
      const end = l.props.children[2];
      const startInMinutes = parseTime(start);
      const endInMinutes = parseTime(end);

      return timeInMinutes >= startInMinutes && timeInMinutes < endInMinutes;
    });

    options.push(
      <div
        key={time}
        style={{}}
        className={`option ${isDisabled ? "disabled" : ""}`}
        onClick={() => !isDisabled && handleSelectOption(time)}
      >
        {time}
      </div>
    );
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour += 1;
    }
  }

  return options;
};

export { isTenDigitNumber, getDayLessons, generateTimeOptions };
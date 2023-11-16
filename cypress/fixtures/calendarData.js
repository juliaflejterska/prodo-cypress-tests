function getFutureDate(days) {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  return futureDate.toISOString().split("T")[0]; // YYYY-MM-DD
}

function getPastDate(days) {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - days);
  return pastDate.toISOString().split("T")[0]; // YYYY-MM-DD
}

const today = new Date().toISOString().split("T")[0];

const calendarData = {
  validOneDayEvent: {
    title: "oneDay",
    date1: today,
    time1: "16:00",
    date2: today,
    time2: "17:30",
  },
  validMultipleDaysEvent: {
    title: "multipleDay",
    date1: today,
    time1: "12:00",
    date2: getFutureDate(2),
    time2: "23:30",
  },
  invalidEvent: {
    title: "",
    date1: "",
    time1: "",
    date2: "",
    time2: "",
  },
  invalidTitleEvent: {
    title: "",
    date1: today,
    time1: "16:00",
    date2: today,
    time2: "17:30",
  },
  invalidDateEvent: {
    title: "oneDay",
    date1: today,
    time1: "16:00",
    date2: getPastDate(2),
    time2: "17:30",
  },
  invalidDatesEvent: {
    title: "oneDay",
    date1: "",
    time1: "",
    date2: "",
    time2: "",
  },
  validMouseEvent: {
    title: "mouseEvent",
  },
  invalidMouseEvent: {
    title: "",
  },
};

export default calendarData;

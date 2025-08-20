const cheerio = require("cheerio");
const moment = require("moment");
const axios = require("axios");

const SUBJECT_OPTIONS = [
  "ENGLISH LANGUAGE",
  "MATHEMATICS",
  "INTEGRATED SCIENCE",
  "NATURAL SCIENCE",
  "HISTORY",
  "SOCIAL STUDIES",
  "OUR WORLD,OUR PEOPLE",
  "RELIGIOUS & MORAL EDUCATION",
  "COMPUTING",
  "CREATIVE ARTS & DESIGN",
  "CAREER TECHNOLOGY",
  "GHANAIAN LANGUAGE",
  "FRENCH",
  "ARABIC",
  "PHYSICAL & HEALTH EDUCATION",
  "PHYSICAL EDUCATION",
  "READING",
  "WRITING",
  "MUSIC & DANCE",
  "ORALS & RHYMES",
];

function stripHtmlTags(html) {
  const $ = cheerio.load(html);
  return $.text();
}

function truncateWords(paragraph, size) {
  const stripedWords = stripHtmlTags(paragraph);

  if (stripedWords?.length <= size) return stripedWords;

  const words = stripedWords?.split(" ");
  return words.slice(0, size)?.join(" ");
}

const isWeekend = (date) => {
  const day = moment(date).day();
  return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
};

/**
 * Converts an image from a URL to a Base64 string.
 * @param {string} imageUrl - The URL of the image.
 * @returns {Promise<string>} - A promise that resolves to a Base64 encoded image string.
 */
const convertImageToBase64 = async (imageUrl) => {
  try {
    // Fetch the image as binary data
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    // Convert binary data to Base64
    const base64Image = Buffer.from(response.data).toString("base64");

    // Get the image MIME type from headers
    const mimeType = response.headers["content-type"];

    // Return the Base64 image in proper format
    return `data:${mimeType};base64,${base64Image}`;
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    throw new Error("Failed to convert image to Base64");
  }
};

const getWeekdays = () => {
  const weekdays = [];
  const startOfWeek = moment().startOf("week"); // Sunday

  for (let i = 0; i < 7; i++) {
    const currentDay = startOfWeek.clone().add(i, "days");
    const dayName = currentDay.format("ddd");

    if (dayName !== "Sat" && dayName !== "Sun") {
      weekdays.push(currentDay.format("ddd, Do MMM"));
    }
  }

  return weekdays;
};

const getMonthsBetween = (start, end) => {
  const startDate = moment(start);
  const endDate = moment(end);

  // Get all months between start and end date (inclusive)
  const months = [];
  let current = startDate.clone().startOf("month");

  while (current.isSameOrBefore(endDate, "month")) {
    months.push(current.format("MMMM YYYY"));
    current.add(1, "month");
  }

  return months;
};

const getCurrentWeekRange = () => {
  const startOfWeek = moment().startOf("isoWeek"); // Monday
  const endOfWeek = moment().endOf("isoWeek"); // Sunday
  return { start: startOfWeek, end: endOfWeek };
};

// Function to process data for this week
const processWeeklyFees = (payments) => {
  const startOfWeek = moment().startOf("week"); // Monday start
  const endOfWeek = moment().endOf("week"); // Sunday end

  // Generate labels for the week
  const days = [];
  let current = startOfWeek.clone();
  while (current.isSameOrBefore(endOfWeek, "day")) {
    days.push(current.format("ddd, Do MMM"));
    current.add(1, "day");
  }

  // Initialize daily totals
  const dailyPayments = days.reduce((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {});

  // Aggregate payments per day
  payments.forEach(({ paid, createdAt, date }) => {
    const paymentDate = moment(createdAt || date);
    if (paymentDate.isBetween(startOfWeek, endOfWeek, null, "[]")) {
      const dayName = paymentDate.format("ddd, Do MMM");
      dailyPayments[dayName] += paid;
    }
  });

  return {
    labels: days,
    datasets: [
      {
        label: "Total Fees This Week",
        data: days.map((day) => dailyPayments[day]),
        // backgroundColor: "#012e54",
        borderColor: "#012e54",
        borderWidth: 1,
        fill: true,
        tension: 0.3,
        pointStyle: "circle",
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };
};

// Function to process data for the chart
const processFeeForTerm = (from, to, payments) => {
  const startDate = moment(new Date(from));
  const endDate = moment(new Date(to));

  const filteredPayments = payments.filter(({ createdAt, date }) => {
    const paymentDate = moment(createdAt || date);
    return paymentDate.isBetween(startDate, endDate, null, "[]"); // Inclusive of start & end date
  });

  // Generate month labels
  const months = [];
  let current = startDate.clone().startOf("month");

  while (current.isSameOrBefore(endDate, "month")) {
    months.push(current.format("MMMM YYYY"));
    current.add(1, "month");
  }

  // Initialize payment sum per month
  const monthlyPayments = months.reduce((acc, month) => {
    acc[month] = 0;
    return acc;
  }, {});

  // Aggregate payments per month
  filteredPayments.forEach(({ paid, createdAt, date }) => {
    const monthYear = moment(createdAt || date).format("MMMM YYYY");
    if (monthlyPayments.hasOwnProperty(monthYear)) {
      monthlyPayments[monthYear] += paid;
    }
  });

  return {
    labels: months,
    datasets: [
      {
        label: "Total Paid",
        data: months.map((month) => monthlyPayments[month]),
        backgroundColor: ["#012e54", "#ffc09f", "#4bc0c0"],
        borderWidth: 2,
        borderRadius: 5,
        barThickness: 20,
      },
    ],
  };
};

const getTotalFeesForWeek = (payments) => {
  const startOfWeek = moment().startOf("week"); // Monday start
  const endOfWeek = moment().endOf("week"); // Sunday end

  return payments
    .filter(({ createdAt, date }) =>
      moment(createdAt || date).isBetween(startOfWeek, endOfWeek, null, "[]")
    )
    .reduce((sum, payment) => sum + payment?.paid, 0);
};

//Function to get weekly attendance

const processWeeklyAttendance = (attendanceData) => {
  const weekdays = getWeekdays();
  const weeklyAttendance = {};

  // Initialize the structure with weekdays
  weekdays.forEach((day) => {
    weeklyAttendance[day] = {};
  });

  attendanceData.forEach(({ level, date, status }) => {
    const formattedDate = moment(date).format("ddd, Do MMM");

    if (!weeklyAttendance[formattedDate]) return; // Ignore weekends

    if (!weeklyAttendance[formattedDate][level]) {
      weeklyAttendance[formattedDate][level] = {
        Present: 0,
        Absent: 0,
        Unmarked: 0,
      };
    }

    status.forEach(({ status }) => {
      if (status === "Present") {
        weeklyAttendance[formattedDate][level].Present += 1;
      } else if (status === "Absent") {
        weeklyAttendance[formattedDate][level].Absent += 1;
      } else {
        weeklyAttendance[formattedDate][level].Unmarked += 1; // Count empty status ("")
      }
    });
  });

  const labels = getWeekdays(); // Ensure only weekdays are present
  const classLevels = new Set();

  Object.values(weeklyAttendance).forEach((classes) => {
    Object.keys(classes).forEach((level) => classLevels.add(level));
  });
  // ["#012e54", "#ffc09f", "#4bc0c0"],
  const datasets = [];
  ["Present", "Absent", "Unmarked"].forEach((status) => {
    classLevels.forEach((level) => {
      datasets.push({
        label: `${level} - ${status}`,
        data: labels.map(
          (date) => weeklyAttendance[date]?.[level]?.[status] || 0
        ),
        backgroundColor:
          status === "Present"
            ? "#012e54"
            : status === "Absent"
            ? "#ffc09f"
            : "rgba(255, 206, 86, 0.6)", // Yellow for Unmarked
        borderColor:
          status === "Present"
            ? "rgba(75, 192, 192, 1)"
            : status === "Absent"
            ? "rgba(255, 99, 132, 1)"
            : "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      });
    });
  });

  return { labels, datasets };
};

const getTotalAttendance = (attendanceData) => {
  const totals = { Present: 0, Absent: 0, Unknown: 0 };

  attendanceData.forEach(({ status }) => {
    status.forEach(({ status }) => {
      if (status === "Present") {
        totals.Present += 1;
      } else if (status === "Absent") {
        totals.Absent += 1;
      } else {
        totals.Unknown += 1; // Empty status ("")
      }
    });
  });

  return totals;
};

// Function to process data by gender
const getAttendanceByGender = (attendances) => {
  const totals = {};

  attendances.forEach(({ status }) => {
    status.forEach(({ gender, status }) => {
      if (!totals[gender]) {
        totals[gender] = { Present: 0, Absent: 0 };
      }
      if (status === "Present") totals[gender].Present += 1;
      if (status === "Absent") totals[gender].Absent += 1;
    });
  });

  // Process attendance data
  const attendanceByGender = totals;
  const genders = Object.keys(attendanceByGender);
  const presentData = genders.map(
    (gender) => attendanceByGender[gender].Present
  );
  const absentData = genders.map((gender) => attendanceByGender[gender].Absent);

  "#012e54", "#ffc09f";
  // Chart data
  const data = {
    labels: genders,
    datasets: [
      {
        label: "Present",
        data: presentData,
        backgroundColor: "#012e54",
        barThickness: 20,
        borderRadius: 5,
      },
      {
        label: "Absent",
        data: absentData,
        backgroundColor: "#ffc09f",
        barThickness: 20,
        borderRadius: 5,
      },
    ],
  };

  return data;
};

const getFormattedWeekDays = () => {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const today = moment(); // Get today's date
  const startOfWeek = today.clone().startOf("week").add(1, "day"); // Start from Monday

  return weekDays.map((day, index) => {
    const date = startOfWeek.clone().add(index, "days");
    return date.format("ddd, Do MMM");
  });
};

// Function to process attendance data by day of the week
const processGeneralWeeklyAttendance = (data) => {
  const { start, end } = getCurrentWeekRange();
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const totals = {};

  // console.log(data)

  // Initialize totals
  weekDays.forEach((day) => {
    totals[day] = { Present: 0, Absent: 0 };
  });

  data.forEach(({ date, status }) => {
    const formattedDate = moment(date);

    // Check if the date is in the current week
    if (formattedDate.isBetween(start, end, "day", "[]")) {
      const dayOfWeek = formattedDate.format("dddd");

      if (weekDays.includes(dayOfWeek)) {
        status.forEach(({ status }) => {
          if (status === "Present") totals[dayOfWeek].Present += 1;
          if (status === "Absent") totals[dayOfWeek].Absent += 1;
        });
      }
    }
  });

  const days = Object.keys(totals);
  const presentData = days.map((day) => totals[day].Present);
  const absentData = days.map((day) => totals[day].Absent);

  return {
    labels: getFormattedWeekDays(),
    datasets: [
      {
        label: "Present",
        data: presentData,
        backgroundColor: "#012e54",
        barThickness: 20,
        borderRadius: 5,
      },
      {
        label: "Absent",
        data: absentData,
        backgroundColor: "#ffc09f",
        barThickness: 20,
        borderRadius: 5,
      },
    ],
  };
};

function getInitials(schoolName) {
  return schoolName
    .split(" ") // Split the name into words
    .filter(Boolean) // Remove any empty strings
    .map((word) => word[0]) // Take the first letter of each word
    .join("") // Join them together
    .toUpperCase(); // Convert to uppercase
}

module.exports = {
  SUBJECT_OPTIONS,
  truncateWords,
  getInitials,
  stripHtmlTags,
  isWeekend,
  convertImageToBase64,
  getMonthsBetween,
  processFeeForTerm,
  processWeeklyFees,
  getTotalFeesForWeek,
  processWeeklyAttendance,
  getTotalAttendance,
  getAttendanceByGender,
  processGeneralWeeklyAttendance,
};

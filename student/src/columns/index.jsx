export const STUDENT_FEES_HISTORY = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "academicYear",
    title: "Academic Year",
  },
  {
    field: "term",
    title: "Term/Semester",
  },
  {
    field: "level",
    title: "Level",
  },
  {
    field: "fees",
    title: "Fees",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  {
    field: "paid",
    title: "Amount Paid",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  {
    field: "payment",
    title: "Payment",
    hidden: true,
  },
];

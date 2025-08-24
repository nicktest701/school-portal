const LEVEL_OPTIONS = [
  "Day Care",
  "Creche",
  "Nursery 1",
  "Nursery 2",
  "Kindergarten 1",
  "Kindergarten 2",
  "Basic 1",
  "Basic 2",
  "Basic 3",
  "Basic 4",
  "Basic 5",
  "Basic 6",
  "Basic 7",
  "Basic 8",
  "Basic 9",
  "Basic 10",
  "Basic 11",
  "Basic 12",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Stage 1",
  "Stage 2",
  "Stage 3",
  "Stage 4",
  "Stage 5",
  "Stage 6",
  "Stage 7",
  "Stage 8",
  "Stage 9",
  "Stage 10",
  "Stage 11",
  "Stage 12",
  "J.H.S 1",
  "J.H.S 2",
  "J.H.S 3",
  "S.H.S 1",
  "S.H.S 2",
  "S.H.S 3",
];

const TERM_OPTIONS = [
  "Term 1",
  "Term 2",
  "Term 3",
  "Semester 1",
  "Semester 2",
  "Semester 3",
];

function getTotalPaidFees(records) {
  if (!Array.isArray(records)) return 0;

  return records.reduce((sum, record) => {
    if (Array.isArray(record.payment)) {
      return (
        sum + record.payment.reduce((pSum, pay) => pSum + (pay.paid || 0), 0)
      );
    }
    return sum;
  }, 0);
}

function getOverallFees(records) {
  if (!Array.isArray(records)) return 0;

  return records.reduce((sum, record) => {
    if (Array.isArray(record.amount)) {
      return (
        sum + record.amount.reduce((aSum, item) => aSum + (item.amount || 0), 0)
      );
    }
    return sum;
  }, 0);
}

function getFeePaymentTrend(data) {
  const levelMap = new Map(LEVEL_OPTIONS.map((lvl, i) => [lvl, i]));
  const termMap = new Map(TERM_OPTIONS.map((term, i) => [term, i]));

  // Sort by level, then term
  const sorted = [...data].sort((a, b) => {
    const levelDiff = levelMap.get(a.level) - levelMap.get(b.level);
    if (levelDiff !== 0) return levelDiff;
    return termMap.get(a.term) - termMap.get(b.term);
  });

  // Build labels and dataset
  const labels = sorted.map((item) => `${item.level} - ${item.term}`);
  const dataset = sorted.map((item) => item.paid);

  return { labels, dataset };
}

function getTopFeePayments(data, limit = 10) {
  // console.log(data);
  // Flatten all payments while attaching term + level
  const allPayments = data.flatMap((item) =>
    item.payment.map((pay) => ({
      ...pay,
      term: item.term,
      level: item.level,
    }))
  );

  if (allPayments.length === 0) {
    return [
      // {
      //   academicYear: data[0]?.academicYear,
      //   term: data[0]?.term,
      //   level: data[0].level,
      //   payment: [],
      //   fees: 0,
      //   paid: 0,
      // },
    ];
  }

  // Sort by createdAt (newest first)
  allPayments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Return first `limit` payments
  return allPayments.slice(0, limit);
}

module.exports = {
  getTotalPaidFees,
  getOverallFees,
  getFeePaymentTrend,
  getTopFeePayments,
};

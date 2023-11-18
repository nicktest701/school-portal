export const gradeColor = (totalScore) => {
  let bg = '';
  let color = '';

  if (totalScore >= 80) {
    bg = 'success.darker';
    color = 'white';
  } else if (totalScore >= 75) {
    bg = 'success.light';
    color = 'success.darker';
  } else if (totalScore >= 70) {
    bg = 'info.light';
    color = 'info.darker';
  } else if (totalScore >= 65) {
    bg = 'info.lighter';
    color = 'info.darker';
  } else if (totalScore >= 60) {
    bg = 'info.lighter';
    color = 'info.darker';
  } else if (totalScore >= 55) {
    bg = 'warning.light';
    color = 'warning.darker';
  } else if (totalScore >= 50) {
    bg = 'warning.lighter';
    color = 'warning.darker';
  } else if (totalScore >= 45) {
    bg = 'error.lighter';
    color = 'error.darker';
  } else if (totalScore >= 40) {
    bg = 'error.light';
    color = 'error.darker';
  } else {
    bg = 'error.main';
    color = 'white';
  }

  return {
    bg,
    color,
  };
};

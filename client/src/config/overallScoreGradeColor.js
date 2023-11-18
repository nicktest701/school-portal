export const overallScoreGradeColor = (totalScore) => {
  let bg = '';
  let color = '';

  if (totalScore >= 800) {
    bg = 'success.darker';
    color = 'white';
  } else if (totalScore >= 750) {
    bg = 'success.light';
    color = 'success.darker';
  } else if (totalScore >= 700) {
    bg = 'info.light';
    color = 'info.darker';
  } else if (totalScore >= 650) {
    bg = 'info.lighter';
    color = 'info.darker';
  } else if (totalScore >= 600) {
    bg = 'info.lighter';
    color = 'info.darker';
  } else if (totalScore >= 550) {
    bg = 'warning.light';
    color = 'warning.darker';
  } else if (totalScore >= 500) {
    bg = 'warning.lighter';
    color = 'warning.darker';
  } else if (totalScore >= 450) {
    bg = 'error.lighter';
    color = 'error.darker';
  } else if (totalScore >= 400) {
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

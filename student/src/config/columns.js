import { IMPORT_GRADE_COLUMNS, IMPORT_SUBJECT_COLUMNS } from "../mockup/columns/sessionColumns"
import { IMPORT_STUDENT_COLUMNS } from "../mockup/columns/studentColumns"
import { IMPORT_TEACHER_COLUMNS } from "../mockup/columns/teacherColumn"

export function switchColumns(dataType) {

    switch (dataType) {
        case 'students':
            return IMPORT_STUDENT_COLUMNS
        case 'teachers':
            return IMPORT_TEACHER_COLUMNS
        case 'subjects':
            return IMPORT_SUBJECT_COLUMNS
        case 'grades':
            return IMPORT_GRADE_COLUMNS
        default:
            return []
    }
}



export const SUBJECT_OPTIONS = [
    "ENGLISH LANGUAGE",
    "MATHEMATICS",
    "INTEGRATED SCIENCE",
    "NATURAL SCIENCE",
    "HISTORY",
    "SOCIAL STUDIES",
    "OUR WORLD OUR PEOPLE",
    "RELIGIOUS AND MORAL EDUCATION",
    "COMPUTING",
    "INFORMATION AND COMMUNICATION TECHNOLOGY",
    "CREATIVE ARTS AND DESIGN",
    "CAREER TECHNOLOGY",
    "GHANAIAN LANGUAGE",
    "FRENCH",
    "ARABIC",
    "PHYSICAL EDUCATION",
    "PHYSICAL AND HEALTH EDUCATION",
    "READING",
    "WRITING",
    "MUSIC & DANCE",
    "ORALS & RHYMES",
  ];
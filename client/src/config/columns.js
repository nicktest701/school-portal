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


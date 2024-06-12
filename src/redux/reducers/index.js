/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { combineReducers } from "redux";

import { displayToastReducer } from "./ToastReducer";
import { menuItemReducer } from "./MenuItemReducer";
import { setHolidaysReducer } from "./HolidayReducer";
import { setNoticeBoardsReducer } from "./NoticeBoardReducer";
import { setSchoolClassesReducer } from "./ClassReducer";
import { setSchoolSectionsReducer } from "./SectionReducer";
import { setSchoolSubjectsReducer } from "./SubjectReducer";
import { setAllSubjectsReducer } from "./SubjectReducer";
import { setAllStudentsReducer } from "./StudentReducer";
import { setSchoolStudentsReducer } from "./StudentReducer";
import { setAllTeachersReducer } from "./TeacherReducer";
import { setTeachersReducer } from "./TeacherReducer";
import { setTeacherHomeworksReducer } from "./HomeworkReducer";
import { setTimeTablesReducer } from "./TimeTableReducer";

const reducers = combineReducers({
    allHolidays: setHolidaysReducer,
    allNotices: setNoticeBoardsReducer,
    allStudents: setAllStudentsReducer,
    allSubjects: setAllSubjectsReducer,
    allTeachers: setAllTeachersReducer,
    allTimeTables: setTimeTablesReducer,
    menuItem: menuItemReducer,
    schoolClasses: setSchoolClassesReducer,
    schoolSections: setSchoolSectionsReducer,
    schoolSubjects: setSchoolSubjectsReducer,
    schoolStudents: setSchoolStudentsReducer,
    someTeachers: setTeachersReducer,
    teacherHomework: setTeacherHomeworksReducer,
    toastInfo: displayToastReducer
});

export default reducers;

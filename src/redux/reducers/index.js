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
import { setSchoolClassesReducer } from "./ClassReducer";
import { setSchoolSectionsReducer } from "./SectionReducer";
import { setSchoolSubjectsReducer } from "./SubjectReducer";
import { setAllStudentsReducer } from "./StudentReducer";
import { setStudentsReducer } from "./StudentReducer";
import { setAllTeachersReducer } from "./TeacherReducer";
import { setTeachersReducer } from "./TeacherReducer";
import { setTeacherHomeworksReducer } from "./HomeworkReducer";

const reducers = combineReducers({
    someStudents: setStudentsReducer,
    allStudents: setAllStudentsReducer,
    allTeachers: setAllTeachersReducer,
    someTeachers: setTeachersReducer,
    teacherHomework: setTeacherHomeworksReducer,
    menuItem: menuItemReducer,
    schoolClasses: setSchoolClassesReducer,
    schoolSections: setSchoolSectionsReducer,
    schoolSubjects: setSchoolSubjectsReducer,
    toastInfo: displayToastReducer
});

export default reducers;

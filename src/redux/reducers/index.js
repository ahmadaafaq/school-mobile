/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { combineReducers } from "redux";

import { menuItemReducer } from "./MenuItemReducer";
import { setStudentsReducer } from "./StudentReducer";
import { setTeachersReducer } from "./TeacherReducer";

const reducers = combineReducers({
    allStudents: setStudentsReducer,
    allTeachers: setTeachersReducer,
    menuItem: menuItemReducer
});

export default reducers;

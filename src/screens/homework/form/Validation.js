/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import * as yup from "yup";

const checkoutSchema = yup.object().shape({
    title: yup.string()
        .min(2, 'Title is Too Short!')
        .max(40, 'Title is Too Long!')
        .required("This Field is Required"),
    description: yup.string()
        .min(2, 'Description is Too Short!')
        .max(250, 'Description is Too Long!')
        .required("This Field is Required"),
    status: yup.string()
});

export default checkoutSchema;

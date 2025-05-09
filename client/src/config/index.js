
import {
  sessionInitialValues,
  levelInitialValues,
  studentInitialValues,
  teacherInitialValues,
  userInitialValues,
  parentInitialValues,
  quickMessageInitialValues,
  bulkMessageInitialValues,
} from "./initialValues";
import { readCSV } from "./readCSV";
import { EMPTY_IMAGES, IMAGES } from "./images";
import { TEACHERSREMARKS, INTEREST, CONDUCT } from "./remarks";
export default {
  ///Initial values
  sessionInitialValues,
  levelInitialValues,
  studentInitialValues,
  teacherInitialValues,
  userInitialValues,
  parentInitialValues,
  quickMessageInitialValues,
  bulkMessageInitialValues,

  //Images
  IMAGES,
  EMPTY_IMAGES,

  //remarks
  TEACHERSREMARKS,
  INTEREST,
  CONDUCT,

  //


  //read file
  readCSV,
};

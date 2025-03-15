import React, { use } from "react";
import { Dialog } from "@mui/material";
import { sessionInitialValues } from "@/config/initialValues";
import Transition from "@/components/animations/Transition";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import SessionForm from "./SessionForm";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";

const AddSession = () => {
  const { schoolSessionState, schoolSessionDispatch } =
    use(SchoolSessionContext);

  const currentYear = new Date().getFullYear();


  // const { handleSubmit, control } = useForm({
  //   resolver: yupResolver(sessionValidationSchema),
  //   defaultValues: {
  //     ...sessionInitialValues,
  //     academicYear: `${currentYear}/${currentYear}`,
  //     start: moment().format("YYYY"),
  //     end: moment().format("YYYY"),
  //     from: moment(),
  //     to: moment(),
  //     term: "",
  //   },
  // });

  //ADD New Session

  function handleCloseDialog() {
    schoolSessionDispatch({ type: "displayAddSession", payload: false });
  }
  return (
    <Dialog
      open={schoolSessionState.displayAddSession}
      fullWidth
      maxWidth="lg"
      TransitionComponent={Transition}
    >
      <CustomDialogTitle title="Add Session" onClose={handleCloseDialog} />

      <SessionForm />
    </Dialog>
  );
};

export default AddSession;

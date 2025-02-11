import React, { useState } from "react";
import { Alert } from "@mui/material";
import StudentInfo from "./tab/StudentInfo";
import AnimatedContainer from "@/components/animations/AnimatedContainer";
import AddStudentFileDialog from "@/components/modals/AddStudentFileDialog";

const StudentAdd = () => {
  const [msg, setMsg] = useState({
    severity: "",
    text: "",
  });

  return (
    <>
      {msg.text && (
        <Alert severity={msg.severity} onClose={() => setMsg({ text: "" })}>
          {msg.text}
        </Alert>
      )}
      <>
        <AnimatedContainer>
          <StudentInfo msg={msg} setMsg={setMsg} />
        </AnimatedContainer>
      </>
      <AddStudentFileDialog />
    </>
  );
};

StudentAdd.propTypes = {};

export default StudentAdd;

import React, { use } from "react";
import SessionForm from "./SessionForm";
import { Container } from "@mui/material";
import CustomTitle from "@/components/custom/CustomTitle";
import session_icon from "@/assets/images/header/session_ico.svg";

const AddSession = () => {
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

  return (
    <Container>
      <CustomTitle
        title="New Session"
        subtitle="Create, update, and oversee academic sessions to ensure smooth academic operations"
        img={session_icon}
        color="primary.main"
      />
      <SessionForm />
    </Container>
  );
};

export default AddSession;

import { Container, Tab } from "@mui/material";
import React from "react";
import session_icon from "../../assets/images/header/session_ico.svg";
import CustomTitle from "../../components/custom/CustomTitle";
import Grade from "./Grade";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Subject from "./Subject";
import { useSearchParams } from "react-router-dom";

function Subject_Grade() {
  const [searchParams, setSearchParams] = useSearchParams();
  

  const handleTabChange = (value) => {
    setSearchParams((params) => {
      params.set("_t", value);
      return params;
    });
  };
  return (
    <Container>
      <CustomTitle
        title="Subjects & Grading System"
        subtitle=" Manage subjects offered and their corresponding grading systems to maintain academic standards."
        img={session_icon}
        color="primary.main"
      />

      <TabContext value={searchParams.get("_t") || "1"}>
        <TabList onChange={(e, value) => handleTabChange(value)}>
          <Tab label="Subjects" value="1" />
          <Tab label="Grades" value="2" />
        </TabList>
        <TabPanel value="1" sx={{ px: 0 }}>
          <Subject />
        </TabPanel>
        <TabPanel value="2" sx={{ px: 0 }}>
          <Grade />
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default Subject_Grade;

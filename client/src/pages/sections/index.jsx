import React from "react";
import { Container, Tab } from "@mui/material";
import CustomTitle from "../../components/custom/CustomTitle";
// import section_icon from "../../assets/images/header/section_ico.svg";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useLocalStorage from "@/hooks/useLocalStorage";
import Departments from "../departments";
import Houses from "../houses";

const Section = () => {
  const [st, setSt] = useLocalStorage("section_tab", "1");

  return (
    <Container>
      <CustomTitle
        title="Departments & Houses/Sections"
        subtitle="Manage departments and houses/sections within the school."
        // img={section_icon}
        backColor="#012e54"
      />

      <TabContext value={st}>
        <TabList
          variant="scrollable"
          scrollButtons="auto"
          // centered
          onChange={(e, value) => setSt(value)}
          sx={{ width: { xs: 300, sm: "100%" } }}
        >
          <Tab value="1" label="Departments" />
          <Tab value="2" label="Houses/Sections" />

          {/* <Tab value="5" label="Report Customization" /> */}
        </TabList>
        <TabPanel value="1" sx={{ px: 0 }}>
          <Departments />
        </TabPanel>
        <TabPanel value="2" sx={{ px: 0 }}>
          <Houses />
        </TabPanel>
      </TabContext>
    </Container>
  );
};

Section.propTypes = {};

export default Section;

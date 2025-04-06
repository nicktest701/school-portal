import { Container, Tab, useMediaQuery, useTheme } from "@mui/material";
import CustomTitle from "../../components/custom/CustomTitle";
import settings_icon from "../../assets/images/header/settings_ico.svg";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Logo from "./Logo";
import Holidays from "./Holidays";
import Headmaster from "./Headmaster";
import ReportTemplates from "./ReportTemplates";
import useLocalStorage from "@/hooks/useLocalStorage";
import BasicInformation from "./BasicInformation";

const Settings = () => {
  const { breakpoints } = useTheme();
  // const matches = useMediaQuery(breakpoints.);
  const [st, setSt] = useLocalStorage("settings_tab", "1");

  return (
    <Container>
      <CustomTitle
        title="Settings"
        subtitle="Customize and configure system settings to tailor the platform to your school's specific needs."
        img={settings_icon}
        backColor="#012e54"
      />

      <TabContext value={st}>
        <TabList
          allowScrollButtonsMobile
          selectionFollowsFocus
          scrollButtons
          // centered={}
          onChange={(e, value) => setSt(value)}
          sx={{ width: { xs: 300, sm: "100%" } }}
        >
          <Tab value="1" label="Basic Information" />
          <Tab value="2" label="Logo" />
          <Tab value="3" label="Holidays" />
          <Tab value="4" label="Headmaster" />
          {/* <Tab value="5" label="Report Customization" /> */}
        </TabList>
        <TabPanel value="1" sx={{ px: 0 }}>
          <BasicInformation />
        </TabPanel>
        <TabPanel value="2" sx={{ px: 0 }}>
          <Logo />
        </TabPanel>
        <TabPanel value="3" sx={{ px: 0 }}>
          <Holidays />
        </TabPanel>
        <TabPanel value="4" sx={{ px: 0 }}>
          <Headmaster />
        </TabPanel>
        {/* <TabPanel value="5" sx={{ px: 0 }}>
          <ReportTemplates />
        </TabPanel> */}
      </TabContext>
    </Container>
  );
};

Settings.propTypes = {};

export default Settings;

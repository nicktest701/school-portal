import React, { useState } from "react";
import { MailRounded, Message } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Divider, Tab, Typography } from "@mui/material";
import SMSQuick from "./SMSQuick";
import SMSBulk from "./SMSBulk";
import Back from "@/components/Back";
import CustomTitle from "@/components/custom/CustomTitle";

const SMSNew = () => {
  const [tab, setTab] = useState("1");

  return (
    <>
      <Back color="#012e54" />

      <Typography variant="h5" color="secondary"></Typography>
      <Typography></Typography>
      <CustomTitle
        title="SMS & Mails"
        subtitle="Send single and bulk SMS amd emails to students,teachers, parents,etc"
        icon={<MailRounded color="inherit" sx={{ width: 50, height: 50 }} />}
        color="primary.main"
      />
      <Divider flexItem />

      <TabContext value={tab}>
        <TabList
          onChange={(e, value) => setTab(value)}
          centered
          // variant='scrollable'
          scrollButtons="auto"
        >
          <Tab
            label="Quick Message"
            value="1"
            icon={<Message />}
            iconPosition="start"
          />
          <Tab label="Bulk Messages" value="2" icon={null} />
        </TabList>
        <TabPanel value="1" sx={{ px: 0 }}>
          <SMSQuick />
        </TabPanel>
        <TabPanel value="2" sx={{ px: 0 }}>
          <SMSBulk />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default SMSNew;

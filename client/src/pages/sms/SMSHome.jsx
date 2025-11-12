import React, { useContext } from "react";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import { useNavigate } from "react-router-dom";
import { MESSAGE_COLUMNS } from "@/mockup/columns/sessionColumns";
import { useQuery } from "@tanstack/react-query";
import { getAllMessages } from "@/api/messageAPI";
import { EMPTY_IMAGES } from "@/config/images";
import CustomTitle from "@/components/custom/CustomTitle";
import sms_icon from "@/assets/images/header/sms_ico.svg";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import SMSView from "./SMSView";

const SMSHome = () => {
  const messages = useQuery({
    queryKey: ["messages"],
    queryFn: () => getAllMessages(),
    initialData: [],
  });
  const navigate = useNavigate();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const handleView = (data) => {
    schoolSessionDispatch({
      type: "viewMessage",
      payload: {
        data,
        open: true,
      },
    });
  };

  return (
    <>
      <CustomTitle
        title="SMS & Mails"
        subtitle="Send, receive, and manage messages to facilitate effective communication within the school community."
        img={sms_icon}
        color="text.main"
        backColor="#012e54"
      />

      <CustomizedMaterialTable
        title="Recent Messages"
        icon={sms_icon}
        isPending={messages.isPending || messages.isLoading}
        columns={MESSAGE_COLUMNS}
        data={messages.data ?? []}
        search={true}
        actions={[]}
        showAddButton={true}
        addButtonImg={EMPTY_IMAGES.sms}
        addButtonText="New Message"
        addButtonMessage="😑 Send your first SMS with just a button click !!!!"
        onAddButtonClicked={() => navigate("new")}
        onRowClick={handleView}
      />

      <SMSView />
    </>
  );
};

export default SMSHome;

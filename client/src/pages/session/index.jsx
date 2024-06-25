import React from "react";
import { useContext } from "react";

import { Container } from "@mui/material";
import session_icon from "../../assets/images/header/session_ico.svg";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SCHOOL_SESSION_COLUMN } from "../../mockup/columns/sessionColumns";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  deleteTerm,
  disableSessionAccount,
  getAllTerms,
} from "../../api/termAPI";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";

import EditSession from "./EditSession";
import { EMPTY_IMAGES } from "../../config/images";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import AddSession from "./AddSession";
import CustomTitle from "../../components/custom/CustomTitle";

const Session = () => {
  const { palette } = useTheme();

  //School Session
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  //Query CLient
  const queryClient = useQueryClient();

  const sessions = useQuery({
    queryKey: ["terms"],
    queryFn: () => getAllTerms(),
  });

  ///Delete session by id
  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: deleteTerm,
  });

  const handleDeleteSession = (id) => {
    Swal.fire({
      title: "Removing Session",
      text: "Removing session will delete all of its related content.Do you want to remove?",
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        deleteMutate(id, {
          onSettled: () => {
            queryClient.invalidateQueries(["terms"]);
          },
          onSuccess: (data) => {
            schoolSessionDispatch(alertSuccess(data));
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  //Edit session
  const handlEditSession = (data) => {
    schoolSessionDispatch({
      type: "editSession",
      payload: {
        open: true,
        data,
      },
    });
  };

  const handleOpenSession = () => {
    schoolSessionDispatch({ type: "displayAddSession", payload: true });
  };

  ///Disable or Enable User Account by id
  const { mutateAsync: enableMutate } = useMutation({
    mutationFn: disableSessionAccount,
  });
  const handleActivateSession = ({ _id, active }) => {
    Swal.fire({
      title: active
        ? "Do you want to disable this session"
        : "Do you want to enable this session",
      text: active ? "Disabling Session" : "Enabling Session",
      showCancelButton: true,
      backdrop: false,
    }).then((data) => {
      if (data.isConfirmed) {
        const info = {
          _id,
          active: active ? false : true,
        };

        enableMutate(info, {
          onSuccess: (data) => {
            queryClient.invalidateQueries(["terms"]);
            schoolSessionDispatch(alertSuccess(data));
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  return (
    <Container sx={{ bgcolor: "whitesmoke" }}>
      <CustomTitle
        title="School Session"
        subtitle="  Track,manage and control academic and class activities"
        img={session_icon}
        color="primary.main"
      />

      {/* <SessionHome /> */}

      <>
        <CustomizedMaterialTable
          title="Sessions"
          icon={session_icon}
          isLoading={sessions.isLoading}
          columns={SCHOOL_SESSION_COLUMN(
            handleActivateSession,
            handlEditSession,
            handleDeleteSession
          )}
          data={sessions.data ? sessions.data : []}
          actions={[]}
          showRowShadow={false}
          handleEdit={handlEditSession}
          handleDelete={handleDeleteSession}
          showAddButton={true}
          addButtonImg={EMPTY_IMAGES.session}
          addButtonMessage="😑 No School Session available!.Create a new one!"
          addButtonText="New Session"
          onAddButtonClicked={handleOpenSession}
          handleRefresh={sessions.refetch}
          options={{
            search: true,
          }}
        />
        <AddSession />
        <EditSession />
      </>
    </Container>
  );
};

export default Session;

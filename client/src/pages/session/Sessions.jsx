import React, { useState } from "react";
import { use } from "react";
import { Container } from "@mui/material";
import _ from "lodash";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import session_icon from "@/assets/images/header/session_ico.svg";
import { SCHOOL_SESSION_COLUMN } from "@/mockup/columns/sessionColumns";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import {
  deleteManyTerms,
  deleteTerm,
  disableSessionAccount,
  getAllTerms,
} from "@/api/termAPI";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import { EMPTY_IMAGES } from "@/config/images";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import CustomTitle from "@/components/custom/CustomTitle";
import GlobalSpinner from "@/components/spinners/GlobalSpinner";
import { useNavigate, useSearchParams } from "react-router-dom";

const Sessions = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const queryClient = useQueryClient();
  const [selectedSessions, setSelectedSessions] = useState([]);

  const sessions = useQuery({
    queryKey: ["terms"],
    queryFn: () => getAllTerms(),
    // initialData: [],
  });

  ///Delete session by id
  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: deleteTerm,
  });

  const handleDeleteSession = (id) => {
    Swal.fire({
      title: "Removing Session",
      // text: "Removing session will delete all of its related content.Do you want to remove?",
      html: ` <div style='text-align:left;display:flex;flex-direction:column;gap:8px;'>
    <p>  You are about to delete an entire academic term. This action is irreversible and will permanently remove all associated data,including:</p>
      <ul style='padding-block:8px;'>
 <li style='font-weight:bold;'>Class schedules</li>
<li style='font-weight:bold;'>Student enrollments</li>
<li style='font-weight:bold;'>Attendance records</li>
<li style='font-weight:bold;'>Grades and assignments</li>
</ul>

         <p>   Please proceed with caution. If you are certain you want to delete
            this academic year, click &apos;Confirm.&apos; Otherwise, click
            &apos;Cancel&apos; to keep the academic year intact.</p>
          <p style='color:var(--secondary);font-weight:bold;'>Are you sure you want to delete this academic term?</p>
        </div>`,
      showCancelButton: true,
      // background: ,
      backdrop: "rgba(0,0,0,0.2)",
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

  const handleSelectionChange = (rows) => {
    setSelectedSessions(rows);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteManyTerms,
  });

  const handleMultipleDeleteSession = () => {
    Swal.fire({
      title: "Removing Session",
      text: "You are about to remove the selected sessions. Removing session will delete all of its related content.Changes cannot be undone. Do you want to remove?",
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      const sessions = _.map(selectedSessions, "termId");
      if (isConfirmed) {
        mutateAsync(sessions, {
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
  const handleViewSession = (data) => {
    navigate(`/session/${data?.termId}`);
  };
  //Edit session
  const handlEditSession = (id) => {
    navigate(`/session/${id}/edit`);
    // setSearchParams((params) => {
    //   params.set("_id", data?.termId);
    //   params.set("edit_session", true);

    //   return params;
    // });
  };

  const handleOpenSession = () => {
    navigate("/session/new");
    // schoolSessionDispatch({ type: "displayAddSession", payload: true });
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
    <>
      <Container>
        <CustomTitle
          title="School Session"
          subtitle="Create, update, and oversee academic sessions to ensure smooth academic operations"
          img={session_icon}
          color="primary.main"
        />

        <>
          <CustomizedMaterialTable
            title="Sessions"
            icon={session_icon}
            isPending={sessions.isPending}
            columns={SCHOOL_SESSION_COLUMN(
              handleActivateSession,
              handleViewSession,
              handlEditSession,
              handleDeleteSession
            )}
            data={sessions.data ? sessions.data : []}
            actions={[]}
            showRowShadow={false}
            handleEdit={handlEditSession}
            handleDelete={handleDeleteSession}
            addButtonImg={EMPTY_IMAGES.session}
            addButtonMessage="😑 No School Session available!.Create a new one!"
            showAddButton={true}
            addButtonText="New Session"
            onAddButtonClicked={handleOpenSession}
            handleRefresh={sessions.refetch}
            onSelectionChange={handleSelectionChange}
            // onDeleteClicked={handleMultipleDeleteSession}
            options={{
              search: true,
            }}
          />
        </>
      </Container>

      {isPending && <GlobalSpinner />}
    </>
  );
};

export default Sessions;

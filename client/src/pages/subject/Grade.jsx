import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { EMPTY_IMAGES } from "../../config/images";

import AddGrade from "./AddGrade";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { deleteGrade, getGrades } from "../../api/gradeAPI";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { Button, Link, Stack } from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import ViewGrade from "./ViewGrade";
import EditGrade from "./EditGrade";
import AssignGrade from "./AssignGrade";

function Grade() {
  const [openAddGrade, setOpenAddGrade] = useState(false);
  const handleOpenAddGrade = () => setOpenAddGrade(true);

  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const grades = useQuery({
    queryKey: ["grades"],
    queryFn: () => getGrades(),
    initialData: [],
  });

  const updateGrade = (grade) => {
    schoolSessionDispatch({
      type: "editGrade",
      payload: { open: true, data: grade },
    });
  };

  const viewGrade = (grade) => {
    schoolSessionDispatch({
      type: "viewGrade",
      payload: { open: true, data: grade },
    });
  };

  const handleOpenAssignGrade = (data) => {
    schoolSessionDispatch({
      type: "assignGrade",
      payload: { open: true, data },
    });
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteGrade,
  });
  const removeGrade = (id) => {
    Swal.fire({
      title: "Removing Grade",
      text: "Do you want to remove?",
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(id, {
          onSettled: () => {
            queryClient.invalidateQueries(["grades"]);
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

  const columns = [
    {
      field: "_id",
      title: "ID",
      hidden: true,
    },
    {
      field: "name",
      title: "Name",
    },
    {
      field: null,
      title: "View Grade",
      render: (row) => (
        <Button
          sx={{
            bgcolor: "info.lighter",
            color: "info.darker",
          }}
          onClick={() => viewGrade(row?.ratings)}
        >
          View
        </Button>
      ),
    },
    {
      field: null,
      title: "Assign",
      render: (data) => (
        <Link
          sx={{ cursor: "pointer" }}
          onClick={() => handleOpenAssignGrade(data)}
        >
          Assign
        </Link>
      ),
    },

    {
      title: "Action",
      field: null,
      render: (rowData) => {
        return (
          <Stack direction="row" spacing={2}>
            <Edit
              className="ico"
              onClick={() => updateGrade(rowData)}
              title="Edit"
              titleAccess="Edit"
            />
            <DeleteOutline
              className="ico"
              onClick={() => removeGrade(rowData?._id)}
              title="Delete"
              titleAccess="Delete"
            />
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <CustomizedMaterialTable
        title="Grading System"
        icon={EMPTY_IMAGES.grade}
        isLoading={grades.isLoading}
        columns={columns}
        data={grades?.data}
        actions={[]}
        // showRowShadow={true}
        // handleEdit={handlEditSession}
        // handleDelete={handleDeleteSession}
        showAddButton={true}
        addButtonImg={EMPTY_IMAGES.session}
        addButtonMessage="😑 No Grading system available!.Create a new one!"
        addButtonText="New Grades"
        onAddButtonClicked={handleOpenAddGrade}
        handleRefresh={grades.refetch}
        options={{
          paginationPosition: "bottom",
        }}
      />

      <AddGrade open={openAddGrade} setOpen={setOpenAddGrade} />
      <ViewGrade />
      <EditGrade />
      <AssignGrade />
    </>
  );
}

export default Grade;

import React from "react";
import {
  useDepartments,
  useCreateDepartment,
  useUpdateDepartment,
  useDeleteDepartment,
} from "@/hooks/useDepartments";

import {
  Box,
  Typography,
  IconButton,
  Grid2 as Grid,
  Button,
  Container,
  Tooltip,
  Card,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import CustomTitle from "@/components/custom/CustomTitle";
import { Add, RefreshRounded } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import EmptyDataContainer from "@/components/EmptyDataContainer";
import DepartmentFormModal from "@/components/pages/departments/DepartmentForm";
import NoteSkeleton from "@/components/skeleton/NoteSkeleton";



export default function Departments() {
  const queryClient = useQueryClient();
  const { data: departments, isPending, error, refetch } = useDepartments();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();
  const deleteDepartment = useDeleteDepartment();

  const handleSubmit = (data) => {
    if (editingDepartment) {
      updateDepartment.mutate({ id: editingDepartment._id, ...data });
    } else {
      createDepartment.mutate(data);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newDepartments = [...departments];
    const [movedItem] = newDepartments.splice(result.source.index, 1);
    newDepartments.splice(result.destination.index, 0, movedItem);

    // setDepartments(newDepartments);
    queryClient.setQueryData(["departments"], newDepartments);
  };

  // console.log(departments)
  if (isPending) return <NoteSkeleton />;

  if (error) return <div>Error: {error.message}</div>;

  // return <DepartmentsSkeleton />;
  return (
    <Container>
      <CustomTitle
        title="Departments Board"
        subtitle="Manage user accounts, roles, and permissions to ensure secure and appropriate access to the system."
        //  img={departments_icon}
        color="text.main"
        right={
          <>
            <Button
              startIcon={<Add />}
              variant="contained"
              onClick={() => setModalOpen(true)}
              sx={{ m: 2 }}
            >
              New Department
            </Button>
            <IconButton onClick={refetch} size="large">
              <RefreshRounded sx={{ width: 32, height: 32 }} />
            </IconButton>
          </>
        }
      />

      {departments?.length === 0 ? (
        <EmptyDataContainer />
      ) : (
        <>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="departmentsGrid" direction="horizontal">
              {(provided) => (
                <Grid
                  container
                  spacing={2}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {departments.map((department, index) => (
                    <Draggable
                      key={index + department?._id}
                      draggableId={department._id}
                      index={index}
                    >
                      {(provided) => (
                        <Grid
                          size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 4,
                          }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={department._id}
                          sx={{
                            transition: "all 300ms ease-in-out",
                            "&:hover": { scale: 1.05 },
                          }}
                        >
                          <Card
                            sx={{
                              minHeight: 220,
                              background: `linear-gradient(135deg, ${department.color}20 0%, ${department.color}40 100%)`,
                              border: `2px solid ${department.color}30`,
                              position: "relative",
                              cursor: "grab",
                              transition: "all 0.3s ease-in-out",
                              overflow: "visible",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                                border: `2px solid ${department.color}60`,
                              },
                              "&:active": {
                                cursor: "grabbing",
                                transform: "translateY(-2px)",
                              },
                            }}
                            className="department-card"
                          >
                            {/* Color Accent Bar */}
                            <Box
                              sx={{
                                height: 4,
                                background: `linear-gradient(90deg, ${department.color}, ${department.color}80)`,
                                borderTopLeftRadius: 4,
                                borderTopRightRadius: 4,
                              }}
                            />

                            {/* Main Content */}
                            <Box sx={{ p: 2.5, position: "relative" }}>
                              {/* Action Buttons - Appear on hover */}
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 12,
                                  right: 12,
                                  display: "flex",
                                  gap: 0.5,
                                  opacity: 0,
                                  transition: "opacity 0.2s ease-in-out",
                                  ".department-card:hover &": {
                                    opacity: 1,
                                  },
                                }}
                              >
                                <Tooltip title="Edit department" arrow>
                                  <IconButton
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingDepartment(department);
                                    }}
                                    sx={{
                                      backgroundColor: "white",
                                      boxShadow: 1,
                                      "&:hover": {
                                        backgroundColor: "primary.light",
                                        color: "white",
                                      },
                                    }}
                                    size="small"
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete department" arrow>
                                  <IconButton
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteDepartment.mutate(department._id);
                                    }}
                                    sx={{
                                      backgroundColor: "white",
                                      boxShadow: 1,
                                      "&:hover": {
                                        backgroundColor: "error.light",
                                        color: "white",
                                      },
                                    }}
                                    size="small"
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>

                              {/* Department Initials with colored background */}
                              <Box
                                sx={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: department.color,
                                  // color: "white",
                                  width: 48,
                                  height: 48,
                                  borderRadius: 2,
                                  mb: 2,
                                  fontWeight: "bold",
                                  fontSize: "1.2rem",
                                  boxShadow: 2,
                                }}
                              >
                                {department.initials}
                              </Box>

                              {/* Department Name */}
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  mb: 1,
                                  color: "text.primary",
                                  lineHeight: 1.3,
                                }}
                              >
                                {department.name}
                              </Typography>

                              {/* HOD Information */}
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  mt: 2,
                                  p: 1.5,
                                  backgroundColor: "rgba(255,255,255,0.6)",
                                  borderRadius: 2,
                                  border: "1px solid rgba(0,0,0,0.05)",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    backgroundColor: department.hod
                                      ? department.color
                                      : "text.disabled",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 500,
                                    color: department.hod
                                      ? "text.primary"
                                      : "text.secondary",
                                    fontSize: "0.85rem",
                                  }}
                                >
                                  {department.hod?.fullname ||
                                    "No HOD assigned"}
                                </Typography>
                              </Box>

                              {/* Stats Preview (Optional - Add if you have this data) */}
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 2,
                                  mt: 2,
                                  pt: 2,
                                  borderTop: "1px solid rgba(0,0,0,0.08)",
                                }}
                              >
                                <Box sx={{ textAlign: "center" }}>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Teachers
                                  </Typography>
                                  <Typography variant="body2" fontWeight="bold">
                                    {department.teacherCount || "0"}
                                  </Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Courses
                                  </Typography>
                                  <Typography variant="body2" fontWeight="bold">
                                    {department.courseCount || "0"}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            {/* Hover Effect Overlay */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `linear-gradient(135deg, ${department.color}08 0%, ${department.color}15 100%)`,
                                opacity: 0,
                                transition: "opacity 0.3s ease-in-out",
                                pointerEvents: "none",
                                ".department-card:hover &": {
                                  opacity: 1,
                                },
                              }}
                            />
                          </Card>
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}

      <DepartmentFormModal
        open={modalOpen || !!editingDepartment}
        onClose={() => {
          setModalOpen(false);
          setEditingDepartment(null);
        }}
        defaultValues={editingDepartment}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

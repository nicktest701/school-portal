import React, { useState } from "react";
import {
  useHouses,
  useCreateHouse,
  useUpdateHouse,
  useDeleteHouse,
} from "@/hooks/useHouses";

import {
  Box,
  Typography,
  IconButton,
  Grid2 as Grid,
  Button,
  Container,
  Card,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CustomTitle from "@/components/custom/CustomTitle";
import { Add, RefreshRounded } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import EmptyDataContainer from "@/components/EmptyDataContainer";
// import HousesSkeleton from "@/components/skeleton/HouseSkeleton";
import HouseFormModal from "@/components/pages/houses/HouseForm";

export default function Houses() {
  const queryClient = useQueryClient();
  const { data: houses, isPending, error, refetch } = useHouses();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingHouse, setEditingHouse] = useState(null);
  const createHouse = useCreateHouse();
  const updateHouse = useUpdateHouse();
  const deleteHouse = useDeleteHouse();

  console.log(houses);

  const handleSubmit = (data) => {
    if (editingHouse) {
      updateHouse.mutate({ id: editingHouse._id, ...data });
    } else {
      createHouse.mutate(data);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newHouses = [...houses];
    const [movedItem] = newHouses.splice(result.source.index, 1);
    newHouses.splice(result.destination.index, 0, movedItem);

    // setHouses(newHouses);
    queryClient.setQueryData(["houses"], newHouses);
  };

  // console.log(houses)
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // return <HousesSkeleton />;
  return (
    <Container>
      <CustomTitle
        title="Houses / Sections Management"
        subtitle="Manage user accounts, roles, and permissions to ensure secure and appropriate access to the system."
        // img={users_icon}
        color="text.main"
        right={
          <>
            <Button
              startIcon={<Add />}
              variant="contained"
              onClick={() => setModalOpen(true)}
              sx={{ m: 2 }}
            >
              New House
            </Button>
            <IconButton onClick={refetch} size="large">
              <RefreshRounded sx={{ width: 32, height: 32 }} />
            </IconButton>
          </>
        }
      />

      {houses?.length === 0 ? (
        <EmptyDataContainer />
      ) : (
        <>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="housesGrid" direction="horizontal">
              {(provided) => (
                <Grid
                  container
                  spacing={2}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {houses.map((house, index) => (
                    <Draggable
                      key={index + house?._id}
                      draggableId={house._id}
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
                          key={house._id}
                          sx={{
                            transition: "all 300ms ease-in-out",
                            "&:hover": { scale: 1.05 },
                          }}
                        >
                          <Card
                            sx={{
                              minHeight: 220,
                              background: `linear-gradient(135deg, ${house.color}20 0%, ${house.color}40 100%)`,
                              border: `2px solid ${house.color}30`,
                              position: "relative",
                              cursor: "grab",
                              transition: "all 0.3s ease-in-out",
                              overflow: "visible",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                                border: `2px solid ${house.color}60`,
                              },
                              "&:active": {
                                cursor: "grabbing",
                                transform: "translateY(-2px)",
                              },
                            }}
                            className="house-card"
                          >
                            {/* Color Accent Bar */}
                            <Box
                              sx={{
                                height: 4,
                                background: `linear-gradient(90deg, ${house.color}, ${house.color}80)`,
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
                                  ".house-card:hover &": {
                                    opacity: 1,
                                  },
                                }}
                              >
                                <Tooltip title="Edit house" arrow>
                                  <IconButton
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingHouse(house);
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

                                <Tooltip title="Delete house" arrow>
                                  <IconButton
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteHouse.mutate(house._id);
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

                              {/* House Initials with colored background */}
                              <Box
                                sx={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: house.color,
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
                                {house.initials}
                              </Box>

                              {/* House Name */}
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  mb: 1,
                                  color: "text.primary",
                                  lineHeight: 1.3,
                                }}
                              >
                                {house.name}
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
                                    backgroundColor: house.master?.fullname
                                      ? house.color
                                      : "text.disabled",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 500,
                                    color: house.hod
                                      ? "text.primary"
                                      : "text.secondary",
                                    fontSize: "0.85rem",
                                  }}
                                >
                                  {house.master?.fullname || "No HOD assigned"}
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
                              ></Box>
                            </Box>

                            {/* Hover Effect Overlay */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `linear-gradient(135deg, ${house.color}08 0%, ${house.color}15 100%)`,
                                opacity: 0,
                                transition: "opacity 0.3s ease-in-out",
                                pointerEvents: "none",
                                ".house-card:hover &": {
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

      <HouseFormModal
        open={modalOpen || !!editingHouse}
        onClose={() => {
          setModalOpen(false);
          setEditingHouse(null);
        }}
        defaultValues={editingHouse}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

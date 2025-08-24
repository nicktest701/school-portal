import React from "react";
import {
  useNotes,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
} from "@/hooks/useNotes";
import NoteFormModal from "@/components/notes/NoteForm";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid2 as Grid,
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import CustomTitle from "@/components/custom/CustomTitle";
import { Add, RefreshRounded } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "@/hooks/useLocalStorage";
import EmptyDataContainer from "@/components/EmptyDataContainer";
import NotesSkeleton from "@/components/skeleton/NoteSkeleton";

export default function NotesBoard() {
  const [selectedColor, setSelectedColor] = useLocalStorage(
    "note-text",
    "#333"
  );

  const queryClient = useQueryClient();
  const { data: notes, isPending, error, refetch } = useNotes();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  const handleSubmit = (data) => {
    if (editingNote) {
      updateNote.mutate({ id: editingNote._id, ...data });
    } else {
      createNote.mutate(data);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newNotes = [...notes];
    const [movedItem] = newNotes.splice(result.source.index, 1);
    newNotes.splice(result.destination.index, 0, movedItem);

    // setNotes(newNotes);
    queryClient.setQueryData(["notes"], newNotes);
  };

  // console.log(notes)
  if (isPending) return <NotesSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  // return <NotesSkeleton />;
  return (
    <Container>
      <CustomTitle
        title="Notes Board"
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
              New Note
            </Button>
            <IconButton onClick={refetch} size="large">
              <RefreshRounded sx={{ width: 32, height: 32 }} />
            </IconButton>
          </>
        }
      />

      {notes?.length === 0 ? (
        <EmptyDataContainer />
      ) : (
        <>
          <Stack
            width="100%"
            alignItems="flex-end"
            justifyContent="flex-end"
            pb={2}
          >
            <ToggleButtonGroup
              value={selectedColor}
              exclusive
              onChange={(e, value) => setSelectedColor(value)}
              aria-label="color palette"
              sx={{
                mt: 6,
              }}
            >
              <ToggleButton
                value="#fff"
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                White
              </ToggleButton>
              <ToggleButton
                value="#333"
                sx={{
                  backgroundColor: "#ccc",
                  color: "#333",
                }}
              >
                Gray
              </ToggleButton>
              <ToggleButton
                value="#000"
                sx={{
                  bgcolor: "#000",
                  color: "#fff",
                }}
              >
                Black
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="notesGrid" direction="horizontal">
              {(provided) => (
                <Grid
                  container
                  spacing={2}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {notes.map((note, index) => (
                    <Draggable
                      key={index + note?._id}
                      draggableId={note._id}
                      index={index}
                    >
                      {(provided) => (
                        <Grid
                          size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 3,
                          }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={note._id}
                          sx={{
                            transition: "all 300ms ease-in-out",
                            "&:hover": { scale: 1.05 },
                          }}
                        >
                          <Paper
                            sx={{
                              p: 2,
                              backgroundColor: note.color,
                              minHeight: 200,
                              position: "relative",
                              boxShadow: 3,
                              cursor: "grab",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 0.5,
                              }}
                            >
                              <IconButton
                                onClick={() => setEditingNote(note)}
                                aria-label="Edit note"
                                sx={{ color: selectedColor }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                onClick={() => deleteNote.mutate(note._id)}
                                aria-label="Delete note"
                                sx={{ color: selectedColor }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            <Typography
                              variant="h6"
                              color={selectedColor}
                              gutterBottom
                            >
                              {note.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={selectedColor}
                              sx={{ width: "100%", whiteSpace: "pre-wrap" }}
                            >
                              {note.content}
                            </Typography>
                          </Paper>
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

      <NoteFormModal
        open={modalOpen || !!editingNote}
        onClose={() => {
          setModalOpen(false);
          setEditingNote(null);
        }}
        defaultValues={editingNote}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

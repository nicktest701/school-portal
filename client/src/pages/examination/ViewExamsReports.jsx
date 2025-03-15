/* eslint-disable react/display-name */
import React, {
  useCallback,
  use,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Typography,
  Button,
  Container,
  Stack,
  ButtonGroup,
  TextField,
  IconButton,
} from "@mui/material";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import { FixedSizeList, FixedSizeGrid as Grid } from "react-window";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateReports, publishReports } from "@/api/ExaminationAPI";
import { UserContext } from "@/context/providers/UserProvider";
import ViewScoreSheet from "./ViewScoreSheet";
import {
  ArrowBack,
  ArrowUpwardSharp,
  Note,
  RefreshRounded,
  Search,
} from "@mui/icons-material";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import CustomTitle from "@/components/custom/CustomTitle";
import ReportCard from "./ReportCard";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import { StudentContext } from "@/context/providers/StudentProvider";

const ViewExamsReports = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    userState: { session },
  } = use(UserContext);
  const [isPending, startTransition] = useTransition();
  const { studentDispatch } = use(StudentContext);
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openScoreSheet, setOpenScoreSheet] = useState(false);
  const { levelId } = useParams();
  const componentRef = useRef();

  const reports = useQuery({
    queryKey: ["exams-reports", levelId, session.sessionId, session.termId],
    queryFn: () =>
      generateReports({
        sessionId: session.sessionId,
        termId: session.termId,
        levelId,
      }),
    enabled: !!levelId && !!session.sessionId && !!session.termId,
    initialData: [],
  });

  useEffect(() => {
    studentDispatch({ type: "getReportDetails", payload: reports?.data });
    setFilteredData(reports?.data?.results);
  }, [reports.data]);

  const { mutateAsync, isPending: publishIsPending } = useMutation({
    mutationFn: publishReports,
  });
  const handlePublishReports = () => {
    Swal.fire({
      title: "Publishing Reports",
      text: `You are about to publish the report of ${
        reports?.data?.results?.length || "all "
      } students.Do you wish to continue?`,
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        schoolSessionDispatch({
          type: "openGeneralAlert",
          payload: {
            message: `Publishing reports.This might take a while please wait....${uploadProgress}%`,
            severity: "info",
          },
        });
        const reportInfo = {
          sessionId: session.sessionId,
          termId: session.termId,
          levelId,
          onProgress: setUploadProgress,
        };

        mutateAsync(reportInfo, {
          onSettled: () => {
            schoolSessionDispatch({
              type: "closeGeneralAlert",
            });
          },
          onSuccess: () => {
            setUploadProgress(0);
            schoolSessionDispatch({
              type: "openGeneralAlert",
              payload: {
                message: "Results have been published Successfully!!!",
                severity: "success",
              },
            });
          },
          onError: () => {
            schoolSessionDispatch({
              type: "openGeneralAlert",
              payload: {
                message:
                  "An error has occured.Couldnt Generate Reports.Try again later",
                severity: "error",
              },
            });
          },
        });
      }
    });
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: animated scroll
    });
  };

  const generatedReports = ({ data, index, style }) => {
    return <ReportCard key={index} student={data[index]} />;
  };

  const reportCard = useCallback(
    (report) => {
      return <ReportCard key={report?._id} student={report} />;
    },
    [reports?.data?.results]
  );

  const handlOpenScoreSheet = () => setOpenScoreSheet(true);

  const reactToPrintFn = useReactToPrint({
    documentTitle: "Student Report",
    contentRef: componentRef,
  });

  const handleSearch = useCallback((e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    startTransition(() => {
      const results = reports.data?.results?.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(value)
        )
      );

      setFilteredData(results);
    });
  }, []);

  // Example fixed-size array
  // const columnCount = 2; // Number of columns in the grid
  // const rowCount = Math.ceil(reports?.data?.results?.length / columnCount); // Total rows

  return (
    <>
      <Container maxWidth="lg">
        <Link to={-1} style={{ color: "var(--primary)" }}>
          <ArrowBack />
        </Link>
        <CustomTitle
          title="Student Reports"
          subtitle="Show details of student performance"
          color="primary.main"
          right={
            <IconButton size="large" onClick={reports.refetch}>
              <RefreshRounded sx={{ width: 36, height: 36 }} />
            </IconButton>
          }
        />
        <Stack py={2}>
          <ButtonGroup
            variant="contained"
            sx={{
              mb: 4,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "none",
            }}
          >
            <Button
              disabled={publishIsPending}
              color="info"
              onClick={handlOpenScoreSheet}
            >
              View Score Sheet
            </Button>

            <Button
              disabled={publishIsPending}
              onClick={() => reactToPrintFn()}
            >
              Print Reports
            </Button>

            <Button
              loading={publishIsPending}
              loadingPosition="start"
              startIcon={<Note />}
              onClick={handlePublishReports}
              color="success"
            >
              {publishIsPending ? "Please Wait" : "Publish Reports"}
            </Button>
          </ButtonGroup>

          <TextField
            placeholder="Search for Report"
            value={searchTerm}
            onChange={handleSearch}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {isPending && <div className="spinner-loader"></div>}
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>
      </Container>

      {reports.isError && (
        <Typography>Error loading report info.....</Typography>
      )}
      {filteredData && filteredData?.length === 0 && (
        <Typography>No Report Available.....</Typography>
      )}

      {/* <Grid
        columnCount={columnCount}
        rowCount={rowCount}
        columnWidth={816} // Report card width in pixels
        rowHeight={1096} // Report card height in pixels
        width={816 * columnCount} // Grid container width
        height={1096 * 2} // Visible viewport height (adjust as needed)
        itemCount={reports?.data?.results?.length}
        itemData={reports?.data?.results}
      >
        {({ data, columnIndex, rowIndex, style }) => {
          const index = rowIndex * columnCount + columnIndex;
          if (index >= data?.length) return null;

          const card = data[index];

          return <ReportCard key={index} student={card} />;
        }}
      </Grid> */}
      <FixedSizeList
        className="report-container"
        height={1096}
        width={"215mm"}
        itemSize={1200}
        itemCount={filteredData?.length}
        itemData={filteredData}
        style={{
          marginInline: "auto",
          backgroundColor: "#fff",
        }}
      >
        {generatedReports}
      </FixedSizeList>

      <div ref={componentRef} className="print-container">
        {filteredData?.map((report) => {
          return reportCard(report);
        })}
      </div>

      {reports?.data && (
        <ViewScoreSheet
          open={openScoreSheet}
          setOpen={setOpenScoreSheet}
          reportDetails={reports?.data}
        />
      )}
      {reports.isPending && (
        <LoadingSpinner value="Loading Reports.Please Wait..." />
      )}

      <IconButton onClick={handleScrollToTop} className="scroll-to-top-button">
        <ArrowUpwardSharp />
      </IconButton>
    </>
  );
};

export default React.memo(ViewExamsReports);

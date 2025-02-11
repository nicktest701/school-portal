/* eslint-disable react/display-name */
import React, {
  memo,
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
} from "@mui/material";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import { FixedSizeList } from "react-window";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateReports, publishReports } from "@/api/ExaminationAPI";
import { UserContext } from "@/context/providers/UserProvider";
import ViewScoreSheet from "./ViewScoreSheet";
import { ArrowBack, Note, Search } from "@mui/icons-material";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import CustomTitle from "@/components/custom/CustomTitle";
import ReportCard from "./ReportCard";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import { StudentContext } from "@/context/providers/StudentProvider";

const ViewExamsReports = () => {
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
            message:
              "Publishing reports.This might take a while please wait....",
            severity: "info",
          },
        });
        const reportInfo = {
          sessionId: session.sessionId,
          termId: session.termId,
          levelId,
        };

        mutateAsync(reportInfo, {
          onSuccess: () => {
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

  const generatedReports = memo(({ data, index, style }) => {
    return <ReportCard key={index} student={data[index]} />;
  });

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

  return (
    <>
      <Container>
        <Link to={-1} style={{ color: "var(--primary)" }}>
          <ArrowBack />
        </Link>
        <CustomTitle
          title="Student Reports"
          subtitle="Show details of student performance"
          color="primary.main"
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
            <Button color="info" onClick={handlOpenScoreSheet}>
              View Score Sheet
            </Button>

            <Button onClick={() => reactToPrintFn()}>Print Reports</Button>

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
      <ViewScoreSheet open={openScoreSheet} setOpen={setOpenScoreSheet} reportDetails={reports?.data} />
      {reports.isPending && (
        <LoadingSpinner value="Loading Reports.Please Wait..." />
      )}
    </>
  );
};
ViewExamsReports.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default React.memo(ViewExamsReports);

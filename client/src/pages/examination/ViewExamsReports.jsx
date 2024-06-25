/* eslint-disable react/display-name */
import React, { memo, useCallback, useContext, useRef, useState } from "react";
import {
  Typography,
  Button,
  Container,
  Stack,
  Box,
  ButtonGroup,
} from "@mui/material";
import Swal from "sweetalert2";
import LoadingButton from "@mui/lab/LoadingButton";
import ReactToPrint from "react-to-print";
import { FixedSizeList } from "react-window";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import Report from "./Report";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateReports, publishReports } from "../../api/ExaminationAPI";
import { UserContext } from "../../context/providers/UserProvider";
import ViewScoreSheet from "./ViewScoreSheet";
import { StudentContext } from "../../context/providers/StudentProvider";
import { ArrowBack, Note } from "@mui/icons-material";
import Loader from "../../config/Loader";

import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import CustomTitle from "../../components/custom/CustomTitle";

const ViewExamsReports = () => {
  const {
    userState: { session },
  } = useContext(UserContext);
  const { studentDispatch } = useContext(StudentContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

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
    onSuccess: (data) => {
      studentDispatch({ type: "getReportDetails", payload: data });
    },
  });

  const { mutateAsync, isLoading } = useMutation({
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

  const generatedReports = memo(({ data, index, isScrolling, style }) => {
    return <Report key={index} student={data[index]} style={style} />;
  });

  const reportCard = useCallback(
    (report) => {
      return <Report key={report?._id} student={report} />;
    },
    [reports?.data?.results]
  );

  const handlOpenScoreSheet = () => setOpenScoreSheet(true);

  return (
    <>
      <Container>
        <Link to={-1}>
          <ArrowBack />
        </Link>
        <CustomTitle
          title="Student Reports"
          subtitle="Show details of student performance"
          color="primary.main"
        />
        <Stack
          py={2}
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <ButtonGroup variant="contained"  sx={{ mb: 4 }}>             
            <Button onClick={handlOpenScoreSheet} color="warning">
              View Score Sheet
            </Button>
            <ReactToPrint
              // pageStyle={
              //   'width:8.5in";min-height:11in"; margin:auto",padding:4px;'
              // }
              trigger={() => <Button color="info">Print Reports</Button>}
              content={() => componentRef.current}
              documentTitle="Report"
            />
            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              startIcon={<Note />}
              onClick={handlePublishReports}
              color="success"
            >
              {isLoading ? "Please Wait" : "Publish Reports"}
            </LoadingButton>
          </ButtonGroup>
        </Stack>
      </Container>

      {reports.isLoading && <Loader />}
      {reports.isError && (
        <Typography>Error loading report info.....</Typography>
      )}
      {reports.data?.results && reports.data?.results?.length === 0 && (
        <Typography>No Report Available.....</Typography>
      )}

      <FixedSizeList
        className="report-container"
        height={1096}
        width={"215mm"}
        itemSize={1200}
        itemCount={reports.data?.results?.length}
        itemData={reports.data?.results}
        style={{
          marginInline: "auto",
        }}
      >
        {generatedReports}
      </FixedSizeList>

      <div ref={componentRef} className="print-container">
        {reports.data?.results?.map((report) => {
          return reportCard(report);
        })}
      </div>
      <ViewScoreSheet open={openScoreSheet} setOpen={setOpenScoreSheet} />
    </>
  );
};
ViewExamsReports.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default React.memo(ViewExamsReports);

/* eslint-disable react/display-name */
import React, { memo, useCallback, useContext, useRef, useState } from 'react';
import { Typography, Button, Container, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ReactToPrint from 'react-to-print';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import Report from './Report';
import { useQuery } from '@tanstack/react-query';
import { generateReports, publishReports } from '../../api/ExaminationAPI';
import { UserContext } from '../../context/providers/userProvider';
import ViewScoreSheet from './ViewScoreSheet';
import { StudentContext } from '../../context/providers/StudentProvider';
import { ArrowBack, Note } from '@mui/icons-material';
import Loader from '../../config/Loader';

const ViewExamsReports = () => {
  const {
    userState: { session },
  } = useContext(UserContext);
  const { studentDispatch } = useContext(StudentContext);

  const [openScoreSheet, setOpenScoreSheet] = useState(false);
  const { levelId } = useParams();
  const componentRef = useRef();

  //close dialog
  const handleClose = () => {};

  const reports = useQuery({
    queryKey: ['exams-reports', levelId, session.sessionId, session.termId],
    queryFn: () =>
      generateReports({
        sessionId: session.sessionId,
        termId: session.termId,
        levelId,
      }),
    enabled: !!levelId && !!session.sessionId && !!session.termId,
    onSuccess: (data) => {
      studentDispatch({ type: 'getReportDetails', payload: data });
    },
    onError: (error) => {
      // showBoundary(error);
    },
  });

  const publishedReports = useQuery({
    queryKey: ['publish-reports', levelId, session.sessionId, session.termId],
    queryFn: () =>
      publishReports({
        sessionId: session.sessionId,
        termId: session.termId,
        levelId,
      }),
    enabled: false,

    onSuccess: (data) => {
      console.log(data);
      alert(data);
      console.log(data);
    },
    onError: (error) => {
      // showBoundary(error);
    },
  });

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
    <div>
      <Container sx={{ pt: 12 }}>
        <Container
          sx={{
            position: 'fixed',
            top: 0,
            p: 1,
            bgcolor: '#fff',
            zIndex: 999,
          }}
        >
          <Stack px={2} direction='row' spacing={2} alignItems='center'>
            <Link to={-1}>
              <ArrowBack />
            </Link>

            <Typography variant='h5' sx={{ flexGrow: 1 }}>
              Report Cards
            </Typography>

            <Button onClick={handlOpenScoreSheet}>View Score Sheet</Button>
            <ReactToPrint
              // pageStyle={
              //   'width:8.5in";min-height:11in"; margin:auto",padding:4px;'
              // }
              trigger={() => <Button>Print Reports</Button>}
              content={() => componentRef.current}
              documentTitle='Report'
            />
            <LoadingButton
              loading={publishedReports.isFetching}
              loadingPosition='start'
              startIcon={<Note />}
              onClick={publishedReports.refetch}
            >
              {publishedReports.isFetching ? 'Please Wait' : 'Publish Reports'}
            </LoadingButton>
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
          height={1096}
          width={'215mm'}
          itemSize={1200}
          itemCount={reports.data?.results?.length}
          itemData={reports.data?.results}
          style={{
            marginInline: 'auto',
          }}
        >
          {generatedReports}
        </FixedSizeList>

        <div ref={componentRef} className='print-container'>
          {reports.data?.results?.map((report) => {
            return reportCard(report);
          })}
        </div>
      </Container>

      <ViewScoreSheet open={openScoreSheet} setOpen={setOpenScoreSheet} />
    </div>
  );
};
ViewExamsReports.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default React.memo(ViewExamsReports);

import { PrintRounded } from '@mui/icons-material';
import {
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';
import _ from 'lodash';
import ReactToPrint from 'react-to-print';
import moment from 'moment';
import FeePrintItem from './FeePrintItem';
import { useNavigate } from 'react-router-dom';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { currencyFormatter } from '../../config/currencyFormatter';

function FeePrint() {
  const navigate = useNavigate();
  const {
    schoolSessionState: { feePrintData },
  } = useContext(SchoolSessionContext);
  // const fee
  const school_info = JSON.parse(localStorage.getItem('@school_info'));
  const componentRef = useRef();

  useEffect(() => {
    if (_.isEmpty(feePrintData)) {
      navigate(-1);
    }
    console.log(feePrintData);
  }, [feePrintData]);

  return (
    <Container maxWidth='xs' sx={{ padding: 2 }}>
      <ReactToPrint
        trigger={() => (
          <Button size='small' variant='outlined' startIcon={<PrintRounded />}>
            Print Receipt
          </Button>
        )}
        content={() => componentRef.current}
        documentTitle='Fee Receipt'
        onAfterPrint={() => {
          navigate(-1);
        }}
      />
      <Container
        ref={componentRef}
        maxWidth='xs'
        sx={{
          padding: 2,
          height: '60vh',
          bgcolor: '#fff',
          marginY: 2,
          boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        <Stack columnGap={2} padding={1}>
          <Stack justifyContent='center' alignItems='center'>
            <Typography variant='h5'>
              {_.startCase(school_info?.name)}
            </Typography>
            <Typography variant='caption'>{school_info?.address}</Typography>
            <Typography variant='caption'>{school_info?.location}</Typography>
            <Typography variant='caption' fontStyle='italic'>
              {school_info?.motto}
            </Typography>
          </Stack>
        </Stack>
        <Typography
          textAlign='center'
          sx={{
            background: '#000',
            color: '#fff',
            marginY: 2,
          }}
        >
          Fee Receipt
        </Typography>
        <Stack direction='row' justifyContent='space-between' paddingY={2}>
          <Typography variant='caption'>
            Receipt No.: {feePrintData?._id}
          </Typography>
          <Typography variant='caption'>
            Date:{' '}
            {feePrintData?.payment
              ? moment(feePrintData?.payment?.date).format('L')
              : ''}
          </Typography>
        </Stack>

        <Divider>
          <Chip label='Details' size='small' /> 
          
        </Divider>
        <Stack rowGap={2} paddingY={2}>
          <FeePrintItem title='Received From' value={feePrintData?.fullName} />
          <FeePrintItem title='Level' value={feePrintData?.levelType} />
          <Stack direction='row' justifyContent='space-between'>
            <FeePrintItem
              title='The sum of'
              value={currencyFormatter(
                feePrintData?.payment ? feePrintData?.payment?.paid : 0
              )}
            />
            <FeePrintItem
              title='Outstanding'
              value={currencyFormatter(
                feePrintData?.payment ? feePrintData?.payment?.outstanding : 0
              )}
            />
          </Stack>
          <FeePrintItem title='Being payment of' value='School Fees' />
          <FeePrintItem
            title='Received by'
            value={
              feePrintData?.payment
                ? _.startCase(feePrintData?.payment?.issuer)
                : ''
            }
          />
        </Stack>
        <Divider />
        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <small>FrebbyTech Consults</small>
        </div> */}
      </Container>
    </Container>
  );
}

export default FeePrint;

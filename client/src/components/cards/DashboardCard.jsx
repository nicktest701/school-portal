import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';
import { memo } from 'react';

const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card
      sx={{
        // border: '1px solid lightgray',
        // borderTop: '2px solid #012e54',
        position: 'relative',
        borderRadius:2
      }}
      elevation={1}
    >
      <CardContent>
        <Typography variant='h5' textAlign='center' sx={{ paddingY: 1 }}>
          <CountUp duration={5} end={value} enableScrollSpy />
        </Typography>
        <div
          style={{
            position: 'absolute',
            right: 10,
            bottom: 5,
          }}
        >
          {icon}
        </div>
        <Typography color='primary'>{title}</Typography>
      </CardContent>
    </Card>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  icon: PropTypes.node,
};

export default memo(DashboardCard);

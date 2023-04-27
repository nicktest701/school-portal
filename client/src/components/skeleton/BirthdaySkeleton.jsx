import { Skeleton, Stack } from '@mui/material';

function BirthdaySkeleton() {
  return (
    <div>
      <Stack direction='row' columnGap={2} paddingBottom={2}>
        <Skeleton variant='circular' width={40} height={40} />
        <Stack >
          <Skeleton variant='text' width={120} />
          <Skeleton variant='text' width={120} />
        </Stack>
      </Stack>
      <Stack direction='row' columnGap={2} paddingBottom={2}>
        <Skeleton variant='circular' width={40} height={40} />
        <Stack >
          <Skeleton variant='text' width={120} />
          <Skeleton variant='text' width={120} />
        </Stack>
      </Stack>
      <Stack direction='row' columnGap={2} paddingBottom={2}>
        <Skeleton variant='circular' width={40} height={40} />
        <Stack >
          <Skeleton variant='text' width={120} />
          <Skeleton variant='text' width={120} />
        </Stack>
      </Stack>
    </div>
  );
}

export default BirthdaySkeleton;

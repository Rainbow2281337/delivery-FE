import { Box, Skeleton } from "@mui/material";

const SkeletonComponent = () => {
  return (
    <div className="flex items-center justify-center">
      <Box sx={{ width: 700 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    </div>
  );
};

export default SkeletonComponent;

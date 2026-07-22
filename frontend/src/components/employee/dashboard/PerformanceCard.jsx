import {
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

export default function PerformanceCard({

  completed = 0,

  target = 20,

}) {

  const progress =
    target > 0
      ? (completed / target) * 100
      : 0;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>

        <Stack spacing={2}>

          <Typography variant="h5">
            Today's Performance
          </Typography>

          <Typography variant="h2">
            {completed}
          </Typography>

          <Typography color="text.secondary">
            Calls Completed
          </Typography>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 10,
            }}
          />

          <Typography>
            Target : {target}
          </Typography>

          <Typography>
            Remaining : {target - completed}
          </Typography>

          <Typography
            color="success.main"
            fontWeight={700}
          >
            {progress.toFixed(0)}% Completed
          </Typography>

        </Stack>

      </CardContent>
    </Card>
  );
}
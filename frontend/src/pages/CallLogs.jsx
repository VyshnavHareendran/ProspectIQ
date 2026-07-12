import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import CallLogForm from "../components/callLogs/CallLogForm";
import CallLogTable from "../components/callLogs/CallLogTable";
import FollowupList from "../components/callLogs/FollowupList";

const CallLogs = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Box p={3}>

      <Typography
        variant="h4"
        mb={3}
      >
        Call Logs
      </Typography>

      <Grid container spacing={2} mb={3}>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">
              Total Calls
            </Typography>

            <Typography variant="h4">
              --
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">
              Today's Follow-ups
            </Typography>

            <Typography variant="h4">
              --
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">
              Pending Follow-ups
            </Typography>

            <Typography variant="h4">
              --
            </Typography>
          </Paper>
        </Grid>

      </Grid>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => setOpenForm(true)}
      >
        New Call Log
      </Button>

      <FollowupList />

      <CallLogTable />

      <CallLogForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={(data) => {
          console.log(data);
          setOpenForm(false);
        }}
      />

    </Box>
  );
};

export default CallLogs;
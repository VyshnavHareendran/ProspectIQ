
import {
  Alert,
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useCallback, useEffect, useMemo, useState } from "react";

import useAuth from "../../hooks/useAuth";
import { callLogApi } from "../../api/callLog/callLogApi";

import CallLogTable from "../../components/callLogs/CallLogTable";
import CallLogDetailsDialog from "../../components/callLogs/CallLogDetailsDialog";
import BusinessProfileDrawer from "../../components/business/BusinessProfileDrawer";




const SummaryCard = ({ title, value }) => (
  <Paper sx={{ p: 2.5 }}>
    <Typography variant="body2" color="text.secondary">
      {title}
    </Typography>

    <Typography variant="h4" fontWeight={700}>
      {value}
    </Typography>
  </Paper>
);

const MyCallLogs = () => {
  const { user } = useAuth();

  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("");

  const [selectedLog, setSelectedLog] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [openBusinessDrawer, setOpenBusinessDrawer] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await callLogApi.getEmployeeCallLogs(user.id);

      setCallLogs(Array.isArray(response.data) ? response.data : []);

      setError("");
    } catch (error) {
      setError(
        error.response?.data?.detail || "Failed to load call logs"
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleViewBusiness = (businessId) => {
      setSelectedBusiness(businessId);
      setOpenBusinessDrawer(true);
  };

  useEffect(() => {
    if (user?.id) {
      void Promise.resolve().then(loadData);
    }
  }, [loadData, user]);

  const filteredRows = useMemo(() => {
    return [...callLogs]
      .filter((log) => {
        const business =
          log.lead_assignment?.business?.business_name?.toLowerCase() || "";

        const outcome = log.call_outcome || "";

        const status =
          log.lead_assignment?.status || "";

        const searchTerm = search.toLowerCase();

        const matchesSearch =
          !search ||
          business.includes(searchTerm) ||
          outcome.toLowerCase().includes(searchTerm);

        const matchesStatus =
          !statusFilter || status === statusFilter;

        const matchesOutcome =
          !outcomeFilter ||
          outcome.toUpperCase() === outcomeFilter.toUpperCase();

        return (
          matchesSearch &&
          matchesStatus &&
          matchesOutcome
        );
      })
      .sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      );
  }, [
    callLogs,
    search,
    statusFilter,
    outcomeFilter,
  ]);

  return (
    <Box p={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            My Call Logs
          </Typography>

          <Typography color="text.secondary">
            View your complete call history.
          </Typography>
        </Box>

        <TextField
          placeholder="Search Business or Outcome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 350 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        mb={3}
      >
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Lead Status</InputLabel>

          <Select
            value={statusFilter}
            label="Lead Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="NEW">New</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="FOLLOW_UP">Follow Up</MenuItem>
            <MenuItem value="CLOSED">Closed</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Call Outcome</InputLabel>

          <Select
            value={outcomeFilter}
            label="Call Outcome"
            onChange={(e) => setOutcomeFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="INTERESTED">Interested</MenuItem>
            <MenuItem value="NOT_INTERESTED">
              Not Interested
            </MenuItem>
            <MenuItem value="CALL_BACK">
              Call Back
            </MenuItem>
            <MenuItem value="NO_ANSWER">
              No Answer
            </MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={() => {
            setSearch("");
            setStatusFilter("");
            setOutcomeFilter("");
          }}
        >
          Clear Filters
        </Button>
      </Stack>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}

      <Typography mb={2}>
        Showing {filteredRows.length} of {callLogs.length} calls
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            title="Total Calls"
            value={filteredRows.length}
          />
        </Grid>
      </Grid>

      <CallLogTable
          rows={filteredRows}
          loading={loading}
          onRowClick={(row) => {
              setSelectedLog(row);
              setDetailsOpen(true);
          }}
          onViewBusiness={handleViewBusiness}
          showEmployee={false}
      />

      <CallLogDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        callLog={selectedLog}
      />

      <BusinessProfileDrawer
          open={openBusinessDrawer}
          businessId={selectedBusiness}
          onClose={() => {
              setOpenBusinessDrawer(false);
              setSelectedBusiness(null);
          }}
      />


    </Box>
  );
};

export default MyCallLogs;

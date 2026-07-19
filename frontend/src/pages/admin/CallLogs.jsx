import {
  Alert,
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { callLogApi } from "../../api/callLog/callLogApi";
import CallLogTable from "../../components/callLogs/CallLogTable";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
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

const CallLogs = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [todayFollowups, setTodayFollowups] = useState([]);
  const [pendingFollowups, setPendingFollowups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [openBusinessDrawer, setOpenBusinessDrawer] = useState(false);


  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [logsRes, todayRes, pendingRes] = await Promise.all([
          callLogApi.getCallLogs(),
          callLogApi.getTodayFollowups(),
          callLogApi.getPendingFollowups(),
      ]);
      
      console.log("CALL LOGS:", logsRes.data);

      setCallLogs(Array.isArray(logsRes.data) ? logsRes.data : []);
      setTodayFollowups(Array.isArray(todayRes.data) ? todayRes.data : []);
      setPendingFollowups(Array.isArray(pendingRes.data) ? pendingRes.data : []);
      setError("");
    } catch (loadError) {
      setError(loadError.response?.data?.detail || "Failed to load call logs");
    } finally {
      setLoading(false);
    }
  }, []);


  const filteredRows = useMemo(() => {
    return [...callLogs].filter((log) => {
      const business =
        log.lead_assignment?.business?.business_name?.toLowerCase() || "";

      const outcome =
        log.call_outcome || "";

      const employee =
        log.employee?.full_name || "";

      const status =
        log.lead_assignment?.status || "";

      const searchTerm = search.toLowerCase();

      const matchesSearch =
          !search ||
          business.includes(searchTerm) ||
          employee.includes(searchTerm) ||
          outcome.includes(searchTerm);

      const matchesStatus =
        !statusFilter || status === statusFilter;

      const matchesOutcome =
        !outcomeFilter ||
        outcome.trim().toUpperCase() ===
          outcomeFilter.trim().toUpperCase();

      const matchesEmployee =
        !employeeFilter ||
        employee.toUpperCase() ===
          employeeFilter.toUpperCase();

      console.log({
        outcome,
        outcomeFilter,
        matchesOutcome,
        employee,
        employeeFilter,
        matchesEmployee,
      });

      return (
        matchesSearch &&
        matchesStatus &&
        matchesOutcome &&
        matchesEmployee
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
    employeeFilter,
  ]);

  const handleViewDetails = (callLog) => {
      setSelectedLog(callLog);
      setDetailsOpen(true);
  };

  const handleViewBusiness = (businessId) => {
      setSelectedBusiness(businessId);
      setOpenBusinessDrawer(true);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadData]);


  return (
    <Box p={3}>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between" spacing={2} mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Call Logs
          </Typography>
          <Typography color="text.secondary">
            Track outreach activity and follow-ups.
          </Typography>
        </Box>

        <TextField
            placeholder="Search Business, Employee, Outcome..."
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
            <MenuItem value="NOT_INTERESTED">Not Interested</MenuItem>
            <MenuItem value="CALL_BACK">Call Back</MenuItem>
            <MenuItem value="NO_ANSWER">No Answer</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>Employee</InputLabel>
          <Select
            value={employeeFilter}
            label="Employee"
            onChange={(e) => setEmployeeFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>

            {[...new Set(callLogs.map((log) => log.employee?.full_name))]
              .filter(Boolean)
              .map((employee) => (
                <MenuItem key={employee} value={employee}>
                  {employee}
                </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={() => {
            setSearch("");
            setStatusFilter("");
            setOutcomeFilter("");
            setEmployeeFilter("");
          }}
        >
          Clear Filters
        </Button>

      </Stack>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={2}
      >
        Showing {filteredRows.length} of {callLogs.length} calls
      </Typography>

      {error ? <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert> : null}

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
              title="Total Calls"
              value={filteredRows.length}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard title="Today's Follow-ups" value={todayFollowups.length} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard title="Pending Follow-ups" value={pendingFollowups.length} />
        </Grid>
      </Grid>

      {/* <FollowupList
          title="Today's Follow-ups"
          followups={todayFollowups}
      />

      <FollowupList
          title="Pending Follow-ups"
          followups={pendingFollowups}
      /> */}

      <CallLogTable
          rows={filteredRows}
          loading={loading}
          onRowClick={handleViewDetails}
          onViewBusiness={handleViewBusiness}
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

export default CallLogs;

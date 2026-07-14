import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { businessApi } from "../../api";
import { callLogApi } from "../../api/callLogApi";
import CallLogForm from "../../components/callLogs/CallLogForm";
import CallLogTable from "../../components/callLogs/CallLogTable";
import FollowupList from "../../components/callLogs/FollowupList";
import useAuth from "../../hooks/useAuth";

const emptyCallForm = {
  business_id: "",
  call_status: "",
  notes: "",
  next_followup_date: "",
};

const normalizeDate = (value) => value || undefined;

const buildCreatePayload = (formData, employeeId) => ({
  business_id: Number(formData.business_id),
  employee_id: Number(employeeId),
  call_status: formData.call_status,
  notes: formData.notes?.trim() || undefined,
  next_followup_date: normalizeDate(formData.next_followup_date),
});

const buildUpdatePayload = (formData) => ({
  call_status: formData.call_status,
  notes: formData.notes?.trim() || undefined,
  next_followup_date: normalizeDate(formData.next_followup_date),
});

const toFormData = (callLog) => ({
  business_id: callLog.business_id || "",
  call_status: callLog.call_status || "",
  notes: callLog.notes || "",
  next_followup_date: callLog.next_followup_date || "",
});

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
  const { user } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [formData, setFormData] = useState(emptyCallForm);
  const [callLogs, setCallLogs] = useState([]);
  const [todayFollowups, setTodayFollowups] = useState([]);
  const [pendingFollowups, setPendingFollowups] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const businessById = useMemo(
    () =>
      businesses.reduce((lookup, business) => {
        lookup[business.id] = business;
        return lookup;
      }, {}),
    [businesses],
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [logsRes, todayRes, pendingRes, businessRes] = await Promise.all([
        callLogApi.getCallLogs(),
        callLogApi.getTodayFollowups(),
        callLogApi.getPendingFollowups(),
        businessApi.getBusinesses({ page: 1, page_size: 100 }),
      ]);

      setCallLogs(Array.isArray(logsRes.data) ? logsRes.data : []);
      setTodayFollowups(Array.isArray(todayRes.data) ? todayRes.data : []);
      setPendingFollowups(Array.isArray(pendingRes.data) ? pendingRes.data : []);
      setBusinesses(Array.isArray(businessRes.data?.items) ? businessRes.data.items : []);
      setError("");
    } catch (loadError) {
      setError(loadError.response?.data?.detail || "Failed to load call logs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadData]);

  const handleOpenCreate = () => {
    setSelectedLog(null);
    setFormData(emptyCallForm);
    setOpenForm(true);
  };

  const handleOpenEdit = (callLog) => {
    setSelectedLog(callLog);
    setFormData(toFormData(callLog));
    setOpenForm(true);
  };

  const handleSave = async (currentFormData) => {
    if (!selectedLog && !user?.id) {
      setError("Logged-in user was not found. Please log in again.");
      return;
    }

    try {
      setSaving(true);

      if (selectedLog) {
        await callLogApi.updateCallLog(selectedLog.id, buildUpdatePayload(currentFormData));
        setSuccess("Call log updated successfully.");
      } else {
        await callLogApi.createCallLog(buildCreatePayload(currentFormData, user.id));
        setSuccess("Call log created successfully.");
      }

      setOpenForm(false);
      setSelectedLog(null);
      await loadData();
    } catch (saveError) {
      setError(saveError.response?.data?.detail || "Failed to save call log");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedLog) return;

    try {
      setSaving(true);
      await callLogApi.deleteCallLog(selectedLog.id);
      setOpenDelete(false);
      setSelectedLog(null);
      setSuccess("Call log deleted successfully.");
      await loadData();
    } catch (deleteError) {
      setError(deleteError.response?.data?.detail || "Failed to delete call log");
    } finally {
      setSaving(false);
    }
  };

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
        <Button variant="contained" startIcon={<AddIcCallRoundedIcon />} onClick={handleOpenCreate}>
          New Call Log
        </Button>
      </Stack>

      {error ? <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert> : null}
      {success ? <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>{success}</Alert> : null}

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard title="Total Calls" value={callLogs.length} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard title="Today's Follow-ups" value={todayFollowups.length} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard title="Pending Follow-ups" value={pendingFollowups.length} />
        </Grid>
      </Grid>

      <FollowupList title="Today's Follow-ups" followups={todayFollowups} businessById={businessById} />
      <FollowupList title="Pending Follow-ups" followups={pendingFollowups} businessById={businessById} />

      <CallLogTable
        rows={callLogs}
        businessById={businessById}
        loading={loading}
        onEdit={handleOpenEdit}
        onDelete={(callLog) => {
          setSelectedLog(callLog);
          setOpenDelete(true);
        }}
      />

      <CallLogForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        businesses={businesses}
        saving={saving}
        isEdit={Boolean(selectedLog)}
      />

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Call Log</DialogTitle>
        <DialogContent>
          <Typography>Delete this call log?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} disabled={saving}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={saving}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CallLogs;

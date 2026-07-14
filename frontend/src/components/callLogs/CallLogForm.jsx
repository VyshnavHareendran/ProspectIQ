import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

const statusOptions = [
  "INTERESTED",
  "FOLLOW_UP",
  "NOT_INTERESTED",
  "NO_ANSWER",
  "CALL_BACK",
  "CLOSED",
];

const CallLogForm = ({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  businesses = [],
  saving = false,
  isEdit = false,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!isEdit && !formData.business_id) {
      alert("Please select a business.");
      return;
    }

    if (!formData.call_status) {
      alert("Please select call status.");
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit Call Log" : "New Call Log"}</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {!isEdit ? (
            <Grid size={12}>
              <TextField
                fullWidth
                select
                label="Business"
                name="business_id"
                value={formData.business_id}
                onChange={handleChange}
                required
              >
                {businesses.map((business) => (
                  <MenuItem key={business.id} value={business.id}>
                    {business.business_name} - {business.city}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : null}

          <Grid size={12}>
            <TextField
              fullWidth
              select
              label="Call Status"
              name="call_status"
              value={formData.call_status}
              onChange={handleChange}
              required
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              type="date"
              label="Next Follow-up Date"
              name="next_followup_date"
              value={formData.next_followup_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={saving}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CallLogForm;

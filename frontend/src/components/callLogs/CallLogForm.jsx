import { useState, useEffect } from "react";
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

const initialForm = {
  business_id: "",
  employee_id: "",
  call_status: "",
  notes: "",
  next_followup_date: "",
};

const CallLogForm = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialForm);
    }
  }, [initialData]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.business_id ||
      !formData.employee_id ||
      !formData.call_status
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Call Log
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Business ID"
              name="business_id"
              value={formData.business_id}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Employee ID"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              required
            />
          </Grid>

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
                <MenuItem
                  key={status}
                  value={status}
                >
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
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CallLogForm;
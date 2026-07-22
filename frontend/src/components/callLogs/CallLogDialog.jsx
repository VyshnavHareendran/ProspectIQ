import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";

import { useState } from "react";

const statuses = [
  "Interested",
  "Not Interested",
  "No Answer",
  "Busy",
  "Callback Later",
];

export default function CallDialog({
  open,
  onClose,
  business,
}) {
  const [status, setStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Call Business
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} mt={1}>

          <Typography>
            <b>Business :</b> {business?.business_name}
          </Typography>

          <Typography>
            <b>Phone :</b> {business?.phone_number}
          </Typography>

          <Typography>
            <b>Lead Score :</b> {business?.lead_score}
          </Typography>

          <Typography>
            <b>Priority :</b> {business?.priority}
          </Typography>

          <TextField
            select
            label="Call Status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            {statuses.map((item) => (
              <MenuItem
                key={item}
                value={item}
              >
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Duration (minutes)"
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value)
            }
          />

          <TextField
            label="Notes"
            multiline
            rows={4}
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          href={`tel:${business?.phone_number}`}
        >
          Dial
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}

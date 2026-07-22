import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

const outcomes = [
  "INTERESTED",
  "NOT_INTERESTED",
  "FOLLOW_UP",
  "NO_RESPONSE",
];

export default function CompleteCallDialog({
  open,
  onClose,
  onSave,
  lead,
}) {
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSave = () => {
    onSave({
      status,
      remarks,
    });

    setStatus("");
    setRemarks("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Complete Call
      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <TextField
            label="Business"
            value={lead?.business_name || ""}
            disabled
            fullWidth
          />

          <FormControl fullWidth>

            <InputLabel>
              Call Outcome
            </InputLabel>

            <Select
              value={status}
              label="Call Outcome"
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >

              {outcomes.map((item) => (

                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>

              ))}

            </Select>

          </FormControl>

          <TextField
            multiline
            rows={4}
            label="Remarks"
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
          />

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
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
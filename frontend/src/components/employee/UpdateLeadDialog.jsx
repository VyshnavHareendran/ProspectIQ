import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import Link from "@mui/material/Link";


import { useEffect, useState } from "react";
import { employeeApi } from "../../api/employee/employeeApi";
import { callLogApi } from "../../api/callLog/callLogApi";

const UpdateLeadDialog = ({
  open,
  onClose,
  lead,
  onSuccess,
}) => {

    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");
    const [callOutcome, setCallOutcome] = useState("");
    const [notes, setNotes] = useState("");
    const [nextFollowupDate, setNextFollowupDate] = useState("");
    const [duration, setDuration] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
  if (lead) {
        console.log(lead);

        setStatus(lead.status);
        setRemarks(lead.remarks || "");
        setCallOutcome(lead.call_outcome || "");
        setNotes("");
        setNextFollowupDate("");
        setDuration("");
    }
    }, [lead]);

    if (!lead) return null;

    const handleSave = async () => {

        if (!callOutcome) {
            alert("Please select a Call Outcome.");
            return;
        }

        try {

            setSaving(true);

            await employeeApi.updateLead(
                lead.id,
                {
                    status,
                    remarks,
                    call_outcome: callOutcome,
                }
            );

            console.log("Creating Call Log...");

            await callLogApi.createCallLog({
                lead_assignment_id: lead.id,
                employee_id: lead.employee_id,
                call_outcome: callOutcome,
                duration,
                notes,
                next_followup_date: nextFollowupDate || null,
            });

            console.log("Call Log Created");

            await onSuccess();

            onClose();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Failed to update lead."
            );

        } finally {

            setSaving(false);

        }

    };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Make Call
      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} sx={{ mt: 1 }}>

          <TextField
            label="Business"
            value={lead.business.business_name}
            fullWidth
            disabled
          />

          <Stack spacing={1}>

            <Typography variant="subtitle2">
                Contact Information
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
                <CallRoundedIcon fontSize="small" />
                <Typography>
                {lead.business.phone_number || "No phone"}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <EmailRoundedIcon fontSize="small" />
                <Typography>
                {lead.business.email || "No email"}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <LanguageRoundedIcon fontSize="small" />
                <Link
                href={lead.business.website_url}
                target="_blank"
                rel="noopener"
                >
                Visit Website
                </Link>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <PlaceRoundedIcon fontSize="small" />
                <Link
                href={lead.business.google_maps_link}
                target="_blank"
                rel="noopener"
                >
                Open in Maps
                </Link>
            </Stack>

            </Stack>

          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) =>
                setStatus(e.target.value)
            }
            fullWidth
          >
            <MenuItem value="NEW">New</MenuItem>

            <MenuItem value="IN_PROGRESS">
            In Progress
            </MenuItem>

            <MenuItem value="FOLLOW_UP">
            Follow Up
            </MenuItem>

            <MenuItem value="CLOSED">
            Closed
            </MenuItem>
            
          </TextField>

          <TextField
            select
            label="Call Outcome"
            value={callOutcome}
            onChange={(e) =>
                setCallOutcome(e.target.value)
            }
            fullWidth
          >
            <MenuItem value="INTERESTED">
              Interested
            </MenuItem>

            <MenuItem value="NOT_INTERESTED">
              Not Interested
            </MenuItem>

            <MenuItem value="CALL_BACK">
              Call Back
            </MenuItem>

            <MenuItem value="NO_ANSWER">
              No Answer
            </MenuItem>
          </TextField>

          <TextField
            label="Remarks"
            multiline
            rows={4}
            value={remarks}
            onChange={(e) =>
                setRemarks(e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Call Notes"
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
          />

          <TextField
            type="date"
            label="Next Follow-up"
            value={nextFollowupDate}
            onChange={(e) => setNextFollowupDate(e.target.value)}
            slotProps={{
                inputLabel: {
                    shrink: true,
                },
            }}
            fullWidth
          />

           <TextField
            label="Call Duration"
            placeholder="5 min"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
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
            disabled={saving}
        >
            {saving ? "Saving..." : "Save Changes"}
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default UpdateLeadDialog;
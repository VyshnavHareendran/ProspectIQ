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
import { dailyQueueApi } from "../../api/employee";

const CallDialog = ({
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
        if (!lead) return undefined;

        const resetTimer = window.setTimeout(() => {
            setStatus(lead.status);
            setRemarks(lead.remarks || "");
            setCallOutcome(lead.call_outcome || "");
            setNotes("");
            setNextFollowupDate("");
            setDuration("");
        }, 0);

        return () => window.clearTimeout(resetTimer);
    }, [lead]);

    if (!lead) return null;

    const handleSave = async () => {

        if (!callOutcome) {
            alert("Please select a Call Outcome.");
            return;
        }

        if (
            (
                callOutcome === "CALL_BACK" ||
                callOutcome === "FOLLOW_UP"
            ) &&
            !nextFollowupDate
        ) {
            alert("Please select a Next Follow-up Date.");
            return;
        }

        try {

            setSaving(true);

            await employeeApi.updateLead(
                lead.assignment_id,
                {
                    remarks,
                    call_outcome: callOutcome,
                }
            );

            await callLogApi.createCallLog({
                lead_assignment_id: lead.assignment_id,
                employee_id: lead.employee_id,
                call_outcome: callOutcome,
                duration,
                notes,
                next_followup_date: nextFollowupDate || null,
            });

            if (lead.queue_id) {

              try {

                  await dailyQueueApi.completeQueueItem(
                      lead.queue_id
                  );

              } catch (err) {

                  console.error(
                      "Queue Complete Error:",
                      err
                  );

              }

          }

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
            value={lead.business_name}
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
                {lead.phone_number || "No phone"}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <EmailRoundedIcon fontSize="small" />
                <Typography>
                {lead.email || "No email"}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <LanguageRoundedIcon fontSize="small" />
                <Link
                href={lead.website_url}
                target="_blank"
                rel="noopener"
                >
                Visit Website
                </Link>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <PlaceRoundedIcon fontSize="small" />
                <Link
                href={lead.google_maps_link}
                target="_blank"
                rel="noopener"
                >
                Open in Maps
                </Link>
            </Stack>

            </Stack>

          <TextField
            select
            label="Call Outcome"
            value={callOutcome}
            onChange={(e) => {

              const outcome = e.target.value;

              setCallOutcome(outcome);

              switch (outcome) {

                  case "INTERESTED":
                      setStatus("IN_PROGRESS");
                      break;

                  case "CALL_BACK":
                  case "FOLLOW_UP":
                      setStatus("FOLLOW_UP");
                      break;

                  case "NO_ANSWER":
                      setStatus("IN_PROGRESS");
                      break;

                  case "NOT_INTERESTED":
                      setStatus("CLOSED");
                      break;

                  default:
                      break;
              }
            }}
            fullWidth
          >
            <MenuItem value="INTERESTED">
              Interested
            </MenuItem>

            <MenuItem value="NOT_INTERESTED">
              Not Interested
            </MenuItem>

            <MenuItem value="FOLLOW_UP">
                Follow Up
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

export default CallDialog;

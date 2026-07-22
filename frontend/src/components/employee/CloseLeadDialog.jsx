import { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";

import { employeeApi } from "../../api/employee/employeeApi";
import { callLogApi } from "../../api/callLog/callLogApi";

const CloseLeadDialog = ({
    open,
    onClose,
    lead,
    onSuccess,
}) => {

    const [remarks, setRemarks] = useState("");
    const [callOutcome, setCallOutcome] = useState("");
    const [notes, setNotes] = useState("");
    const [duration, setDuration] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!lead) return undefined;

        const resetTimer = window.setTimeout(() => {
            setRemarks(lead.remarks || "");
            setCallOutcome("");
            setNotes("");
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

        try {

            setSaving(true);

            await employeeApi.updateLead(
                lead.assignment_id,
                {
                    status: "CLOSED",
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
                next_followup_date: null,

            });

            await onSuccess();

            onClose();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Failed to close lead."
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

                Close Lead

            </DialogTitle>

            <DialogContent>

                <Stack spacing={3} mt={2}>

                    <TextField
                        label="Business"
                        value={lead.business_name}
                        disabled
                        fullWidth
                    />

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
                        rows={3}
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
                        onChange={(e) =>
                            setNotes(e.target.value)
                        }
                        fullWidth
                    />

                    <TextField
                        label="Call Duration"
                        value={duration}
                        onChange={(e) =>
                            setDuration(e.target.value)
                        }
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
                    color="success"
                    onClick={handleSave}
                    disabled={saving}
                >

                    {saving ? "Closing..." : "Close Lead"}

                </Button>

            </DialogActions>

        </Dialog>

    );

};

export default CloseLeadDialog;

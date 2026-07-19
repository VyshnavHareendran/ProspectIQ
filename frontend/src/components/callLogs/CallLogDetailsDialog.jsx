import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
    Divider,
} from "@mui/material";

const Field = ({ label, value }) => (
    <Stack spacing={0.5}>
        <Typography
            variant="caption"
            color="text.secondary"
        >
            {label}
        </Typography>

        <Typography>
            {value || "-"}
        </Typography>
    </Stack>
);

export default function CallLogDetailsDialog({
    open,
    onClose,
    callLog,
}) {

    if (!callLog) return null;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>
                Call Details
            </DialogTitle>

            <DialogContent>

                <Stack spacing={2} mt={1}>

                    <Field
                        label="Business"
                        value={
                            callLog.lead_assignment?.business?.business_name
                        }
                    />

                    <Divider />

                    <Field
                        label="Employee"
                        value={
                            callLog.employee?.full_name
                        }
                    />

                    <Field
                        label="Lead Status"
                        value={
                            callLog.lead_assignment?.status
                        }
                    />

                    <Field
                        label="Call Outcome"
                        value={callLog.call_outcome}
                    />

                    <Field
                        label="Duration"
                        value={callLog.duration}
                    />

                    <Field
                        label="Notes"
                        value={callLog.notes}
                    />

                    <Field
                        label="Next Follow-up"
                        value={callLog.next_followup_date}
                    />

                    <Field
                        label="Created"
                        value={
                            new Date(
                                callLog.created_at
                            ).toLocaleString()
                        }
                    />

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Close
                </Button>

            </DialogActions>

        </Dialog>

    );

}
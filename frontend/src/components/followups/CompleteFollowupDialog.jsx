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

import { callLogApi } from "../../api/callLog/callLogApi";

const outcomes = [
    "Interested",
    "Callback",
    "Not Interested",
    "No Answer",
    "Busy",
    "Wrong Number",
];

const CompleteFollowupDialog = ({
    open,
    followup,
    onClose,
    onSaved,
}) => {

    const [formData, setFormData] = useState({
        call_outcome: "",
        duration: "",
        notes: "",
        next_followup_date: "",
    });

    useEffect(() => {
        if (!followup) return undefined;

        const resetTimer = window.setTimeout(() => {
            setFormData({
                call_outcome: followup.call_outcome || "",
                duration: followup.duration || "",
                notes: followup.notes || "",
                next_followup_date:
                    followup.next_followup_date || "",
            });
        }, 0);

        return () => window.clearTimeout(resetTimer);
    }, [followup]);

    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    };

    const handleSave = async () => {

        try {

            await callLogApi.updateCallLog(
                followup.id,
                formData
            );

            onSaved?.();

            onClose();

        }

        catch (error) {

            console.error(error);

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

                Complete Follow-up

            </DialogTitle>

            <DialogContent>

                <Stack spacing={3} mt={1}>

                    <TextField
                        select
                        label="Outcome"
                        name="call_outcome"
                        value={formData.call_outcome}
                        onChange={handleChange}
                        fullWidth
                    >

                        {outcomes.map((item) => (

                            <MenuItem
                                key={item}
                                value={item}
                            >
                                {item}
                            </MenuItem>

                        ))}

                    </TextField>

                    <TextField
                        label="Duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        multiline
                        rows={4}
                        label="Notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        type="date"
                        label="Next Follow-up"
                        name="next_followup_date"
                        value={formData.next_followup_date || ""}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
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
                    onClick={handleSave}
                >
                    Save
                </Button>

            </DialogActions>

        </Dialog>

    );

};

export default CompleteFollowupDialog;

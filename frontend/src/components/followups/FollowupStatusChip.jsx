import Chip from "@mui/material/Chip";
import { differenceInCalendarDays, parseISO } from "date-fns";

const FollowupStatusChip = ({ date }) => {
    if (!date) {
        return (
            <Chip
                label="No Follow-up"
                size="small"
                color="default"
                variant="outlined"
            />
        );
    }

    const followupDate = parseISO(date);
    const today = new Date();

    const diff = differenceInCalendarDays(
        followupDate,
        today
    );

    if (diff < 0) {
        return (
            <Chip
                label={`Overdue (${Math.abs(diff)} day${Math.abs(diff) > 1 ? "s" : ""})`}
                color="error"
                size="small"
            />
        );
    }

    if (diff === 0) {
        return (
            <Chip
                label="Today"
                color="warning"
                size="small"
            />
        );
    }

    if (diff === 1) {
        return (
            <Chip
                label="Tomorrow"
                color="info"
                size="small"
            />
        );
    }

    return (
        <Chip
            label={`In ${diff} days`}
            color="success"
            size="small"
        />
    );
};

export default FollowupStatusChip;
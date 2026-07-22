import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";

import { dailyQueueApi } from "../../api/employee";
import CallDialog from "../../components/employee/CallDialog";

export default function TodaysCalls() {

    const [queue, setQueue] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedLead, setSelectedLead] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    const loadQueue = async () => {
    try {
        const response = await dailyQueueApi.getTodaysQueue();
        setQueue(response.data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {

        void Promise.resolve().then(loadQueue);

    }, []);

    

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="60vh"
            >

                <CircularProgress />

            </Box>

        );

    }

    return (

        <Box p={3}>

            <Typography
                variant="h4"
                gutterBottom
            >

                Today's Calls

            </Typography>

            <Paper>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>#</TableCell>

                            <TableCell>Business</TableCell>

                            <TableCell>Phone</TableCell>

                            <TableCell>Score</TableCell>

                            <TableCell>Priority</TableCell>

                            <TableCell>Reason</TableCell>
                            
                            <TableCell align="center">
                                Actions
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {queue.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={7}
                                    align="center"
                                >

                                    No calls assigned for today.

                                </TableCell>

                            </TableRow>

                                ) : (

                                    queue.map((lead) => (

                                        <TableRow key={lead.queue_id}>

                                            <TableCell>
                                                {lead.queue_order}
                                            </TableCell>

                                            <TableCell>
                                                {lead.business_name}
                                            </TableCell>

                                            <TableCell>
                                                {lead.phone_number}
                                            </TableCell>

                                            <TableCell>
                                                {lead.lead_score}
                                            </TableCell>

                                            <TableCell>

                                                <Chip
                                                    label={lead.priority}
                                                    color={
                                                        lead.priority === "HIGH"
                                                            ? "error"
                                                            : lead.priority === "MEDIUM"
                                                            ? "warning"
                                                            : "success"
                                                    }
                                                />

                                            </TableCell>

                                            <TableCell>
                                                {lead.queue_reason}
                                            </TableCell>

                                            <TableCell align="center">

                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() => {
                                                        setSelectedLead(lead);
                                                        setDialogOpen(true);
                                                    }}
                                                >
                                                    Call
                                                </Button>

                                            </TableCell>

                                        </TableRow>

                                    ))

                                )}

                            </TableBody>

                </Table>

            </Paper>

            <CallDialog
                open={dialogOpen}
                lead={selectedLead}
                onClose={() => {
                    setDialogOpen(false);
                    setSelectedLead(null);
                }}
                onSuccess={loadQueue}
            />


        </Box>

    );

}

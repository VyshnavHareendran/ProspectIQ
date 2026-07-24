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
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material";

import { dailyQueueApi } from "../../api/employee";
import CallDialog from "../../components/employee/CallDialog";

export default function TodaysCalls() {

    const [queue, setQueue] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedLead, setSelectedLead] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    
    const [page, setPage] = useState(1);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    const pageSize = 10;

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

    const totalPages = Math.ceil(
        queue.length / pageSize
    );

    const paginatedQueue = queue.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    

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

                        {paginatedQueue.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={7}
                                    align="center"
                                >

                                    No calls assigned for today.

                                </TableCell>

                            </TableRow>

                                ) : (

                                    paginatedQueue.map((lead) => (

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

            <Box
                mt={3}
                display="flex"
                justifyContent="center"
            >
                <Pagination
                    page={page}
                    count={totalPages}
                    color="primary"
                    onChange={(event, value) => {
                        setPage(value);
                    }}
                />
            </Box>

            <CallDialog
                open={dialogOpen}
                lead={selectedLead}
                onClose={() => {
                    setDialogOpen(false);
                    setSelectedLead(null);
                }}
                onSuccess={() => {
                    loadQueue();
                    setSnackbarOpen(true);
                }}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert
                    severity="success"
                    onClose={() => setSnackbarOpen(false)}
                    sx={{ width: "100%" }}
                >
                    Call completed successfully
                </Alert>
            </Snackbar>


        </Box>

    );

}

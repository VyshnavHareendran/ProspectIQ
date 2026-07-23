import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Checkbox,
  ListItemText,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import { useEffect, useState } from "react";
import { leadAssignmentApi } from "../../api/admin";

export default function BulkAssignDialog({
  open,
  onClose,
  employees,
  selectedEmployees,
  setSelectedEmployees,
  leadCount,
  setLeadCount,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {

    if (!open) return;

    const loadStats = async () => {

      try {

        const response =
          await leadAssignmentApi.getBulkAssignmentStats();

        setStats(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    loadStats();

  }, [open]);


  const handleAssign = async () => {
    if (selectedEmployees.length === 0) {
      alert("Please select at least one employee.");
      return;
    }

    if (leadCount <= 0) {
      alert("Lead count must be greater than zero.");
      return;
    }

    try {
      setLoading(true);

      await leadAssignmentApi.bulkAssign({
        employee_ids: selectedEmployees,
        count: Number(leadCount),
      });

      await onSuccess();

      onClose();

      setSelectedEmployees([]);
      setLeadCount(100);

      setSnackbarOpen(true);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Bulk assignment failed."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
   <>
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Bulk Lead Assignment
      </DialogTitle>

      <DialogContent>

        {stats && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              mt: 1,
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "grey.50",
            }}
          >
            <Typography align="center">
              <strong>Total</strong>
              <br />
              {stats.total_businesses}
            </Typography>

            <Typography align="center">
              <strong>Assigned</strong>
              <br />
              {stats.assigned_businesses}
            </Typography>

            <Typography align="center" color="primary">
              <strong>Available</strong>
              <br />
              {stats.available_businesses}
            </Typography>
          </Box>
        )}

        <FormControl
          fullWidth
          sx={{ mt: 2 }}
        >
          <InputLabel>
            Employees
          </InputLabel>

          <Select
            multiple
            value={selectedEmployees}
            onChange={(e) =>
              setSelectedEmployees(
                e.target.value
              )
            }
            input={
              <OutlinedInput label="Employees" />
            }
            renderValue={(selected) =>
              employees
                .filter((employee) =>
                  selected.includes(employee.id)
                )
                .map((employee) => employee.full_name)
                .join(", ")
            }
          >
            {employees.map((employee) => (
              <MenuItem
                key={employee.id}
                value={employee.id}
              >
                <Checkbox
                  checked={selectedEmployees.includes(
                    employee.id
                  )}
                />

                <ListItemText
                  primary={employee.full_name}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
            fullWidth
            sx={{ mt: 3 }}
            type="number"
            label="Number of Leads"
            value={leadCount}
            onChange={(e) =>
                setLeadCount(e.target.value)
            }
            inputProps={{
                min: 1,
                max: stats?.available_businesses || undefined,
            }}
            helperText={
                stats
                    ? `Maximum available: ${stats.available_businesses}`
                    : ""
            }
        />

        {selectedEmployees.length > 0 && (
          <Typography
            sx={{ mt: 2 }}
            color="secondary"
          >
            Each Employee Will Receive Approximately{" "}
            <strong>
              {Math.ceil(
                Number(leadCount) /
                selectedEmployees.length
              )}
            </strong>{" "}
            Leads
          </Typography>
        )}

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
            variant="contained"
            onClick={handleAssign}
            disabled={
                loading ||
                selectedEmployees.length === 0 ||
                Number(leadCount) <= 0 ||
                (stats &&
                    Number(leadCount) >
                        stats.available_businesses)
            }
        >
          {loading
            ? "Assigning..."
            : "Assign"}
        </Button>

      </DialogActions>
    </Dialog>
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
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
        >
            Bulk assignment completed successfully.
        </Alert>
    </Snackbar>
   </>
  );
}
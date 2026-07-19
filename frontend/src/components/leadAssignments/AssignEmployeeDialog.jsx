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
  Typography,
} from "@mui/material";

export default function AssignEmployeeDialog({
  open,
  onClose,
  lead,
  employees,
  selectedEmployee,
  setSelectedEmployee,
  remarks,
  setRemarks,
  onAssign,
}) {
  if (!lead) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Assign Lead
      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <Typography>
            <strong>Business:</strong>{" "}
            {lead.business.business_name}
          </Typography>

          <Typography>
            <strong>Lead Score:</strong>{" "}
            {lead.lead_score}
          </Typography>

          <Typography>
            <strong>Priority:</strong>{" "}
            {lead.priority}
          </Typography>

          <FormControl fullWidth>

            <InputLabel>
              Employee
            </InputLabel>

            <Select
              value={selectedEmployee}
              label="Employee"
              onChange={(e) =>
                setSelectedEmployee(e.target.value)
              }
            >
              {employees.map((employee) => (
                <MenuItem
                  key={employee.id}
                  value={employee.id}
                >
                  {employee.full_name}
                </MenuItem>
              ))}
            </Select>

          </FormControl>

          <TextField
            label="Remarks"
            multiline
            rows={3}
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
          onClick={onAssign}
        >
          Assign
        </Button>

      </DialogActions>

    </Dialog>
  );
}
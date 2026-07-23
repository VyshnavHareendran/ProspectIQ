import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import { leadScoreApi } from "../../api/admin";
import { leadAssignmentApi } from "../../api/admin";
import { authApi } from "../../api/auth";

import LeadAssignmentTable from "../../components/leadAssignments/LeadAssignmentTable";
import AssignEmployeeDialog from "../../components/leadAssignments/AssignEmployeeDialog";

import BusinessProfileDrawer from "../../components/business/BusinessProfileDrawer";
import BulkAssignDialog from "../../components/leadAssignments/BulkAssignDialog";
import { Pagination } from "@mui/material";

export default function LeadAssignments() {
  const [leadScores, setLeadScores] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [remarks, setRemarks] = useState("");

  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [leadCount, setLeadCount] = useState(100);

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [openBusinessDrawer, setOpenBusinessDrawer] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 20;
  const totalPages = Math.ceil(
      leadScores.length / pageSize
  );

  const paginatedLeadScores = leadScores.slice(
      (page - 1) * pageSize,
      page * pageSize
  );


  const loadData = async () => {
    try {
      const [
        leadScoreResponse,
        employeeResponse,
        assignmentResponse,
      ] = await Promise.all([
        leadScoreApi.getLeadScores({
            page: 1,
            page_size: 1000,
        }),
        authApi.getEmployees(),
        leadAssignmentApi.getAssignments(),
      ]);

      setLeadScores(leadScoreResponse.data.items);

      console.log("Lead Scores:", leadScoreResponse.data.items.length);

      setEmployees(employeeResponse.data);

      setAssignments(assignmentResponse.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (lead, assignment = null) => {
    setSelectedLead(lead);
    setSelectedAssignment(assignment);
    if (assignment) {
        setSelectedEmployee(assignment.employee_id);
        setRemarks(assignment.remarks || "");
    } else {
        setSelectedEmployee("");
        setRemarks("");
    }

    setDialogOpen(true);
    };

    const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedLead(null);
    setSelectedEmployee("");
    setSelectedAssignment(null);
    setRemarks("");
    };

  const handleViewBusiness = (businessId) => {
      setSelectedBusiness(businessId);
      setOpenBusinessDrawer(true);
  };

  const handleAssign = async () => {

  
    if (!selectedEmployee) return;

    try {

        if (selectedAssignment) {

            await leadAssignmentApi.updateAssignment(
                selectedAssignment.id,
                {
                    employee_id: selectedEmployee,
                    remarks,
                }
            );

        } else {

            await leadAssignmentApi.assignLead({
                business_id: selectedLead.business.id,
                employee_id: selectedEmployee,
                remarks,
            });

        }

        handleCloseDialog();

        await loadData();

        setSnackbarMessage(
            selectedAssignment
                ? "Lead reassigned successfully."
                : "Lead assigned successfully."
        );

        setSnackbarOpen(true);

    } catch (error) {

        console.error(error);

    }

    };


  useEffect(() => {

      loadData();

  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={5}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>

      <Box
          sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mb: 3,
          }}
      >
          <Typography
              variant="h4"
              fontWeight={600}
          >
              Lead Assignments
          </Typography>

          <Button
              variant="contained"
              onClick={() => setBulkDialogOpen(true)}
          >
              Bulk Assign
          </Button>
      </Box>

      <LeadAssignmentTable
          leadScores={paginatedLeadScores}
          employees={employees}
          assignments={assignments}
          onAssign={handleOpenDialog}
          onViewBusiness={handleViewBusiness}
      />

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
      
      <AssignEmployeeDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            lead={selectedLead}
            employees={employees}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            remarks={remarks}
            setRemarks={setRemarks}
            onAssign={handleAssign}
        />

        <BulkAssignDialog
            open={bulkDialogOpen}
            onClose={() => setBulkDialogOpen(false)}
            employees={employees}
            selectedEmployees={selectedEmployees}
            setSelectedEmployees={setSelectedEmployees}
            leadCount={leadCount}
            setLeadCount={setLeadCount}
            onSuccess={loadData}
        />

        <BusinessProfileDrawer
            open={openBusinessDrawer}
            businessId={selectedBusiness}
            onClose={() => {
                setOpenBusinessDrawer(false);
                setSelectedBusiness(null);
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
              onClose={() => setSnackbarOpen(false)}
              severity="success"
              variant="filled"
          >
              {snackbarMessage}
          </Alert>
      </Snackbar>

    </Box>
  );
}




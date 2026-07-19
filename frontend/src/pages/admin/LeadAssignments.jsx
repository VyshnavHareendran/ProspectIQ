import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";

import { leadScoreApi } from "../../api/admin";
import { leadAssignmentApi } from "../../api/admin";
import { authApi } from "../../api/auth";

import LeadAssignmentTable from "../../components/leadAssignments/LeadAssignmentTable";
import AssignEmployeeDialog from "../../components/leadAssignments/AssignEmployeeDialog";

import BusinessProfileDrawer from "../../components/business/BusinessProfileDrawer";
import BulkAssignDialog from "../../components/leadAssignments/BulkAssignDialog";

export default function LeadAssignments() {
  const [leadScores, setLeadScores] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedLead, setSelectedLead] = useState(null);

  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [remarks, setRemarks] = useState("");

  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [leadCount, setLeadCount] = useState(100);

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [openBusinessDrawer, setOpenBusinessDrawer] = useState(false);

  const loadData = async () => {
    try {
      const [
        leadScoreResponse,
        employeeResponse,
        assignmentResponse,
      ] = await Promise.all([
        leadScoreApi.getLeadScores(),
        authApi.getEmployees(),
        leadAssignmentApi.getAssignments(),
      ]);

      setLeadScores(leadScoreResponse.data.items);

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
    setRemarks("");
    };

  const handleViewBusiness = (businessId) => {
      setSelectedBusiness(businessId);
      setOpenBusinessDrawer(true);
  };

  const handleAssign = async () => {

    console.log("Assign button clicked");

    console.log(selectedEmployee);
    if (!selectedEmployee) return;

    console.log({
        business_id: selectedLead.business.id,
        employee_id: selectedEmployee,
        remarks,
    });

    try {

        await leadAssignmentApi.assignLead({

        business_id: selectedLead.business.id,

        employee_id: selectedEmployee,

        remarks,

        });

        handleCloseDialog();

        await loadData();

    } catch (error) {

        console.error(error);

    }

    };


  useEffect(() => {
    const fetchData = async () => {
        await loadData();
    };

    fetchData();
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
          leadScores={leadScores}
          employees={employees}
          assignments={assignments}
          onAssign={handleOpenDialog}
          onViewBusiness={handleViewBusiness}
      />
      
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

    </Box>
  );
}




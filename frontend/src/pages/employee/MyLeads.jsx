import {
  Box,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { employeeApi } from "../../api/employee/employeeApi";

import MyLeadsTable from "../../components/employee/MyLeadsTable";
import BusinessProfileDrawer from "../../components/business/BusinessProfileDrawer";

const MyLeads = () => {

    const [leads, setLeads] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [openBusinessDrawer, setOpenBusinessDrawer] = useState(false);

    const loadLeads = async () => {

        try {

            const response =
                await employeeApi.getMyLeads();


            setLeads(response.data);

        } catch (error) {

            console.error(error);

        }
    };

        const handleViewBusiness = (businessId) => {
        setSelectedBusiness(businessId);
        setOpenBusinessDrawer(true);
    };

    
    useEffect(() => {
        const fetchLeads = async () => {
            await loadLeads();
        };

        fetchLeads();
    }, []);

    return (
    <>
        <Box mb={4}>
        <Typography variant="h3" fontWeight={700}>
            My Leads
        </Typography>

        <Typography
            variant="body1"
            color="text.secondary"
            mt={1}
        >
            Manage and update your assigned business leads.
        </Typography>
        </Box>

        <MyLeadsTable
            leads={leads}
            onViewBusiness={handleViewBusiness}
        />

        <BusinessProfileDrawer
            open={openBusinessDrawer}
            businessId={selectedBusiness}
            onClose={() => {
                setOpenBusinessDrawer(false);
                setSelectedBusiness(null);
            }}
        />
    </>
    );

};

export default MyLeads;
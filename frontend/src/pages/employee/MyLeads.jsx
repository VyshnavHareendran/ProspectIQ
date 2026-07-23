import {
  Box,
  Typography,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";


import { useEffect, useState, useCallback } from "react";
import { employeeApi } from "../../api/employee/employeeApi";

import MyLeadsTable from "../../components/employee/MyLeadsTable";
import BusinessProfileDrawer from "../../components/business/BusinessProfileDrawer";

import SearchIcon from "@mui/icons-material/Search";

const MyLeads = () => {

    const [leads, setLeads] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [openBusinessDrawer, setOpenBusinessDrawer] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const pageSize = 10;

    const loadLeads = useCallback(async () => {

        try {

            const response =
                await employeeApi.getMyLeads(search);

            setLeads(response.data);

        } catch (error) {

            console.error(error);

        }

    }, [search]);

        const handleViewBusiness = (businessId) => {
        setSelectedBusiness(businessId);
        setOpenBusinessDrawer(true);
    };

    
    useEffect(() => {
        loadLeads();
    }, [loadLeads]);

    const totalPages = Math.ceil(
        leads.length / pageSize
    );

    const paginatedLeads = leads.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

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

        <Box mb={3}>
            <TextField
                fullWidth
                size="small"
                placeholder="Search business..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>

        <MyLeadsTable
            leads={paginatedLeads}
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
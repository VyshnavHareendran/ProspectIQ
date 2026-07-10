import { useState } from "react";
import { Box, Typography } from "@mui/material";

import FileDropZone from "../components/upload/FileDropZone";
import CSVPreviewTable from "../components/upload/CSVPreviewTable";
import ColumnMappingTable from "../components/upload/ColumnMappingTable";
import { Button } from "@mui/material";
import ImportSummary from "../components/upload/ImportSummary";
import UploadHistoryTable from "../components/upload/UploadHistoryTable";
import ImportResultDialog from "../components/upload/ImportResultDialog";
import { uploadApi } from "../api/uploadApi";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
const [mapping, setMapping] = useState({});
const [openDialog, setOpenDialog] = useState(false);
const [previewColumns, setPreviewColumns] = useState([]);
const [previewRows, setPreviewRows] = useState([]);
const [uploadId, setUploadId] = useState(null);

const handlePreview = async (selectedFile) => {
  if (!selectedFile) return;

  try {
    const response = await uploadApi.previewCSV(selectedFile);

    console.log("FULL RESPONSE:", response.data);
    console.log("COLUMNS:", response.data.columns);
    console.log("ROWS:", response.data.sample_rows);
    console.log("FIRST ROW:", response.data.sample_rows[0]);

    setUploadId(response.data.upload_id);
    setPreviewColumns(response.data.columns);
    setPreviewRows(response.data.sample_rows);
    setMapping(response.data.suggested_mapping);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Upload CSV
      </Typography>
<FileDropZone
  file={file}
  setFile={setFile}
  onUpload={handlePreview}
/>

      <CSVPreviewTable
        rows={previewRows}
        columns={previewColumns}
      />

      <ColumnMappingTable />
      <Button
  variant="contained"
  size="large"
  sx={{ mt: 3 }}
  onClick={() => setOpenDialog(true)}
>
  Import Businesses
</Button>
  <ImportSummary />
  <UploadHistoryTable />
  <ImportResultDialog
  open={openDialog}
  handleClose={() => setOpenDialog(false)}
/>
    </Box>
  );
};

export default UploadCSV;
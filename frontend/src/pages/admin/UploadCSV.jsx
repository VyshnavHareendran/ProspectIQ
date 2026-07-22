import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

import FileDropZone from "../../components/upload/FileDropZone";
import CSVPreviewTable from "../../components/upload/CSVPreviewTable";
import ColumnMappingTable from "../../components/upload/ColumnMappingTable";
import ImportSummary from "../../components/upload/ImportSummary";
import UploadHistoryTable from "../../components/upload/UploadHistoryTable";
import ImportResultDialog from "../../components/upload/ImportResultDialog";
import { uploadApi } from "../../api/admin/uploadApi";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [mapping, setMapping] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [previewColumns, setPreviewColumns] = useState([]);
  const [previewRows, setPreviewRows] = useState([]);
  const [uploadId, setUploadId] = useState(null);
  const [importResult, setImportResult] = useState(null);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  const handlePreview = async (selectedFile) => {
    if (!selectedFile) return;

    try {
      const response = await uploadApi.previewCSV(selectedFile);

      setUploadId(response.data.upload_id);
      setPreviewColumns(response.data.columns);
      setPreviewRows(response.data.sample_rows);
      setMapping(invertMapping(response.data.suggested_mapping));

    } catch (error) {
      console.error("Preview Error:", error);
    }
  };

  const handleImport = async () => {

    if (uploadId === null) {
      alert("Please upload and preview a CSV first.");
      return;
    }

    try {
      const response = await uploadApi.importBusinesses(
        uploadId,
        mapping
      );

      setImportResult(response.data);
      setHistoryRefreshKey((value) => value + 1);
      setOpenDialog(true);
    } catch (error) {
      console.error("Import Error:", error);
      console.error("Response:", error.response);
      console.error("Response Data:", error.response?.data);

      alert("Import failed");
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

      <ColumnMappingTable
        columns={previewColumns}
        mapping={mapping}
        setMapping={setMapping}
      />

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
        onClick={handleImport}
      >
        Import Businesses
      </Button>

      <ImportSummary data={importResult} />

      <UploadHistoryTable refreshKey={historyRefreshKey} />

      <ImportResultDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        result={importResult}
      />
    </Box>
  );
};

const invertMapping = (csvToFieldMapping = {}) =>
  Object.entries(csvToFieldMapping).reduce((fieldToCsvMapping, [csvColumn, field]) => {
    fieldToCsvMapping[field] = csvColumn;
    return fieldToCsvMapping;
  }, {});

export default UploadCSV;

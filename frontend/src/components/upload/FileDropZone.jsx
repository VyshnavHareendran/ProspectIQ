import { useRef } from "react";
import {
  Button,
  Typography,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileDropZone = ({ file, setFile, onUpload }) => {
  const inputRef = useRef();

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".csv")) {
      alert("Please select a CSV file.");
      return;
    }

    setFile(selectedFile);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".csv"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      <Paper
        elevation={0}
        sx={{
          border: "2px dashed #1976d2",
          borderRadius: 3,
          p: 6,
          textAlign: "center",
          bgcolor: "#fafafa",
        }}
      >
        <CloudUploadIcon
          sx={{
            fontSize: 60,
            color: "primary.main",
            mb: 2,
          }}
        />

        <Typography variant="h6" fontWeight={600}>
          Drag CSV Here
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          or Browse Files
        </Typography>

        <Button
          variant="contained"
          onClick={() => inputRef.current.click()}
        >
          Browse
        </Button>

        {file && (
          <>
            <Typography
              sx={{
                mt: 3,
                fontWeight: 600,
              }}
            >
              Selected: {file.name}
            </Typography>

            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={() => onUpload(file)}
            >
              Upload
            </Button>
          </>
        )}
      </Paper>
    </>
  );
};

export default FileDropZone;
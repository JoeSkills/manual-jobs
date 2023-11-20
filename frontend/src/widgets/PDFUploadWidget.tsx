import { Box, Button } from '@mui/material';
import { useState, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Document, Page } from 'react-pdf';

const PDFUploadWidget = ({
  setValue,
}: {
  setValue: UseFormSetValue<{
    gender?: string | undefined;
    phoneNumber?: number | undefined;
    passportImgFile?: File | undefined;
    userDocsPDFFile?: File | undefined;
  }>;
}) => {
  const [PDFFiles, setPDFFiles] = useState<FileList | null>(null);
  const PDFInputRef = useRef<HTMLInputElement>(null);

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber] = useState<number>(1);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPDFFiles(event.dataTransfer.files);
    setValue('userDocsPDFFile', event.dataTransfer.files[0]);
  };

  if (PDFFiles) {
    return (
      <Box mt={2}>
        <Document
          file={URL.createObjectURL(PDFFiles[0])}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <br />
        <Button
          color="error"
          variant="contained"
          onClick={() => setPDFFiles(null)}
        >
          Change PDF
        </Button>
        <br />
      </Box>
    );
  }

  return (
    <>
      {!PDFFiles && (
        <Box
          height={'200px'}
          border={'1px dashed #2C3E50'}
          marginTop={1}
          textAlign={'center'}
          position={'relative'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          fontSize={'0.875rem'}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p>Click here or drop the file here</p>
          <input
            type="file"
            name="userDocsPDFFile"
            className="passport-input"
            accept="application/pdf"
            ref={PDFInputRef}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPDFFiles(event.target.files);
              event.target.files &&
                setValue('userDocsPDFFile', event.target.files[0]);
            }}
            hidden
          />

          <Button
            variant="contained"
            onClick={() => PDFInputRef.current?.click()}
            sx={{ mt: 2 }}
          >
            Select Files
          </Button>
        </Box>
      )}
    </>
  );
};

export default PDFUploadWidget;

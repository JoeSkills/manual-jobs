import { Box, Button } from '@mui/material';
import { useState, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';

const PassportUploadWidget = ({
  setValue,
}: {
  setValue: UseFormSetValue<{
    gender?: string | undefined;
    phoneNumber?: number | undefined;
    passportImgFile?: File | undefined;
  }>;
}) => {
  const [passportFiles, setPassportFiles] = useState<FileList | null>(null);
  const passportInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPassportFiles(event.dataTransfer.files);
    setValue('passportImgFile', event.dataTransfer.files[0]);
  };

  if (passportFiles) {
    return (
      <Box mt={2}>
        <img
          src={URL.createObjectURL(passportFiles[0])}
          width={'200px'}
          height={'200px'}
          style={{ border: '2px solid #001f3f' }}
        />

        <br />
        <Button
          color="error"
          variant="contained"
          onClick={() => setPassportFiles(null)}
        >
          Change Picture
        </Button>
      </Box>
    );
  }

  return (
    <>
      {!passportFiles && (
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
            name="passport"
            className="passport-input"
            ref={passportInputRef}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassportFiles(event.target.files);
              event.target.files &&
                setValue('passportImgFile', event.target.files[0]);
            }}
            hidden
          />

          <Button
            variant="contained"
            onClick={() => passportInputRef.current?.click()}
            sx={{ mt: 2 }}
          >
            Select Files
          </Button>
        </Box>
      )}
    </>
  );
};

export default PassportUploadWidget;

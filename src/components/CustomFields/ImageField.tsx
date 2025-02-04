import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useRecordContext } from 'react-admin';

interface ImageFieldProps {
    source: string;
}

const ImageField: React.FC<ImageFieldProps> = ({ source }) => {
    const record = useRecordContext();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleClickOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const images = (record && record[source]) || [];

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {images.length > 0 ? (
          images.map((image:string, index:number) => (
            <img
              key={index}
              src={image || 'https://i.pravatar.cc/150'}
              alt={`Image ${index + 1}`}
              style={{ width: 50, height: 50, objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => handleClickOpen(image)}
            />
          ))
        ) : (
          <img
            src="https://i.pravatar.cc/150"
            alt="No Image"
            style={{ width: 50, height: 50, objectFit: 'cover' }}
            onClick={() => handleClickOpen("https://i.pravatar.cc/300")}
          />
        )}
      </div>

      {/* Modal for showing the selected image */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Image Preview
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img src={selectedImage || 'https://i.pravatar.cc/150'} alt="Selected" style={{ width: '100%', height: 'auto' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageField;

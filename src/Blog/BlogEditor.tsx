import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";
import React, { useEffect, useState } from "react";
import { ImageField, ImageInput, TextInput } from "react-admin";

interface BlogEditorProps {
  initialTitle?: string;
  initialBody?: string;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({
  initialTitle = "",
  initialBody = "",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [bodyContent, setBodyContent] = useState(initialBody);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    setTitle(initialTitle);
    setBodyContent(initialBody);
  }, [initialTitle, initialBody]);

  const handleImageChange = (files: File[]) => {
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <Grid container spacing={3}>
      {/* Left Column: Form Inputs */}
      <Grid item xs={12} md={6}>
        {/* Title Input */}
        <TextInput
          fullWidth
          source="title"
          label="Blog Title"
          defaultValue={initialTitle}
          onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
          sx={{
            "& .RaInput-input": {
              fontSize: "1.1rem",
              fontWeight: 500,
            },
          }}
        />

        {/* Image Input */}
        <Box mt={3}>
          <ImageInput
            source="images"
            label="Upload Blog Images"
            accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
            onChange={handleImageChange}
            sx={{
              "& .RaFileInput-dropZone": {
                border: "2px dashed #3f51b5",
                padding: 2,
                borderRadius: 2,
                backgroundColor: "#fafafa",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#f0f4ff",
                },
              },
            }}
          >
            <ImageField source="src" title="title" />
          </ImageInput>
        </Box>

        {/* Rich Text Editor */}
        <Box mt={3}>
          <RichTextInput
            source="body"
            label="Blog Content"
            toolbar={
              <RichTextInputToolbar>
                <FormatButtons size="small" />
                <ListButtons size="small" />
                <LinkButtons size="small" />
                <ClearButtons size="small" />
              </RichTextInputToolbar>
            }
            fullWidth
            defaultValue={initialBody}
            onChange={(event: any) => {
              const value = event?.target?.value ?? event;
              setBodyContent(value);
            }}
            sx={{
              ".ProseMirror": {
                minHeight: "250px",
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                backgroundColor: "#fff",
                fontFamily: "Roboto, Arial, sans-serif",
              },
            }}
          />
        </Box>
      </Grid>

      {/* Right Column: Live Preview */}
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            p: 2,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
            height: "100%",
          }}
        >
          <CardContent sx={{ overflowY: "auto", maxHeight: "600px" }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: "#80848889",
                borderBottom: "1px solid #80808074",
                pb: 1,
                mb: 2,
                textAlign: "center",
              }}
            >
              PREVIEW
            </Typography>
            {/* Blog Title Preview */}
            {title && (
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "#2c3e50",
                  borderBottom: "2px solid #eee",
                  pb: 1,
                  mb: 2,
                  textAlign: "center",
                }}
              >
                {title}
              </Typography>
            )}

            {/* Horizontal Scroll for Images */}
            {imagePreviews.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  mb: 2,
                  overflowX: "auto",
                  pb: 1,
                }}
              >
                {imagePreviews.map((src, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={src}
                    alt={`preview-${idx}`}
                    sx={{
                      width: { xs: "80px", sm: "120px" },
                      height: { xs: "80px", sm: "120px" },
                      objectFit: "cover",
                      borderRadius: "12px",
                      border: "1px solid #ddd",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                      flexShrink: 0,
                    }}
                  />
                ))}
              </Box>
            )}

            {/* Blog Body Preview */}
            <Box
              sx={{
                color: "#444",
                fontSize: "1rem",
                lineHeight: 1.7,
                fontFamily: "Roboto, Arial, sans-serif",
              }}
              dangerouslySetInnerHTML={{ __html: bodyContent }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

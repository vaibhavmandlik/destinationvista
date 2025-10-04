import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { TextInput, ImageInput, ImageField } from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";

interface BlogEditorProps {
  initialTitle?: string;
  initialBody?: string;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({
  initialTitle = "",
  initialBody = "",
}) => {
  const { control, setValue } = useFormContext();

  // Watch RA form fields for live preview
  const title = useWatch({ control, name: "title" }) || initialTitle;
  const bodyContent = useWatch({ control, name: "body" }) || initialBody;
  const images = useWatch({ control, name: "images" }) || [];

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Generate image previews whenever images change
  useEffect(() => {
    if (images && Array.isArray(images)) {
      const previews = images.map((file: any) =>
        typeof file === "string" ? file : URL.createObjectURL(file.rawFile)
      );
      setImagePreviews(previews);
    }
  }, [images]);

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
        />

        {/* Image Input */}
        <Box mt={3}>
          <ImageInput
            source="images"
            label="Upload Blog Images"
            accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
            multiple
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

            {/* Title Preview */}
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

            {/* Image Previews */}
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
                      "&:hover": { transform: "scale(1.05)" },
                      flexShrink: 0,
                    }}
                  />
                ))}
              </Box>
            )}

            {/* Body Preview */}
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

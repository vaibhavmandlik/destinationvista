import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";

export const CustomRichTextInput = ({ source, size, validate }:any) => {
  return (
    <RichTextInput
      toolbar={
        <RichTextInputToolbar>
          <FormatButtons size={size} />
          <ListButtons size={size} />
          <LinkButtons size={size} />
          <ClearButtons size={size} />
        </RichTextInputToolbar>
      }
      fullWidth
      source={source}
      validate={validate}
    />
  );
};

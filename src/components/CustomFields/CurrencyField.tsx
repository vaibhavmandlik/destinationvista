import React from "react";
import { Typography } from "@mui/material";
import { useRecordContext, FieldProps } from "react-admin";

interface CurrencyFieldProps extends FieldProps {
  source: string;
  locale?: string;
  currency?: string;
}

const formatCurrency = (
  value: number,
  locale = "en-US",
  currency = "USD",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};

const CurrencyField: React.FC<CurrencyFieldProps> = ({
  source,
  locale = "en-US",
  currency = "USD",
  ...rest
}) => {
  const record = useRecordContext();

  if (!record || record[source] == null) {
    return null;
  }

  const value = Number(record[source]);

  if (typeof value !== "number") {
    console.warn(
      `CurrencyField: Value at source "${source}" is not a number. Received:`,
      value,
    );
    return null;
  }

  return (
    <Typography variant="body2" {...rest}>
      {formatCurrency(value, locale, currency)}
    </Typography>
  );
};

export default CurrencyField;

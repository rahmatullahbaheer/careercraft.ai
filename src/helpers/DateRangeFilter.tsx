import { Column } from "@tanstack/react-table";
import React from "react";

export function DateRangeFilter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue() || ["", ""];

  return (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="date"
          value={(columnFilterValue as [string, string])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: string) => [value, old ? old[1] : ""])
          }
          placeholder={`Start Date`}
          className="w-24 border rounded shadow"
        />
        <DebouncedInput
          type="date"
          value={(columnFilterValue as [string, string])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: string) => [old ? old[0] : "", value])
          }
          placeholder={`End Date`}
          className="w-24 border rounded shadow"
        />
      </div>
      <div className="h-1" />
    </div>
  );
}

export function formatStringWithCommas(numberString) {
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  console.log(value);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

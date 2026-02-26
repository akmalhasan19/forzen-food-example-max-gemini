import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ExpiryAlertTable } from "@/components/features/admin/expiry-alert-table";

describe("ExpiryAlertTable", () => {
  it("sorts inventory rows by nearest expiration date", () => {
    render(<ExpiryAlertTable />);

    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1);

    const firstDataRow = rows[1];
    expect(within(firstDataRow).getByText(/Organic Chicken Breast Tenders/i)).toBeInTheDocument();
  });
});

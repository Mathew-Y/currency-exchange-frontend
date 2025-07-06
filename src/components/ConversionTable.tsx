import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { Conversion } from "../models/conversion";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

interface ConversionTableProps {
  conversions: Conversion[];
}

const columnDefs: ColDef<Conversion>[] = [
  { headerName: "Date", field: "date", sort: "asc" },
  { headerName: "Base", field: "base" },
  { headerName: "Target", field: "target" },
  { headerName: "Rate", field: "rate" },
];

export const ConversionTable = ({ conversions }: ConversionTableProps) => {
  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "100%" }}>
      <AgGridReact
        rowData={conversions}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, filter: true, flex: 1 }}
        domLayout="normal"
        theme="legacy"
      />
    </div>
  );
};

export const FieldConfig = {
  name: { key: "station", label: "Station (click to edit)" },
  email: { key: "stationType", label: "Station Type (click to edit)" },
  phone: { key: "company", label: "Company" },
} as { [key: string]: { key: string; label: string } };

export const FieldConfig2 = {
  station: {
    name: { key: "name", label: "Station Name" },
    // stationId: { key: "stationId", label: "Station Id" },
    companyId: { key: "companyId", label: "Company Id", dropdown: "companies" },
    stationTypeId: {
      key: "stationTypeId",
      label: "Station Type Id",
      dropdown: "stationTypes",
    },
    status: { key: "status", label: "Charging/Available" },
  },
  stationType: {
    name: { key: "name", label: "Station Type" },
    // stationTypeId: { key: "stationTypeId", label: "station Type Id" },
    maxPower: { key: "maxPower", label: "maxPower" },
  },
  company: {
    name: { key: "name", label: "Comapany Name" },
    // comapanyId: { key: "comapanyId", label: "Comapany Id" },
    parentCompanyId: {
      key: "parentCompanyId",
      label: "Parent Company Id (If this is a parent company, leave it blank)",
    },
  },
};

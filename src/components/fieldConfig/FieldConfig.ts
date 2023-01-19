export const FieldConfig = {
  name: { key: "restaurant", label: "Restaurant (click to edit)" },
  email: { key: "restaurantType", label: "Restaurant Type (click to edit)" },
  phone: { key: "company", label: "Company" },
} as { [key: string]: { key: string; label: string } };

export const FieldConfig2 = {
  restaurant: {
    name: { key: "name", label: "Restaurant Name" },
    // restaurantId: { key: "restaurantId", label: "Restaurant Id" },
    companyId: { key: "companyId", label: "Company Id", dropdown: "companies" },
    restaurantTypeId: {
      key: "restaurantTypeId",
      label: "Restaurant Type Id",
      dropdown: "restaurantTypes",
    },
    status: {
      key: "status",
      label: "TemporaryClose/Available",
      checkbox: "status",
    },
  },
  restaurantType: {
    name: { key: "name", label: "Restaurant Type" },
    // restaurantTypeId: { key: "restaurantTypeId", label: "restaurant Type Id" },
    franchiseFee: { key: "franchiseFee", label: "FranchiseFee" },
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

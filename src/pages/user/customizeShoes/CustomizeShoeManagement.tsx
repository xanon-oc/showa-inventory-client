import AddPolishServiceModal from "../../../components/ui/AddPolishServiceModal";
import CustomizeShoeManagementTable from "./CustomizeShoeManagementTable";

const CustomizeShoeManagement = () => {
  return (
    <div>
      <div className="py-4">
        <AddPolishServiceModal />
      </div>
      <CustomizeShoeManagementTable />
    </div>
  );
};

export default CustomizeShoeManagement;

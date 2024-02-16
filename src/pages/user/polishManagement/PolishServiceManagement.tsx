import AddPolishServiceModal from "../../../components/ui/AddPolishServiceModal";
import PolishManagementTable from "./PolishManagementTable";

const PolishServiceManagement = () => {
  return (
    <div>
      <div className="py-4">
        <AddPolishServiceModal />
      </div>
      <PolishManagementTable />
    </div>
  );
};

export default PolishServiceManagement;

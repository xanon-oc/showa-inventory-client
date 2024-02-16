import MainLayout from "./components/layout/MainLayout";
import SecureRoute from "./routes/SecureRoute";

const App = () => {
  return (
    <SecureRoute>
      <MainLayout />
    </SecureRoute>
  );
};

export default App;

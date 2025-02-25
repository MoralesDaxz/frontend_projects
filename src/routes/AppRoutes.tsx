import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { navigation } from "./RoutesDefinition";
import Dashboard from "@pages/Dashboard";
import Example from "@components/example/example";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Example />} />
        <Route
          path={navigation.root}
          element={<Navigate to={navigation.root} />}
        />
        <Route path={navigation.project} element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

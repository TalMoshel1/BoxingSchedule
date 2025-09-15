import { Link, Navigate, Route, Routes } from "react-router-dom";
import { routes as routesData } from "../utils/routesData";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export const RenderRoutes = () => {
  const { isVerified } = useContext(AdminContext);

  return (
    <Routes>
      {routesData.map((r, i) => {
        return <Route key={i} path={r.path} element={r.element} />;
      })}
    </Routes>
  );
};

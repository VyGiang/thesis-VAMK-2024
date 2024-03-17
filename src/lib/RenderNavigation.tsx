import { AuthData } from "@/components/auth/AuthWrapper";
import { nav } from "./Navigation";
import { Routes, Route } from "react-router-dom";

export const RenderRoutes = () => {
  const { user } = AuthData();

  return (
    <Routes>
      {nav.map((r, i) => {
        if (r.isPrivate && user) {
          console.log(user);
          return <Route key={i} path={r.path} element={r.element} />;
        } else if (!r.isPrivate) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else return false;
      })}
    </Routes>
  );
};

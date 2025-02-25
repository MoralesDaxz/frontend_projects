import { NavLink } from "react-router-dom";


const Example = () => {
  return (
    <div>
      <p>Render like as index</p>
      <NavLink to={"/projects"} className=" font-semibold text-white">
        Proyectos
      </NavLink>
    </div>
  );
};

export default Example;

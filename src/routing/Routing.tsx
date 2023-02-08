import { Route, Routes } from "react-router-dom";
import { CHARTS, COURSES, INSTRUMENTS, LEADS, MAIN, ORDERS, SETTINGS, SUPPORT } from "../helpers/constants/route";
import Main from "../layouts/Main/Main";
import ChartsPage from "../pages/Charts/ChartsPage";
import CoursesPage from "../pages/Courses/CoursesPage";
import HomePage from "../pages/Home/Home";
import InstrumentsPage from "../pages/Instruments/InstrumentsPage";
import LeadsPage from "../pages/Leads/LeadsPage";
import OrdersPage from "../pages/Orders/OrdersPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import SupportPage from "../pages/Support/SupportPage";

interface IRoutes {
  path: string;
  element: JSX.Element;
  children?: IRoutes[];
}

const routes: IRoutes[] = [
  {
    path: MAIN,
    element: <HomePage />,
  },
  {
    path: LEADS,
    element: <LeadsPage />,
  },
  {
    path: ORDERS,
    element: <OrdersPage />,
  },
  {
    path: COURSES,
    element: <CoursesPage />,
  },
  {
    path: INSTRUMENTS,
    element: <InstrumentsPage />,
  },
  {
    path: SETTINGS,
    element: <SettingsPage />,
  },
  {
    path: CHARTS,
    element: <ChartsPage />,
  },
  {
    path: SUPPORT,
    element: <SupportPage />,
  },
];

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={MAIN} element={<Main />}>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element}>
              {route.children?.map((child, i) => (
                <Route key={i} path={child.path} element={child.element} />
              ))}
            </Route>
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default Routing;

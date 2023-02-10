import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MyButton from "./components/UI/MyButton";
import useAppDispatch from "./hooks/useAppDispatch.hook";
import Routing from "./routing/Routing";

const App = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (window.localStorage.getItem("lang")) {
      i18n.changeLanguage(window.localStorage.getItem("lang") as string);
    }
  }, []);
  return (
    <>
      <Routing />
    </>
  );
};

export default App;

import MyButton from "./components/UI/MyButton";
import useAppDispatch from "./hooks/useAppDispatch.hook";
import Routing from "./routing/Routing";

const App = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Routing />
    </>
  );
};

export default App;

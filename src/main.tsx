import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/style.scss";
import { BrowserRouter } from "react-router-dom";
import  store  from "./redux/store";
import { Provider } from "react-redux";
import "./i18n";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>
);

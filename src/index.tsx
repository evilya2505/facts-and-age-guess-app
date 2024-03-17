import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Provider } from "react-redux";
import store from "./services/store";
import vkBridge from "@vkontakte/vk-bridge";
// import { BrowserRouter } from "react-router-dom";
vkBridge.send("VKWebAppInit");

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <ConfigProvider appearance="light">
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </Provider>
  </ConfigProvider>
);

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "@vkontakte/vkui";
import vkBridge from "@vkontakte/vk-bridge";
import App from "./components/app/app";
import store from "./services/store";
import "@vkontakte/vkui/dist/vkui.css";
import "./index.css";

vkBridge.send("VKWebAppInit");

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <ConfigProvider appearance="light">
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);

import React from "react";
import appStyles from "./app.module.css";
import {
  AppRoot,
  SplitLayout,
  platform,
  PanelHeader,
  SplitCol,
  View,
  Panel,
  Group,
  Header,
  SimpleCell,
} from "@vkontakte/vkui";

function App() {
  return (
    <AppRoot>
      <SplitLayout>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <Group header={<Header mode="secondary">Items</Header>}>
                <SimpleCell>Hello</SimpleCell>
                <SimpleCell>World</SimpleCell>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}

export default App;

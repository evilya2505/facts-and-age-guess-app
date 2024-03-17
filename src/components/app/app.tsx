import { useState } from "react";
import {
  AppRoot,
  Group,
  Header,
  Panel,
  PanelHeader,
  SplitCol,
  SplitLayout,
  Tabs,
  TabsItem,
  View,
} from "@vkontakte/vkui";
import AgeForm from "../age-form/age-form";
import FactsForm from "../facts-form/facts-form";

function App() {
  const [activeGroup, setActiveGroup] = useState("facts");

  return (
    <AppRoot>
      <SplitLayout
        style={{
          boxSizing: "border-box",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 10px 0",
        }}
      >
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader transparent={true} fixed={false}>
                <Tabs>
                  <TabsItem
                    id="tab-content-facts"
                    aria-controls="tab-content-facts"
                    selected={activeGroup === "facts"}
                    onClick={() => setActiveGroup("facts")}
                  >
                    Факты
                  </TabsItem>
                  <TabsItem
                    id="tab-content-age"
                    aria-controls="tab-content-age"
                    selected={activeGroup === "age"}
                    onClick={() => setActiveGroup("age")}
                  >
                    Возраст
                  </TabsItem>
                </Tabs>
              </PanelHeader>
              {activeGroup === "facts" && (
                <Group
                  id="tab-content-facts"
                  header={<Header mode="secondary">Факты</Header>}
                >
                  <FactsForm />
                </Group>
              )}
              {activeGroup === "age" && (
                <Group
                  id="tab-content-age"
                  header={
                    <Header mode="secondary">Узнать возраст по имени</Header>
                  }
                >
                  <AgeForm />
                </Group>
              )}
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}

export default App;

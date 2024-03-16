import React, { useEffect, useState } from "react";
import appStyles from "./app.module.css";
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  Group,
  Header,
  PanelHeader,
  Tabs,
  TabsItem,
  Text,
} from "@vkontakte/vkui";
import FactsForm from "../facts-form/facts-form";
import { useDispatch, useSelector } from "../../services/hooks";
import { getFacts } from "../../services/actions/facts";
import AgeForm from "../age-form/age-form";
import mainApi from "../../utils/mainApi";
import { getAge } from "../../services/actions/age";

function App() {
  const dispatch = useDispatch();
  const age = useSelector((store) => store.age.age);
  const [activePanel, setActivePanel] = useState("facts");
  useEffect(() => {
    dispatch(getAge("test"));
  }, [dispatch]);
  return (
    <AppRoot>
      <SplitLayout
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 10px",
        }}
      >
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader transparent={true} fixed={false}>
                <Tabs>
                  <TabsItem
                    aria-controls="tab-content-facts"
                    selected={activePanel === "facts"}
                    onClick={() => setActivePanel("facts")}
                  >
                    Факты
                  </TabsItem>
                  <TabsItem
                    aria-controls="tab-content-age"
                    selected={activePanel === "age"}
                    onClick={() => setActivePanel("age")}
                  >
                    Возраст
                  </TabsItem>
                </Tabs>
              </PanelHeader>
              {activePanel === "facts" && (
                <Group
                  id="tab-content-facts"
                  header={<Header mode="secondary">Факты</Header>}
                >
                  <FactsForm />
                </Group>
              )}
              {activePanel === "age" && (
                <Group
                  id="tab-content-age"
                  header={
                    <Header mode="secondary">Узнать возраст по имени</Header>
                  }
                >
                  <div>
                    <Text>Ваш возраст: {age.age}</Text>
                  </div>
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

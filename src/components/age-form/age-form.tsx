import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormLayoutGroup,
  FormStatus,
  FormItem,
  Input,
  Button,
} from "@vkontakte/vkui";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getFacts } from "../../services/actions/facts";
import { FactsFormValues, NameFormValues } from "../../utils/types";
import { factsFormSchema } from "../../validations/facts-validations";
import { nameFormSchema } from "../../validations/name-validations";

interface IAgeFormProps {}

const AgeForm: React.FC<IAgeFormProps> = (): JSX.Element => {
  const dispatch = useDispatch();

  const form = useForm<NameFormValues>({
    resolver: yupResolver(nameFormSchema),
  });

  const { register, handleSubmit } = form;
  const { ref } = register("name");

  // useEffect(() => {
  //   // При получении нового факта, устанавливаем его в значение input
  //   setValue("fact", fact.fact);
  //   // Устанавливаем фокус на инпут
  //   setFocus("fact");
  // }, [fact.fact, setFocus, setValue]);

  // Получение нового фанкта при нажатии на кнопку "Получить факт"
  function onSubmitFunc() {
    console.log("submit");
    //   dispatch(getFacts());
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitFunc)}>
      <FormLayoutGroup
        style={{ maxWidth: "1000px", margin: "0 auto" }}
        mode="vertical"
      >
        {/* {true && (
          <FormStatus mode="error">
            Прозошла ошибка. Попробуйте снова.
          </FormStatus>
        )} */}

        <FormItem style={{ padding: "20px 0 10px" }} htmlFor="fact">
          <Input
            getRef={ref}
            id="name"
            type="text"
            placeholder={"Введите имя"}
            // disabled={isLoading}
          />
        </FormItem>

        <FormItem style={{ maxWidth: "300px ", margin: "0 auto" }}>
          <Button
            //   disabled={isLoading}
            type="submit"
            size="l"
            stretched
          >
            {/* {isLoading ? "Загрузка..." : "Получить факт"} */}
            Узнать возраст
          </Button>
        </FormItem>
      </FormLayoutGroup>
    </form>
  );
};

export default AgeForm;

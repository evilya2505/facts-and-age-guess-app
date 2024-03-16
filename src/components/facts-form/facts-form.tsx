import {
  Button,
  FormItem,
  FormLayoutGroup,
  FormStatus,
  Input,
} from "@vkontakte/vkui";
import React, { useEffect, useRef } from "react";
import { useSelector } from "../../services/hooks";
import { FactsFormValues } from "../../utils/types";
import { useFieldArray, useForm } from "react-hook-form";
import { factsFormSchema } from "../../validations/facts-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "../../services/hooks";
import { getFacts } from "../../services/actions/facts";

interface IFactsFormProps {}

const FactsForm: React.FC<IFactsFormProps> = (): JSX.Element => {
  const fact = useSelector((store) => store.facts.fact);
  const isLoading = useSelector((store) => store.facts.request);
  const isOnError = useSelector((store) => store.facts.requestFailed);
  const dispatch = useDispatch();

  const form = useForm<FactsFormValues>({
    resolver: yupResolver(factsFormSchema),
  });

  const { register, handleSubmit, setValue, setFocus } = form;
  const { ref } = register("fact");

  useEffect(() => {
    // При получении нового факта, устанавливаем его в значение input
    setValue("fact", fact.fact);
    // Устанавливаем фокус на инпут
    setFocus("fact");
  }, [fact.fact, setFocus, setValue]);

  // Получение нового фанкта при нажатии на кнопку "Получить факт"
  function onSubmitFunc() {
    dispatch(getFacts());
  }

  // Фукнция для установления курсора после первого слова
  const setCursorAfterFirstWord = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    const input = event.target;
    const value = input.value;

    const firstSpaceIndex = value.indexOf(" ");
    if (firstSpaceIndex !== -1) {
      // Ставим курсор после первого слова
      input.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFunc)} noValidate>
      <FormLayoutGroup
        style={{ maxWidth: "1000px", margin: "0 auto" }}
        mode="vertical"
      >
        {isOnError && (
          <FormStatus mode="error">
            Прозошла ошибка. Попробуйте снова.
          </FormStatus>
        )}

        <FormItem style={{ padding: "20px 0 10px" }} htmlFor="fact">
          <Input
            getRef={ref}
            type="text"
            placeholder={"Рандомный факт"}
            disabled={isLoading}
            onFocus={(e) => setCursorAfterFirstWord(e)} // При фокусе выставлять курсор после первого слова
          />
        </FormItem>

        <FormItem style={{ maxWidth: "300px ", margin: "0 auto" }}>
          <Button disabled={isLoading} type="submit" size="l" stretched>
            {isLoading ? "Загрузка..." : "Получить факт"}
          </Button>
        </FormItem>
      </FormLayoutGroup>
    </form>
  );
};

export default FactsForm;

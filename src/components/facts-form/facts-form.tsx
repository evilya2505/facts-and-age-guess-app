import {
  Button,
  FormItem,
  FormLayoutGroup,
  FormStatus,
  Textarea,
} from "@vkontakte/vkui";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "../../services/hooks";
import { FactsFormValues } from "../../utils/types";
import { factsFormSchema } from "../../validations/facts-validations";
import { getFacts } from "../../services/actions/facts";

interface IFactsFormProps {}

const FactsForm: React.FC<IFactsFormProps> = (): JSX.Element => {
  const fact = useSelector((store) => store.facts.fact);
  const isLoading = useSelector((store) => store.facts.request);
  const isOnError = useSelector((store) => store.facts.requestFailed);
  const dispatch = useDispatch();
  const factInputRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<FactsFormValues>({
    defaultValues: {
      fact: "",
    },
    resolver: yupResolver(factsFormSchema),
  });

  const { handleSubmit, setValue, setFocus, control, watch } = form;
  const watchFact = watch("fact");

  useEffect(() => {
    // При получении нового факта, устанавливаем его в значение input
    setValue("fact", fact.fact);
  }, [fact.fact, setValue]);

  useEffect(() => {
    // Устанавливаем фокус на инпут
    if (factInputRef.current && factInputRef.current.value !== "") {
      factInputRef.current.focus();
    }
  }, [watchFact, setValue, setFocus]);

  // Получение нового факта при нажатии на кнопку "Получить факт"
  function onSubmitFunc() {
    dispatch(getFacts());
  }

  // Фукнция для установления курсора после первого слова
  const setCursorAfterFirstWord = (
    event: React.FocusEvent<HTMLTextAreaElement>
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
      <FormLayoutGroup style={{ margin: "0 auto" }} mode="vertical">
        {isOnError && (
          <FormStatus mode="error">
            Прозошла ошибка. Попробуйте снова.
          </FormStatus>
        )}

        <FormItem style={{ padding: "20px 15px 10px" }} htmlFor="fact">
          <Controller
            name="fact"
            control={control}
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <Textarea
                getRef={factInputRef}
                id="fact"
                placeholder={"Рандомный факт"}
                disabled={isLoading}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={(e) => setCursorAfterFirstWord(e)} // При фокусе выставлять курсор после первого слова
              />
            )}
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

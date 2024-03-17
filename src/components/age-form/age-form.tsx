import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "../../services/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Div,
  FormItem,
  FormLayoutGroup,
  FormStatus,
  Input,
  Text,
} from "@vkontakte/vkui";
import React, { useEffect, useRef } from "react";
import { NameFormValues } from "../../utils/types";
import { getAge } from "../../services/actions/age";
import { nameFormSchema } from "../../validations/name-validations";

interface IAgeFormProps {}

const AgeForm: React.FC<IAgeFormProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.age.request);
  const isOnError = useSelector((store) => store.age.requestFailed);
  const timerIdRef = useRef<number>();
  const age = useSelector((store) => store.age.age);
  const form = useForm<NameFormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(nameFormSchema),
  });

  const { handleSubmit, formState, control, getFieldState, watch, reset } =
    form;
  const { errors } = formState;
  const watchName = watch("name");

  useEffect(() => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = undefined;
    }

    if (
      !getFieldState("name").invalid &&
      getFieldState("name").isDirty &&
      !errors.name
    ) {
      const id = window.setTimeout(() => {
        dispatch(getAge(watchName));
        reset();
      }, 3000);
      timerIdRef.current = id;
    }
  }, [dispatch, getFieldState, reset, watchName, errors]);

  // Получение возраста при нажатии на кнопку "Узнать возраст"
  function onSubmitFunc() {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
    dispatch(getAge(watchName));
    reset();
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitFunc)}>
      <FormLayoutGroup style={{ margin: "0 auto" }} mode="vertical">
        {isOnError && (
          <FormStatus mode="error">
            Прозошла ошибка. Попробуйте снова.
          </FormStatus>
        )}

        <FormItem
          bottom={<Text>{errors?.name?.message}</Text>}
          style={{ padding: "20px 15px 10px" }}
          htmlFor="fact"
        >
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                type="text"
                placeholder="Введите Ваше имя"
                value={value}
                disabled={isLoading}
                onBlur={onBlur}
                onChange={onChange}
                id="name"
                autoComplete="off"
              />
            )}
          />
        </FormItem>
        {age && (
          <Div style={{ padding: "0 15px" }}>
            <Text>Ваш возраст: {age.age || 0}</Text>
            <Text>Ваше имя: {age.name}</Text>
          </Div>
        )}
        <FormItem style={{ maxWidth: "300px ", margin: "0 auto" }}>
          <Button
            disabled={
              isLoading ||
              getFieldState("name").invalid ||
              !getFieldState("name").isDirty
            }
            type="submit"
            size="l"
            stretched
          >
            {isLoading ? "Загрузка..." : "Узнать возраст"}
          </Button>
        </FormItem>
      </FormLayoutGroup>
    </form>
  );
};

export default AgeForm;

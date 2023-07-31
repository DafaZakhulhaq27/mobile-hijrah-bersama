import { MaterialIcons } from "@expo/vector-icons";
import {
  FormControl,
  Icon,
  Input,
  Pressable,
  WarningOutlineIcon,
} from "native-base";
import { InterfaceInputProps } from "native-base/lib/typescript/components/primitives/Input/types";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  label?: string;
  name: string;
} & InterfaceInputProps;

export default function InputText({ label, name, ...props }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [show, setShow] = useState(false);
  const errorMessage = errors[name ?? ""]?.message;
  const type =
    props.type === "password"
      ? show
        ? "text"
        : "password"
      : props.type ?? "text";

  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            InputRightElement={
              props.type === "password" ? (
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              ) : undefined
            }
            {...props}
            type={type}
          />
        )}
      />

      {errorMessage && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
}

import { Objective } from "@betterist/controllers";
import {
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { InputField } from "./InputField";

type ReflectionFormProps = InputHTMLAttributes<HTMLInputElement> & {
  objectives: Pick<Objective, "id" | "title" | "isComplete">[];
  name: string;
};

export const ReflectionForm: React.FC<ReflectionFormProps> = ({
  objectives,
  ...props
}) => {
  const [field, { error }] = useField(props);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = e.target;
    field.value[checkbox.value] = e.target.checked;
  };

  let titles: InputHTMLAttributes<HTMLInputElement>[] = [];
  objectives.forEach((objective) => {
    titles.push(
      <Checkbox
        type={props.type}
        name={field.name}
        value={objective.id}
        defaultChecked={field.value[objective.id]}
        checked={field.value[objective.id]}
        onChange={(e) => handleChange(e)}
        p={2}
        shadow="md"
        borderWidth="1px"
      >
        {objective.title}
      </Checkbox>
    );
  });
  return (
    <FormControl isInvalid={!!error} id={field.name}>
      <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
        <Heading textAlign="center" size="md" mb={5}>
          aaaaa
        </Heading>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {titles}
          <InputField name="additionals" label="Free To Write!"></InputField>
          <InputField name="inputs" label=" To Write!"></InputField>
          <InputField name="outputs" label="Free To Write!"></InputField>
          <InputField name="additionals" label="Free To Write!"></InputField>
        </VStack>
      </Box>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

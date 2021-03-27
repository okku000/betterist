import { useCurerntDailyObjectiveQuery } from "@betterist/controllers";
import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { ReflectionForm } from "../components/ReflectionForm";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";

interface reflectionProps {}

const Reflection: React.FC<reflectionProps> = ({}) => {
  const [{ data }] = useCurerntDailyObjectiveQuery();

  if (data?.currentDailyObjective == null) {
    return <></>;
  }
  const currentObjectives = data.currentDailyObjective.objectives;
  let new_h: Record<number, boolean> = {};
  currentObjectives.map((o) => (new_h[o.id] = o.isComplete));
  return (
    <Wrapper>
      <Formik
        initialValues={{
          objectives: new_h,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <ReflectionForm
              objectives={currentObjectives}
              name="objectives"
              type="checkbox"
            />
            <Button type="submit" mt="8px" isLoading={isSubmitting}>
              Submit
            </Button>
          </Form>
          
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Reflection);

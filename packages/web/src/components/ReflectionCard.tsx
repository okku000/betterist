import { MonthlyObjective, Objective } from "@betterist/controllers";
import { Box, Checkbox } from "@chakra-ui/react";
import React from "react";
import { Reflection } from "./Reflection";

interface ReflectionCardProps {
  objectives:
    | Pick<Objective, "id" | "title" | "isComplete">[]
    | Pick<MonthlyObjective, "title" | "id">[];
  past?: boolean;
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({
  objectives,
  past,
}) => {
  // TODO: 型チェック
  // nested tag の型難易度が高い
  const tagged_titles: any[] = [];
  if ("isComplete" in objectives[0]) {
    let targets = objectives as Pick<
      Objective,
      "id" | "title" | "isComplete"
    >[];
    targets.forEach((objective) => {
      tagged_titles.push(
        <Checkbox
          p={2}
          shadow="md"
          borderWidth="1px"
          defaultIsChecked={objective.isComplete}
          isDisabled={past}
        >
          {objective.title}
        </Checkbox>
      );
    });
  } else {
    let targets = objectives as Pick<MonthlyObjective, "title" | "id">[];
    targets.forEach((objective) => {
      tagged_titles.push(
        <Box p={2} shadow="md" borderWidth="1px">
          {objective.title}
        </Box>
      );
    });
  }

  return <Reflection tagged_titles={tagged_titles} />;
};

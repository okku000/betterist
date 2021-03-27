import {
  useCreateBetteristMutation,
  useMonthlyObjectivesInthisMonthQuery,
  usePreviousDailyObjectiveQuery,
} from "@betterist/controllers";
import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  ScaleFade,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { createContext, useState } from "react";
import { ReflectionCard } from "../components/ReflectionCard";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";

type TextContextProps = {
  header: string;
  footer?: string;
};

export const TextContext = createContext<Partial<TextContextProps>>({});

const Declaration: React.FC<{}> = () => {
  const [
    { data: current, fetching: f_current },
  ] = useMonthlyObjectivesInthisMonthQuery();
  const [
    { data: previous, fetching: f_previous },
  ] = usePreviousDailyObjectiveQuery();
  const [, createBetterist] = useCreateBetteristMutation();
  // TODO: logout 時に来たら、loginpageへ飛ばす
  const [betterist, setBetterist] = useState("");

  if (current === undefined) {
    // TODO: monthlyObjectivesがないままここに来た場合先に作成するように案内する
    return <></>;
  }
  const monthlyObjectives = current.monthlyObjectivesInthisMonth;
  const previousObjectives = previous?.previousDailyObjective.objectives;
  if (monthlyObjectives == null) {
    return (
      <></>
      // TODO: createMonthlyObjective →　このページに飛ぶ動作
    );
  }

  return (
    <Wrapper variant={"small"}>
      <Flex>
        {f_current ? (
          ""
        ) : (
          <TextContext.Provider
            value={{
              header: "振り返り",
              footer: "一日の終りに今日の振り返りをする",
            }}
          >
            <ReflectionCard objectives={monthlyObjectives} />
          </TextContext.Provider>
        )}
        <Spacer />
        {f_previous || previousObjectives == null ? (
          ""
        ) : (
          <TextContext.Provider
            value={{
              header: "yesterday",
            }}
          >
            <ReflectionCard objectives={previousObjectives} past={true} />
          </TextContext.Provider>
        )}
      </Flex>

      <Button
        p={1}
        shadow="md"
        borderWidth="1px"
        w="50%"
        borderRadius="lg"
        ml="auto"
        mr="auto"
        marginTop="5"
        isDisabled={betterist === "" ? false : true}
        onClick={async () => {
          const response = await createBetterist();
          const evaluatorName =
            response.data?.createBetterist.evaluator.username;
          setBetterist(evaluatorName!);
        }}
      >
        <Text mr="auto" ml="auto">
          Find Betterist
        </Text>
      </Button>
      <ScaleFade in={betterist ? true : false} initialScale={0.5}>
        <Flex
          p={1}
          shadow="md"
          borderWidth="1px"
          w="50%"
          borderRadius="md"
          ml="auto"
          mr="auto"
          marginTop="5"
        >
          <Avatar>
            <AvatarBadge boxSize="1.5em" bg="teal.500">
              <Text fontSize="0.65em" color="white">
                {/* TODO: 金額の実装 */}
                100
              </Text>
            </AvatarBadge>
          </Avatar>
          <Text flex={1} m="auto" ml="30px">
            {/* TODO: descriptionの実装 */}
            {betterist}
          </Text>
        </Flex>
      </ScaleFade>
      <Formik
        initialValues={{}}
        onSubmit={async () => {
          // TODO: error を返り値にセットする
          // TODO: dailyObjectivesを作成する
          //         const [, createObjectives] = useCreateObjectivesMutation();
          //         const response = await createObjectives();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Declaration);

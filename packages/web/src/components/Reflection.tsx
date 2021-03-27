import { Box, Heading, StackDivider, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { TextContext } from "../pages/declaration";

// TODO: 型チェック
interface ReflectionProps {
  tagged_titles: any[];
}
export const Reflection: React.FC<ReflectionProps> = ({ tagged_titles }) => {
  const text = useContext(TextContext);
  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <Heading textAlign="center" size="md" mb={5}>
        {text.header}
      </Heading>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {tagged_titles}
      </VStack>
      <Text color="grey" fontSize="sm" textAlign="center" paddingTop={5}>
        {text.footer}
      </Text>
    </Box>
  );
};

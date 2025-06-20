import { Box, Center } from '@chakra-ui/react';
import { ReactNode } from 'react';

type CenteredBoxProps = {
  children: ReactNode;
};

export const CenteredBox = ({ children }: CenteredBoxProps) => (
  <Box pos="absolute" inset="0" bg="bg/10">
    <Center h="full">{children}</Center>
  </Box>
);

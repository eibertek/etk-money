import { Box, ChakraProvider } from '@chakra-ui/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return <ChakraProvider>
    <Box w='100%' h='100vh' bgGradient='linear(to-l, gray.200, gray.300, gray.500)' pt={'100px'}>
      {children}
    </Box>
  </ChakraProvider>;
}

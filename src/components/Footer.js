import React from 'react';
import { HStack, Text } from 'native-base';

function Footer() {
  return (
    <HStack
      flex={0.1}
      width="100%"
      position="absolute"
      justifyContent="center"
      alignItems="center"
      bottom={1}
    >
      <Text>© 2022 Bookingster - Sva prava pridržana.</Text>
    </HStack>
  );
}

export default Footer;

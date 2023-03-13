import { Button, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { compareAsc, format } from "date-fns";

import data from "../data/launchData";

const SpaceX = () => {
  return (
    <Stack backgroundColor="skyblue" w="100%" align="center">
      <Stack mt="60px">
        <Text textAlign="center" fontSize="larger" fontWeight="bold" p="30px">
          Upcoming Next launches
        </Text>
      </Stack>
      <Stack w="70%" m="auto" backgroundColor="blue.700" color="white" p="20px">
        <SimpleGrid columns={3} textAlign="center">
          <Text borderBottom="1px" fontWeight="bold" py="10px">
            Mission
          </Text>
          <Text borderBottom="1px" fontWeight="bold" py="10px">
            Date
          </Text>
          <Text borderBottom="1px" fontWeight="bold" py="10px">
            Launchpad
          </Text>
          {data.launchDates.map((launchDate) => (
            <>
              <a href={`/launchDate/${launchDate.Mission}`} passHref>
                <Text borderBottom="1px" py="5px">
                  {launchDate.Mission}
                </Text>
              </a>
              <a href={`/launchDate/${launchDate.Mission}`} passHref>
                <Text borderBottom="1px" py="5px">
                  {format(new Date(launchDate.Date), "yyyy-MM-dd")}
                </Text>
              </a>
              <a href={`/launchDate/${launchDate.Mission}`} passHref>
                <Text borderBottom="1px" py="5px">
                  {launchDate.Launchpad}
                </Text>
              </a>
            </>
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

export default SpaceX;

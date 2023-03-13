import React, { useEffect, useState } from "react";
import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { intervalToDuration } from "date-fns";
import data from "../data/launchData";

const LaunchDate = () => {
  const { id } = useParams();
  const launchData = data.launchDates.find((a) => a.Mission === id);
  const [displayDate, setDisplayDate] = useState(null);

  useEffect(() => {
    let date = intervalToDuration({
      start: new Date(),
      end: new Date(launchData.Date),
    });
    setDisplayDate(date);
  }, [displayDate]);

  if (!launchData) {
    return (
      <Stack>
        <Text>Launch date Not Found</Text>
      </Stack>
    );
  }
  return (
    <Stack bgGradient="linear(to-r, #98DFD6, #C8B6A6)" align="center" w="100%">
      <Text textAlign="center" fontSize="larger" fontWeight="bold" p="30px">
        Upcoming:{launchData?.Mission}
      </Text>
      <Stack
        w="50%"
        m="auto"
        backgroundColor="blue.700"
        color="white"
        p="20px"
        textAlign="center"
      >
        <Stack>
          <Text fontWeight="bold" w="80px" m="auto">
            {displayDate?.years}
          </Text>
        </Stack>
        <Stack pb="20px">
          <Text border="1px" fontWeight="bold" p="5px" w="80px" m="auto">
            Years
          </Text>
        </Stack>
        <Stack>
          <Text fontWeight="bold" w="80px" m="auto">
            {displayDate?.months}
          </Text>
        </Stack>
        <Stack pb="20px">
          <Text border="1px" fontWeight="bold" p="5px" w="80px" m="auto">
            Months
          </Text>
        </Stack>
        <Stack>
          <Text fontWeight="bold" w="80px" m="auto">
            {displayDate?.days}
          </Text>
        </Stack>
        <Stack pb="20px">
          <Text border="1px" fontWeight="bold" p="5px" w="80px" m="auto">
            Dates
          </Text>
        </Stack>
        <Stack>
          <Text fontWeight="bold" w="80px" m="auto">
            {displayDate?.hours}
          </Text>
        </Stack>
        <Stack pb="20px">
          <Text border="1px" fontWeight="bold" p="5px" w="80px" m="auto">
            Hours
          </Text>
        </Stack>
        <Stack>
          <Text fontWeight="bold" w="80px" m="auto">
            {displayDate?.minutes}
          </Text>
        </Stack>
        <Stack>
          <Text border="1px" fontWeight="bold" p="5px" w="80px" m="auto">
            Minutes
          </Text>
        </Stack>
        <Stack>
          <Text fontWeight="bold" w="80px" m="auto">
            {displayDate?.seconds}
          </Text>
        </Stack>
        <Stack>
          <Text border="1px" fontWeight="bold" p="5px" w="80px" m="auto">
            Seconds
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LaunchDate;

import React, { useEffect, useState } from "react";
import { Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { intervalToDuration, compareAsc } from "date-fns";
//import data from "../data/launchData";

const LaunchDate = () => {
  const { id } = useParams();
  const [launchDate, setLaunchDate] = useState(null);

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v4/launches/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLaunchDate(data);
        //setLaunchDate({ ...data, date_utc: "2023-03-15T13:41:00.000Z" });
      });
  }, []);
  const [displayDate, setDisplayDate] = useState(null);

  useEffect(() => {
    let todaysDate = new Date();

    if (
      launchDate &&
      compareAsc(new Date(launchDate?.date_utc), todaysDate) > 0
    ) {
      let date = intervalToDuration({
        start: todaysDate,
        end: new Date(launchDate?.date_utc),
      });
      setDisplayDate(date);
    }
  }, [launchDate, displayDate]);

  if (!launchDate) {
    return (
      <Stack>
        <Text>loading...</Text>
      </Stack>
    );
  }
  return (
    <Stack bgGradient="linear(to-r, #98DFD6, #C8B6A6)" align="center" w="100%">
      <Text textAlign="center" fontSize="larger" fontWeight="bold" p="30px">
        Upcoming:{launchDate?.name}
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
            {displayDate?.years ?? 0}
          </Text>
        </Stack>
        <Stack pb="20px">
          <Text border="1px" fontWeight="bold" p="5px" w="80px" m="auto">
            Years
          </Text>
        </Stack>
        <Stack>
          <Text fontWeight="bold" w="80px" m="auto">
            {displayDate?.months ?? 0}
          </Text>
        </Stack>
        <Stack pb="20px">
          <Text border="1px" fontWeight="bold" p="5px" w="80px" m="auto">
            Months
          </Text>
        </Stack>
        <Stack>
          <Text fontWeight="bold" w="80px" m="auto">
            {displayDate?.days ?? 0}
          </Text>
        </Stack>
        <Stack pb="20px">
          <Text border="1px" fontWeight="bold" p="5px" w="80px" m="auto">
            Dates
          </Text>
        </Stack>
        <Stack>
          <Text fontWeight="bold" w="80px" m="auto">
            {displayDate?.hours ?? 0}
          </Text>
        </Stack>
        <Stack pb="20px">
          <Text border="1px" fontWeight="bold" p="5px" w="80px" m="auto">
            Hours
          </Text>
        </Stack>
        <Stack>
          <Text fontWeight="bold" w="80px" m="auto">
            {displayDate?.minutes ?? 0}
          </Text>
        </Stack>
        <Stack>
          <Text border="1px" fontWeight="bold" p="5px" w="80px" m="auto">
            Minutes
          </Text>
        </Stack>
        <Stack>
          <Text fontWeight="bold" w="80px" m="auto">
            {displayDate?.seconds ?? 0}
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

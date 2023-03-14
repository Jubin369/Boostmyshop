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

  const ShowTime = ({ text, time }) => {
    return (
      <>
        <Stack>
          <Text fontWeight="bold" w="80px" m="auto">
            {time}
          </Text>
        </Stack>
        <Stack pb="20px">
          <Text border="1px" fontWeight="bold" p="5px" w="80px" m="auto">
            {text}
          </Text>
        </Stack>
      </>
    );
  };

  if (!launchDate) {
    return (
      <Stack>
        <Text>loading...</Text>
      </Stack>
    );
  }
  return (
    <Stack bgGradient="linear(to-r, #98DFD6, #C8B6A6)" align="center" w="100%">
      <Text
        textAlign="center"
        fontSize="larger"
        fontWeight="bold"
        p="30px"
        mt="60px"
      >
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
        <ShowTime text="Years" time={displayDate?.years ?? 0} />
        <ShowTime text="Months" time={displayDate?.months ?? 0} />
        <ShowTime text="Days" time={displayDate?.days ?? 0} />
        <ShowTime text="Hours" time={displayDate?.hours ?? 0} />
        <ShowTime text="Minutes" time={displayDate?.minutes ?? 0} />
        <ShowTime text="Seconds" time={displayDate?.seconds ?? 0} />
      </Stack>
    </Stack>
  );
};

export default LaunchDate;

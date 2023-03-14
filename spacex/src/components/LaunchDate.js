import React, { useEffect, useState } from "react";
import { Stack, Text, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { intervalToDuration, compareAsc, add } from "date-fns";
import { MdOutlineWhatsapp } from "react-icons/md";
//import data from "../data/launchData";

const LaunchDate = () => {
  const { id } = useParams();
  const [launchDate, setLaunchDate] = useState(null);

  const toast = useToast();

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v4/launches/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLaunchDate({
          ...data,
          addOneYear: add(new Date(data?.date_utc), {
            years: 1,
            months: 0,
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          }),
        });
        //setLaunchDate({ ...data, date_utc: "2023-03-15T13:41:00.000Z" });
      })
      .catch((error) => {
        toast({
          title: `Error: ${error}`,
          status: "error",
          isClosable: true,
        });
      });
  }, []);
  const [displayDate, setDisplayDate] = useState(null);

  useEffect(() => {
    let todaysDate = new Date();

    if (
      launchDate &&
      compareAsc(new Date(launchDate?.addOneYear), todaysDate) > 0
    ) {
      let date = intervalToDuration({
        start: todaysDate,
        end: new Date(launchDate?.addOneYear),
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
      <Stack
        bgGradient="linear(to-r, #62CDFF, #0E8388)"
        align="center"
        w="100%"
        minH="100%"
      >
        <Stack
          w="50%"
          m="auto"
          backgroundColor="blue.700"
          color="white"
          p="20px"
          textAlign="center"
          minH="100%"
        >
          <Text>loading...</Text>
        </Stack>
      </Stack>
    );
  }
  return (
    <Stack bgGradient="linear(to-r, #62CDFF, #0E8388)" align="center" w="100%">
      <Text
        textAlign="center"
        fontSize="larger"
        fontWeight="bold"
        p="30px"
        mt="100px"
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

      <a
        href={`whatsapp://send?text=http://localhost:3000/launchDate/${id}`}
        data-action="share/whatsapp/share"
        target="_blank"
      >
        <Stack mb="30px">
          <MdOutlineWhatsapp color="green" size="30px" />
        </Stack>
      </a>
    </Stack>
  );
};

export default LaunchDate;

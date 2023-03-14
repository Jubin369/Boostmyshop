import { SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { format, add } from "date-fns";

const SpaceX = () => {
  const [launchDates, setLaunchDates] = useState(null);

  const [loading, setLoading] = useState(true);

  const toast = useToast();

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches/upcoming")
      .then((response) => response.json())
      .then((data) => {
        const launchDataSet = data;
        Promise.all(
          launchDataSet.map((launchData) =>
            fetch(
              `https://api.spacexdata.com/v4/launchpads/${launchData?.launchpad}`
            )
          )
        )
          .then((resp) => Promise.all(resp.map((r) => r.json())))
          .then((result) => {
            const launchDatas = result.map((data, i) => {
              const launchData = Object.assign(launchDataSet[i], {
                launchPadName: data?.name,
                addOneYear: add(new Date(launchDataSet[i]?.date_utc), {
                  years: 1,
                  months: 0,
                  weeks: 0,
                  days: 0,
                  hours: 0,
                  minutes: 0,
                  seconds: 0,
                }),
              });
              return launchData;
            });
            setLaunchDates(launchDatas);
            setLoading(false);
          })
          .catch((error) => {
            toast({
              title: `Error: ${error}`,
              status: "error",
              isClosable: true,
            });
            setLoading(false);
          });
      })
      .catch((error) => {
        toast({
          title: `Error: ${error}`,
          status: "error",
          isClosable: true,
        });
        setLoading(false);
      });
  }, []);

  return (
    <Stack
      bgGradient="linear(to-r, violet, blue)"
      w="100%"
      align="center"
      minHeight="100vh"
    >
      <Stack mt="200px">
        <Text textAlign="center" fontSize="larger" fontWeight="bold" p="10px">
          Upcoming Next launches
        </Text>
      </Stack>
      <Stack w="70%" color="white" p="20px">
        {loading && <Text textAlign="center">Loading...</Text>}
        {!loading && (
          <SimpleGrid
            columns={3}
            backgroundColor="blue.700"
            textAlign="center"
            mb="20px"
            p="10px"
          >
            <Text borderBottom="1px" fontWeight="bold" py="10px">
              Mission
            </Text>
            <Text borderBottom="1px" fontWeight="bold" py="10px">
              Date
            </Text>
            <Text borderBottom="1px" fontWeight="bold" py="10px">
              Launchpad
            </Text>
            {launchDates?.map((launchDate) => (
              <>
                <a href={`/launchDate/${launchDate.id}`}>
                  <Text borderBottom="1px" py="5px">
                    {launchDate.name}
                  </Text>
                </a>
                <a href={`/launchDate/${launchDate.id}`}>
                  <Text borderBottom="1px" py="5px">
                    {format(new Date(launchDate?.addOneYear), "yyyy-MM-dd")}
                  </Text>
                </a>
                <a href={`/launchDate/${launchDate.id}`}>
                  <Text borderBottom="1px" py="5px">
                    {launchDate.launchPadName}
                  </Text>
                </a>
              </>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Stack>
  );
};

export default SpaceX;

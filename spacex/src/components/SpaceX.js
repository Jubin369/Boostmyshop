import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const SpaceX = () => {
  const [launchDates, setLaunchDates] = useState(null);

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
              });
              return launchData;
            });
            setLaunchDates(launchDatas);
          });
      });
  }, []);

  return (
    <Stack
      bgGradient="linear(to-r, violet, blue)"
      w="100%"
      align="center"
      minH="100%"
    >
      <Stack mt="200px">
        <Text textAlign="center" fontSize="larger" fontWeight="bold" p="30px">
          Upcoming Next launches
        </Text>
      </Stack>
      <Stack w="70%" backgroundColor="blue.700" color="white" p="20px">
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
          {launchDates?.map((launchDate) => (
            <>
              <a href={`/launchDate/${launchDate.id}`}>
                <Text borderBottom="1px" py="5px">
                  {launchDate.name}
                </Text>
              </a>
              <a href={`/launchDate/${launchDate.id}`}>
                <Text borderBottom="1px" py="5px">
                  {format(new Date(launchDate.date_utc), "yyyy-MM-dd")}
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
      </Stack>
    </Stack>
  );
};

export default SpaceX;

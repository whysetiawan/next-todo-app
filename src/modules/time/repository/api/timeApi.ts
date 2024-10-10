import type { TimeApiDto } from "#/modules/time/repository/api/timeApiDto";
import { mapTimeFromResponseToEntity } from "#/modules/time/repository/api/timeMapper";

export const getTimeFromTimezone = async (timezone: string) => {
  const response = await fetch(
    `http://worldtimeapi.org/api/timezone/${timezone}`,
    {
      cache: "no-store",
    },
  );
  const data = (await response.json()) as TimeApiDto.FromTimezoneResponse;
  return mapTimeFromResponseToEntity(data);
};

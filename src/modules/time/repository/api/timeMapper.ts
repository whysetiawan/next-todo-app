import * as time from "#/modules/time/domain/entities/time";
import type { TimeApiDto } from "#/modules/time/repository/api/timeApiDto";

export const mapTimeFromResponseToEntity = (
  response: TimeApiDto.FromTimezoneResponse,
): time.Time => {
  return time.create({
    abbreviation: response.abbreviation,
    datetime: response.datetime,
    timezone: response.timezone,
    unixtime: response.unixtime,
    utcOffset: response.utc_offset,
  });
};

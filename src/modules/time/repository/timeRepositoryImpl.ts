import type { TimeRepository } from "#/modules/time/domain/timeRepository";
import { getTimeFromTimezone } from "#/modules/time/repository/api/timeApi";

const timeRepositoryImpl = (): TimeRepository => {
  return {
    getTimeFromTimezone: getTimeFromTimezone,
  };
};
export default timeRepositoryImpl();

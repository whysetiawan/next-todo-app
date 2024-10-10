import type { Time } from "#/modules/time/domain/entities/time";

export interface TimeRepository {
  getTimeFromTimezone: (timezone: string) => Promise<Time>;
}

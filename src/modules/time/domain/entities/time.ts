import { z } from "zod";

const time = z.object({
  abbreviation: z.string(),
  timezone: z.string(),
  datetime: z.string(),
  unixtime: z.number(),
  utcOffset: z.string(),
});

export type Time = z.infer<typeof time>;

export const create = (data: Time): Time => {
  return time.parse(data);
};

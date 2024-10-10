import dayjs from "dayjs";

import timeRepositoryImpl from "#/modules/time/repository/timeRepositoryImpl";

const getTime = async () => {
  const time = await timeRepositoryImpl.getTimeFromTimezone("Asia/Jakarta");
  return time;
};

const Greeting: React.FC = async () => {
  const time = await getTime();
  return (
    <div className="font-bold flex flex-1 justify-between">
      <span>Hi, User</span>
      <span>
        {time.timezone} {dayjs(time.datetime).format("DD MMM YYYY HH:mm")}
      </span>
    </div>
  );
};

export default Greeting;

import { useEffect, useState } from "react";

type PropsType = {
  end: Date;
};

const CountDown = ({ end }: PropsType) => {
  // const [init, setInit] = useState(true);
  const [count, setCount] = useState({
    dates: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getFormatTime = (data: number) => {
    if (String(data).length === 2) {
      return `${data}`;
    } else {
      return `0${data}`;
    }
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const intervalCallback = () => {
      const curTime = new Date().getTime();
      const endTime = end.getTime();
      const diff = (endTime - curTime) / 1000;
      const dates = Math.floor(diff / (3600 * 24));
      const hours = Math.floor((diff - dates * 3600 * 24) / 3600);
      const minutes = Math.floor(
        (diff - dates * 3600 * 24 - hours * 3600) / 60
      );
      const seconds = Math.floor(
        diff - dates * 3600 * 24 - hours * 3600 - minutes * 60
      );

      if ([dates, hours, minutes, seconds].some((v) => v < 0)) {
        console.log("시간멈춤");
        if (interval) {
          clearInterval(interval);
        }
        return;
      }

      setCount({
        dates,
        hours,
        minutes,
        seconds,
      });

      if ([dates, hours, minutes, seconds].every((v) => v === 0)) {
        console.log("시간멈춤");
        return clearInterval(interval);
      }
    };

    const curTime = new Date().getTime();
    const endTime = end.getTime();
    const diff = (endTime - curTime) / 1000;
    const dates = Math.floor(diff / (3600 * 24));
    const hours = Math.floor((diff - dates * 3600 * 24) / 3600);
    const minutes = Math.floor((diff - dates * 3600 * 24 - hours * 3600) / 60);
    const seconds = Math.floor(
      diff - dates * 3600 * 24 - hours * 3600 - minutes * 60
    );

    if ([dates, hours, minutes, seconds].some((v) => v < 0)) {
      console.log("지난시간");
    } else {
      console.log("새로운 시간");
      setCount({
        dates,
        hours,
        minutes,
        seconds,
      });
      interval = setInterval(intervalCallback, 1000);
    }

    return () => clearInterval(interval);
  }, [end]);

  const { dates, hours, minutes, seconds } = count;
  return (
    <>
      <div>{`${end.getHours()} : ${end.getMinutes()} : ${end.getSeconds()}`}</div>
      <div>{`${getFormatTime(dates)}일 ${getFormatTime(
        hours
      )}시간 ${getFormatTime(minutes)}분 ${getFormatTime(seconds)}초`}</div>
    </>
  );
};

export default CountDown;

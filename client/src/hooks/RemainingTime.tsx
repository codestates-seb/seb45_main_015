import dayjs from "dayjs";

export function RemainingTime(endTime: string | undefined) {
  const now = dayjs();

  if (endTime) {
    const targetTime = dayjs(endTime);
    const timeDifference = targetTime.diff(now, "second");

    let daysRemaining = Math.floor(timeDifference / (60 * 60 * 24));
    let hoursRemaining = Math.floor(
      (timeDifference % (60 * 60 * 24)) / (60 * 60),
    );
    let minutesRemaining = Math.floor((timeDifference % (60 * 60)) / 60);
    let secondsRemaining = timeDifference % 60;

    daysRemaining = Math.max(daysRemaining, 0);
    hoursRemaining = Math.max(hoursRemaining, 0);
    minutesRemaining = Math.max(minutesRemaining, 0);
    secondsRemaining = Math.max(secondsRemaining, 0);

    if (
      daysRemaining === 0 &&
      hoursRemaining === 0 &&
      minutesRemaining === 0 &&
      secondsRemaining === 0
    ) {
      return "경매가 종료되었습니다.";
    } else {
      return `${daysRemaining}일 ${hoursRemaining}시간 ${minutesRemaining}분 ${secondsRemaining}초`;
    }
  }
  return "남은 시간을 불러오는데 실패하였습니다.";
}

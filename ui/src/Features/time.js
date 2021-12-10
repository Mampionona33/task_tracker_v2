export const GetStartDateTime = () => {
  const timeElapsed = Date.now();
  const timeNow = new Date(timeElapsed);
  console.log(timeNow);
  return timeNow;
};

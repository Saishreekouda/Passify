export const getFormattedDate = () => {
  const currentTimeStamp = Date.now();
  const currentDate = new Date(currentTimeStamp);

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const year = currentDate.getFullYear();

  return `${day}-${month}-${year}`;
};

export const getFormattedTime = () => {
  const currentTimeStamp = Date.now();
  const currentDate = new Date(currentTimeStamp);

  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

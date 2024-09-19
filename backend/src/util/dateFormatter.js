// dateFormatter.js
const formatDate = (date) => {
  const pad = (n) => (n < 10 ? "0" + n : n);
  
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-based, hence adding 1
  const day = pad(date.getDate());
  
  const hours = pad(date.getHours()); // 24-hour format
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

module.exports = formatDate;

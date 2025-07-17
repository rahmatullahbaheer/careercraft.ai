export const getFormattedDate = (date: any, format: string = "") => {
  if (date === "") {
    return date;
  }
  if (format === "") {
    return new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (format === "YYYY-MM-DD") {
    let a = [{ year: "numeric" }, { month: "2-digit" }, { day: "2-digit" }];
    let t = new Date(date);
    let formatted = a
      .map((m: any) => {
        let f = new Intl.DateTimeFormat("en", m);
        return f.format(t);
      })
      .join("-");
    return formatted;
  }
  if (format === "MM-DD") {
    let a = [{ month: "long" }, { day: "2-digit" }];
    let t = new Date(date);
    let formatted = a
      .map((m: any) => {
        let f = new Intl.DateTimeFormat("en", m);
        return f.format(t);
      })
      .join("  ");
    return formatted;
  }
  if (format === "MM DD, YYYY") {
    let a = [{ month: "long" }, { day: "2-digit" }, { year: "numeric" }];
    let t = new Date(date);
    let formatted = a
      .map((m: any, index) => {
        let f = new Intl.DateTimeFormat("en", m);
        return f.format(t) + (index == 1 ? ", " : "");
      })
      .join(" ");
    return formatted;
  }
};

export const formatDate=(dateStr:any)=> {
  if (!dateStr.includes('-')) {
    // If it does, assume it's already formatted and return it directly
    return dateStr;
  }

  // Split the date string into year, month, and day
  const [year, month, day] = dateStr.split('-');

  // Create a Date object with the provided year, month, and day
  const dateObj = new Date(year, month - 1, day);

  // Get the month name and year
  const monthName = dateObj.toLocaleString('en-us', { month: 'long' });
  const formattedDate = `${monthName} ${year}`;

  return formattedDate;
}
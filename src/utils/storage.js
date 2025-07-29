export const getPackages = () => JSON.parse(localStorage.getItem("packages") || "[]");
export const savePackages = (data) => localStorage.setItem("packages", JSON.stringify(data));

export const getBookings = () => JSON.parse(localStorage.getItem("bookings") || "[]");
export const saveBookings = (data) => localStorage.setItem("bookings", JSON.stringify(data));

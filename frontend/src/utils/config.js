export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

export const requestConfig = (method, data, token, image) => {
  let config;
  if (image) {
    config = {
      method: method,
      body: data,
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method: method,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  } else {
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
  return config;
};

import { axios } from "axios";
import { router } from "../router";

export const userService = {
  login,
  register,
  loguot,
};

function login(data) {
  return axios
    .post("http://127.0.0.1:5000/login", JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    })
    .then(handleResponse)
    .then((response) => {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      router.push("/");

      // console.log(response);
    })
    .catch((error) => console.log(error));
}

function register(user) {
  return axios
    .post(
      "http://127.0.0.1:5000/signup",
      { headers: { "Content-Type": "application/json" } },
      user
    )
    .then(handleResponse)
    .catch((error) => console.log(error));
}

function loguot() {
  localStorage.removeItem("user");
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        loguot();
        location.reload(true);
      }
      const error = response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

// function authHeader() {
//   let token = JSON.parse(localStorage.getItem("token"));
//   if (token) {
//     return { Authorization: "Bearer " + token };
//   } else {
//     return {};
//   }
// }

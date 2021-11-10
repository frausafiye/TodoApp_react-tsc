import axios from "axios";

export const requestSender = async (
  routeName: string,
  method: "get" | "post" | "patch" | "delete",
  obj: { body: object | null; params: string }
) => {
  try {
    let route = routeName === "" ? "/" : `/${routeName}/`;
    const response = await axios({
      method: method,
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}${route}${obj.params}`,
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      //AuthToken:""...from user.token
      // },
      data: obj ? obj.body : null,
    });

    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

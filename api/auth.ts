import UserInfo from "@/types/UserInfo";
import instance from ".";

const login = async (userInfo: UserInfo) => {
  const { data } = await instance.post("/auth/login", userInfo);
  return data;
};

const register = async (userInfo: UserInfo, image: string, name: string) => {
  const formData = new FormData();
  formData.append("email", userInfo.email);
  formData.append("password", userInfo.password);
  formData.append("name", name);
  formData.append("image", {
    uri: image,
    name: "image",
    type: "image/jpeg",
  } as any);
  const { data } = await instance.post("/auth/register", formData);
  return data;
};

const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

export { login, register, me, getAllUsers };

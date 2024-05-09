import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signUp(
  userData: {
    fullname: string;
    email: string;
    password: string;
    phone: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
    image?: string;
  },
  callback: Function
) {
  const data = await retrieveDataByField("users", "email", userData.email);
  if (data.length > 0) {
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = "user";
    }
    userData.image = "";
    userData.created_at = new Date();
    userData.updated_at = new Date();
    userData.password = await bcrypt.hash(userData.password, 10);
    addData("users", userData, (result: boolean) => {
      callback(result);
    });
  }
}

export async function signIn(email: string) {
  const data = await retrieveDataByField("users", "email", email);
  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(
  data: {
    id?: string;
    email: string;
    role?: string;
    image?: string;
    password?: string;
    updated_at?: Date;
    created_at?: Date;
  },
  callback: Function
) {
  const user = await retrieveDataByField("users", "email", data.email);
  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "user";
    data.created_at = new Date();
    data.updated_at = new Date();
    data.password = "";
    await addData("users", data, (result: boolean, res: any) => {
      if (result) {
        callback(data);
      }
    });
  }
}

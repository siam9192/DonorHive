import bcrypt from "bcrypt";

export const bcryptHash = async (data: string) => {
  return await bcrypt.hash(data, Number(10));
};

export const bcryptCompare = async (data: string, hashedData: string) => {
  return await bcrypt.compare(data, hashedData);
};

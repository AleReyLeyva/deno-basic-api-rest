import client from "../db.ts";
import userInterface from "./userInterface.ts";

export const existsById = async (id: number) => {
  const [
    res,
  ] = await client.query(
    "SELECT COUNT(*) count FROM user where id = ? LIMIT 1",
    [id]
  );
  return res.count > 0;
};

export const existsByName = async (name: string) => {
  const [
    res,
  ] = await client.query(
    "SELECT COUNT(*) count FROM user where name = ? LIMIT 1",
    [name]
  );
  return res.count > 0;
};

export const getAll = async () => {
  return await client.query("SELECT * FROM user");
};

export const getById = async (id: number) => {
  return await client.query("SELECT * FROM user where id = ?", [id]);
};

export const insert = async ({ name, country }: userInterface) => {
  return await client.execute("INSERT INTO user (name, country) VALUES (?,?)", [
    name,
    country,
  ]);
};

export const update = async ({ id, name, country }: userInterface) => {
  return await client.execute(
    "UPDATE user SET name = ?, country = ? WHERE id = ?",
    [name, country, id]
  );
};

export const remove = async (id: number) => {
  return await client.execute("DELETE FROM user WHERE id = ?", [id]);
};

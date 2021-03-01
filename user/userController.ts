import userInterface from "./userInterface.ts";
import {
  getAll,
  getById,
  update,
  remove,
  insert,
  existsById,
  existsByName,
} from "./userRepository.ts";

export const getAllUsers = async ({ response }: { response: any }) => {
  try {
    const users: userInterface[] = await getAll();
    response.body = {
      users,
      success: true,
    };
    response.status = 200;
  } catch (error) {
    response.body = {
      success: false,
      message: "Server error",
    };
    response.status = 400;
  }
};

export const getUser = async ({
  response,
  params,
}: {
  response: any;
  params: { id: string };
}) => {
  try {
    const userExists: boolean = await existsById(Number(params.id));
    if (!userExists) {
      response.status = 404;
      response.body = {
        success: false,
        message: "User not found",
      };
    } else {
      const user: userInterface = await getById(Number(params.id));
      response.status = 200;
      response.body = {
        user,
        success: true,
      };
    }
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      message: "Server error",
    };
  }
};

export const createUser = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      message: "No data provided",
      success: false,
    };
    return;
  }
  try {
    const body = request.body({
      type: "json",
    });
    const userBody = await body.value;
    const userExists: boolean = await existsByName(userBody.name);
    if (userExists) {
      response.status = 400;
      response.body = {
        success: false,
        message: "User already exists",
      };
    } else {
      await insert({
        name: userBody.name,
        country: userBody.country,
      });
      response.status = 201;
      response.body = {
        success: true,
        message: "User added successfully",
      };
    }
  } catch (error) {
    response.status = 400;
    response.body = {
      message: error.message,
      success: false,
    };
  }
};

export const deleteUser = async ({
  response,
  params,
}: {
  response: any;
  params: { id: string };
}) => {
  try {
    const userExists: boolean = await existsById(Number(params.id));
    if (!userExists) {
      response.status = 404;
      response.body = {
        success: false,
        message: "User not found",
      };
    } else {
      await remove(Number(params.id));
      response.status = 200;
      response.body = {
        success: true,
        message: "User deleted successfully",
      };
    }
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      message: "Server error",
    };
  }
};

export const updateUser = async ({
  request,
  response,
  params,
}: {
  request: any;
  response: any;
  params: { id: string };
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No data provided",
    };
    return;
  }

  if (!params.id) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No user id (/:id) provided",
    };
    return;
  }

  try {
    const userExists: boolean = await existsById(Number(params.id));
    if (!userExists) {
      response.status = 404;
      response.body = {
        success: false,
        message: "User not found",
      };
    } else {
      const body = request.body({
        type: "json",
      });
      const userBody = await body.value;
      const data: userInterface = {
        id: Number(params.id),
        name: userBody.name,
        country: userBody.country,
      };
      await update(data);
      response.status = 200;
      response.body = {
        success: true,
        message: "User updated successfully",
      };
    }
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      message: "Server error",
    };
  }
};

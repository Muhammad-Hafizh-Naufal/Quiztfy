import Users from "../Models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users); // Mengirimkan data users
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    res.status(201).json({
      data: newUser,
      message: "User added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding user", error: error.message });
  }
};

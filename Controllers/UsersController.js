import users from '../Models/users.js';

const UsersController = {
  getList: async (req, res) => {
    try {
      const user = await users.find();
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await users.findById(req.params.id);
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    try {
      const newUser = await users.create(req.body);
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    
    try {
      const updatedUser = await users.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await users.findByIdAndDelete(id);
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
};

export default UsersController;

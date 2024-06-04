import links from '../Models/links.js';
import users from '../Models/users.js'
const LinksController = {
  getLinks: async (req, res) => {
    try {
      const link = await links.find();
      res.json(link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const link = await links.findById(req.params.id);
      res.json(link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    const { originalUrl } = req.body;

    try {
      
      const newLink = await links.create({ originalUrl });
      users.links?.push(newLink.id);
      res.json(newLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { originalUrl } = req.body;
    try {
      const updatedLink = await links.findByIdAndUpdate(id, req.body, { originalUrl: originalUrl }, { new: true });
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await links.findByIdAndDelete(id);
      users.links.remove(id);
      await users.save();
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  getClicksByLink: async (req, res) => {
    try {
      const linkId = req.params.id;
      const link = await Link.findById(linkId);
      if (!link) {
          return res.status(404).json({ message: 'Link not found' });
      }

      const clicksByTarget = link.targetValues.map(target => {
          return {
              target: target.value,
              clicks: link.clicks.filter(click => click.targetParamValue === target.value)
          };
      });

      res.status(200).json(clicksByTarget);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
}
};

export default LinksController;

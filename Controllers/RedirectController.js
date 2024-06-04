import Link from '../Models/links.js'; // ודא שהנתיב נכון
import { v4 as uuidv4 } from 'uuid';

const RedirectController = {
    redirectLink: async (req, res) => {
        try {
            const linkId = req.params.id;
            const link = await Link.findById(linkId);
            if (!link) {
                return res.status(404).json({ message: 'Link not found' });
            }

            const targetParamValue = req.query[link.targetParamName];

            const click = {
                _id: uuidv4(),
                insertedAt: new Date(),
                ipAddress: req.ip,
                targetParamValue: targetParamValue || ''
            };
            link.clicks.push(click);

            await link.save();

            res.redirect(link.originalUrl);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

};

export default RedirectController;

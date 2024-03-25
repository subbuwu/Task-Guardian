import { User } from "../db/ModelSchema.js";

export const attachTypeOfUser = async (req, res, next) => {
    const { username, password } = req.headers;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required in headers' });
    }

    try {
        const user = await User.findOne({ username : username });

        if (!user) {
            return res.json({ message: 'No Such User!!' });
        }

        if (password !== user.password) {
            return res.json({ message: 'Password Wrong!!' });
        }

        req.user = {
            _id: user._id,
            role: user.role,
        };

        next();
    } catch (error) {
        console.error(error);
        res.json({ message: 'Internal server error' });
    }
};

export const checkRoleAndProceed = (req, res, next) => {
    if (!req.user || !req.user.role) {
        console.log(req);
        return res.send('Error!!!');
    }

    if(req.user.role === 'Manager' && (req.path === "/updateRole" )) return res.send('Admin Access denied');

    if (req.user.role === 'Admin' || req.user.role === 'Manager') {
        return next();
    }

    return res.send('Access denied');
};

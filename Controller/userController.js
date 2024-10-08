import userModel from '../users.js';
import bcrypt from 'bcrypt';
const userController = {
    getAllUsers: async (req, res) => {
        let users = await userModel.find();
        res.status(200).send(users);
    },

    createUser: async (req, res) => {
        let user = req.body;
        console.log(req.body);
        let result = await userModel.create(user);
        res.status(201).send(result);
    },

    updateUser: async (req, res) => {
        let newUser = req.body;
        let userId = req.params.id;
        // console.log(req.id, req.params);
        let result = await userModel.findByIdAndUpdate(userId, newUser);
        res.status(201).send(result);
    },

    deleteUser: async (req, res) => {
        let userId = req.params.id;
        // console.log(req.id, req.params);
        let result = await userModel.findByIdAndDelete(userId);
        res.status(200).send(result);
    },

    register: async (req, res) => {
        let userInfo = req.body;
        let salt = bcrypt.genSaltSync();
        let hashedPassword = bcrypt.hashSync(userInfo.password, salt);
        let result = await userModel.create({
            username: userInfo.username,
            password: hashedPassword
        })
        res.status(201).send(
            {
                result: result,
                data: {
                    username: userInfo.username,
                    password: hashedPassword
                }
            }
        )
    },

    login: async (req, res) => {
        let userInfo = req.body;
        let currentUser = await userModel.findOne({username: userInfo.username});
        if (!currentUser) {
            res.status(404).send('Nhap sai username');
        } else {
            let isCorrectPassword = bcrypt.compareSync(userInfo.password, currentUser.password);
            if (!isCorrectPassword) {
                res.status(401).send('Nhap sai password');
            } else {
                res.status(200).send({
                    message: 'Login thanh cong!',
                    data: currentUser
                });
            }
        }
    },

    forgetPassword: async (req, res) => {
        let {username} = req.body;
        let currentUser = await userModel.findOne({username});
        if (!currentUser) {
            res.status(404).send('user ko ton tai');
        } else {
            let otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
            let result = await userModel.findOneAndUpdate({username},
                {
                    username: currentUser.username,
                    password: currentUser.password,
                    otp,
                    createdOtp: new Date()
                }
            )
            res.status(201).send(result);
        }
    },

    resetPassword: async (req, res) => {
        let {username, otp} = req.body;
        let currentUser = await userModel.findOne({username});
        console.log(currentUser);
        if (!currentUser) {
            res.status(404).send('user ko ton tai');
        } else {
            if (currentUser.otp == otp) {
                if ((new Date() - currentUser.createdOtp < 300000)) {
                    let password = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
                    let salt = bcrypt.genSaltSync();
                    let hashedPassword = bcrypt.hashSync(password + '', salt);
                    let result = await userModel.findOneAndUpdate({username},
                        {
                            username: currentUser.username,
                            password: hashedPassword,
                            otp,
                            createdOtp: new Date()
                        }
                    )
                    res.status(201).send({
                        message: 'Success',
                        data: {
                            ...result,
                            password: password
                        }
                    });
                } else {
                    res.status(400).send('otp da qua han');
                }
            } else {
                res.status(400).send('otp khong dung');
            }
        }
    }
}

export default userController
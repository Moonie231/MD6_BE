import {User} from "../model/User";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt';
import {SECRET} from "../middleware/auth";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.config";
import {Address} from "../model/Address";
import {Order} from "../model/Order";

class UserServices {
    private userRepository;
    private addressRepository;
    private orderRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
        this.addressRepository = AppDataSource.getRepository(Address)
        this.orderRepository = AppDataSource.getRepository(Order)
    }


    generateTokenFromString = (email) => {
        return email = jwt.sign(email, process.env.JWT_SECRET_KEY)
    }
    register = async (user) => {
        let userCheck = await this.userRepository.findOneBy({email: user.email});
        if (userCheck) {
            return "Email already registered";
        }
        user.userPassword = await bcrypt.hash(user.userPassword, 10);
        const tokenEmail = jwt.sign(user.email, process.env.JWT_SECRET_KEY)
        const userNew = {
            username: user.username,
            email: user.email,
            userPassword: user.userPassword,
            tokenEmail: tokenEmail,
            status: false,
        };
        return this.userRepository.save(userNew)
    }
    verifyEmail = async (tokenEmail) => {
        if (!tokenEmail) {
            return " Email Token not found ..."
        } else {
            const user = await this.userRepository.findOneBy({tokenEmail: tokenEmail})
            if (user) {
                user.status = true;
                const userInfo = {
                    status: user.status,
                    tokenEmail: null

                }
                return this.userRepository.update({idUser: user.idUser}, userInfo);
            } else {
                return "Email verification failed"
            }
        }

    }
    sendEmailVerificationRequest = async (email) => {
        const token = this.generateTokenFromString(email)
        let options = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Trưa nay ăn gì WEB Email Verification',
            html: `
            <div>
                <span>Dear New User</span>
                <p>
                    Please click the following link to verify your email:
                </p>
                <a href="http://localhost:3000/verify-email/${token}">
                    http://localhost:3000/verify-email/${token}
                </a>
                <p>
                    Please ignore this email if you didn't register.
                </p>
            </div>
            `
        }
        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        })
    }

    checkUser = async (user) => {
        let userCheck = await this.userRepository.findOneBy({email: user.email});
        if (!userCheck) {
            return "User not found";
        } else {
            if (userCheck.status === 'pending approval') {
                return "Account not ready"
            }
            if (userCheck.status === 'locked') {
                return "Account locked"
            }
            let passwordCompare = await bcrypt.compare(user.password, userCheck.userPassword);
            if (!passwordCompare) {
                return "Wrong password"
            } else {
                let payload = {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                    role: userCheck.role
                }
                const token = jwt.sign(payload, SECRET, {
                    expiresIn: 36000000
                });
                let sql = `select *
                           from user u
                                    inner join \`order\` o on u.idUser = o.id_user
                           where idUser = ${userCheck.idUser}
                             and o.status = 'watching'`
                let order = await this.orderRepository.query(sql)
                let sql2 = `SELECT *
                            FROM merchant m
                                     INNER JOIN food f ON m.idMerchant = f.id_Merchant
                                     INNER JOIN order_detail od ON f.idFood = od.id_Food
                                     INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                                     INNER JOIN user u ON o.id_user = u.idUser
                            where o.id_user = ${userCheck.idUser}
                              and o.status = 'watching'
                            group by u.email`
                let order2=await this.orderRepository.query(sql2)
                if (order.length === 0) {
                    let data = {
                        id_user: userCheck.idUser,
                        status: 'watching'
                    }
                    let orderNew = await this.orderRepository.save(data)
                    let userRes = {
                        idUser: userCheck.idUser,
                        username: userCheck.username,
                        role: userCheck.role,
                        avatar: userCheck.avatar,
                        status: userCheck.status,
                        token: token,
                        id_Order: orderNew.idOrder,
                        idMerchantByOrder: null
                    }
                    return userRes
                } else if(order.length > 0 && order2.length<1){
                    const idOrder = order[0].idOrder;
                    let userRes = {
                        idUser: userCheck.idUser,
                        username: userCheck.username,
                        role: userCheck.role,
                        avatar: userCheck.avatar,
                        status: userCheck.status,
                        token: token,
                        id_Order: idOrder,
                        idMerchantByOrder: null
                    }

                    return userRes;
                }else {
                    const idOrder = order[0].idOrder;
                    let userRes = {
                        idUser: userCheck.idUser,
                        username: userCheck.username,
                        role: userCheck.role,
                        avatar: userCheck.avatar,
                        status: userCheck.status,
                        token: token,
                        id_Order: idOrder,
                        idMerchantByOrder: order2[0].idMerchant
                    }
                    return userRes
                }

            }
        }

    }

    getMyProfile = async (idUser) => {
        let user = await this.userRepository.findOneBy({idUser: idUser});
        return user;
    }

    edit = async (id, newUser) => {
        console.log(newUser)
        let checkUser = await this.userRepository.findOneBy({idUser: id})
        if (!checkUser) {
            return "User not found"
        }
        return await this.userRepository.update({idUser: id}, newUser)
    }

    address = async (id) => {
        let sql = "select * from address join user on address.id_User = user.idUser where user.idUser = " + id
        return await this.userRepository.query(sql)
    }

    addAddress = async (address) => {
        return await this.addressRepository.save(address)
    }

    editAddress = async (idAddress, newAddress) => {
        let address = await this.addressRepository.findOneBy({idAddress: idAddress})
        if (!address) {
            return "Address not found"
        }
        return await this.addressRepository.update({idAddress: idAddress}, newAddress)
    }

    deleteAddress = async (idAddress) => {
        let address = await this.addressRepository.findOneBy({idAddress: idAddress})
        if (!address) {
            return "Address not found"
        }
        return await this.addressRepository.delete({idAddress: idAddress})
    }
}

export default new UserServices()
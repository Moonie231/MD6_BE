import {User} from "../model/User";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt';
import {SECRET} from "../middleware/auth";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.config";
class UserServices {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)

    }


    generateTokenFromString=(email)=> {
        return email=jwt.sign(email,process.env.JWT_SECRET_KEY)
    }
    register = async (user) => {
        let userCheck = await this.userRepository.findOneBy({email: user.email});
        if (userCheck) {
            return "Email already registered";
        }
        user.userPassword = await bcrypt.hash(user.userPassword, 10);
        const tokenEmail = jwt.sign(user.email,process.env.JWT_SECRET_KEY)
        const userNew = {
            username:user.username,
            email:user.email,
            userPassword: user.userPassword,
            tokenEmail: tokenEmail,
            status: false,
        };
        return this.userRepository.save(userNew)
    }
    verifyEmail=async (tokenEmail) =>{
        if (!tokenEmail){
            return " Email Token not found ..."
        }else {
            const user = await this.userRepository.findOneBy({tokenEmail:tokenEmail})
            if (user){
                user.status=true;
                const userInfo={
                    status:user.status,
                    tokenEmail:null

                }
                return this.userRepository.update({idUser: user.idUser}, userInfo);
            }
            else {
                return "Email verification failed"
            }
        }

    }
      sendEmailVerificationRequest=async (email)=>{
        const token= this.generateTokenFromString(email)
          console.log(token)
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
            }
            else {
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
                let userRes = {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                    role: userCheck.role,
                    avatar: userCheck.avatar,
                    token : token
                }
                return userRes;
            }
        }

    }
}

export default new UserServices()
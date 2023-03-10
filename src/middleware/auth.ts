import jwt from 'jsonwebtoken'
export const SECRET = '12345678'

export const auth = (req, res, next) => {
    console.log(req.headers)
    let authorization = req.headers.authorization
    console.log()
    if (authorization) {
        let accessToken = req.headers.authorization.split(' ')[1]
        if (accessToken) {
            jwt.verify(accessToken, SECRET, (err, payload) => {
                if (err) {
                    res.status(403).json({
                        err: err.message,
                        message: 'you are anonymous'
                    })
                } else {
                    req.decoded = payload
                    next()
                }
            })
        }else {
            res.status(403).json({message: 'you are anonymous'})
        }
    } else {
        res.status(403).json({message: 'you are anonymous'})
    }

}
import jwt, { Secret } from 'jsonwebtoken';

function generateAccessToken(user_id: number) {
    const payload = {
        user: user_id
    };


    return jwt.sign(payload, process.env.SECRET1 as Secret, { expiresIn: '15m' });
}

export default generateAccessToken;
import jwt, { Secret } from 'jsonwebtoken';

function generateRefreshToken(user_id: number, tokenVersion: number) {
    const payload = {
        user: user_id,
        tokenVersion
    };

    return jwt.sign(payload, process.env.SECRET2 as Secret, { expiresIn: '14d' });
}

export default generateRefreshToken;
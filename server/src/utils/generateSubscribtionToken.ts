import jwt, { Secret } from 'jsonwebtoken';

function generateSubscribtionToken(user_id: number, tokenVersion: number) {
    const payload = {
        user: user_id,
        tokenVersion
    };

    return jwt.sign(payload, process.env.SECRET3 as Secret, { expiresIn: '7d' });
}

export default generateSubscribtionToken
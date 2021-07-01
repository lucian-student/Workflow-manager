import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("token", token, {
        httpOnly: true,
        path: "/refresh_token"
    });
};


import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string, expires?: boolean) => {

    res.cookie("token", token, {
        httpOnly: true,
        path: "/refresh_token",
        maxAge: expires ? 0 : 60 * 60 * 24 * 7 * 1000,
    });
};


"use server";

import { authData } from "../_domain/types";

export async function postToAero(data: authData) {
    const response = await fetch(
        "http://192.168.0.223/test/hs/wt_10/send-SMS",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error("Ошибка отправки SMS");
    }
}

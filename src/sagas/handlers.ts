import { getAction } from "@/fadux";
import { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { put } from "redux-saga/effects"

// Kiểm tra kết nối có ok không
export function checkOK(response: AxiosResponse) {
    return response.status === 201 || response.status === 200;
}

// Xử lý các lỗi có thể xảy ra
export function* handleErrors({ actionName, payload, error }: { actionName: string, payload: any, error: Error | AxiosError | any }): any {
    if (axios.isAxiosError(error))
        switch (error.message) {
            // Lỗi mạng
            case "Network Error":
                // Hiển thị panel thử lại
                yield put(getAction(actionName, "networkError")({}));
                break;
        }
}

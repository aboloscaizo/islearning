export const ValidationMessages = {
    EMAIL: {
        INVALID: "Email không hợp lệ",
        REQUIRED: "Email không được để trống",  
    },
    PASSWORD: {
        REQUIRED: "Mật khẩu không được để trống",
        MIN_LENGTH: "Mật khẩu phải có ít nhất 6 ký tự",
        MAX_LENGTH: "Mật khẩu không được vượt quá 16 ký tự",
        MUST_BE_STRING: "Mật khẩu phải là chuỗi",
    },
    ROLE: {
        REQUIRED: "Vai trò không được để trống",
        INVALID: "Vai trò không hợp lệ",
    },
    STATUS: {
        REQUIRED: "Trạng thái không được để trống",
        INVALID: "Trạng thái không hợp lệ",
    },
    REFRESH_TOKEN: {
        REQUIRED: 'Refresh token không được để trống',
        MUST_BE_STRING: 'Refresh token phải là chuỗi ký tự',
    },
    
} as const;
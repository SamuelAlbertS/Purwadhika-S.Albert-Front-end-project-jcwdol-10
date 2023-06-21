import * as Yup from "yup"

export const RegisterValidationSchema = Yup.object(
    {
        username : Yup.string()
            .min(6, "username must be at least 6 characters.")
            .max(20,"username must be less than 20 characters.")
            .required("username is required."),
        email: Yup.string()
            .email("email must be a valid email.")
            .required("email is required."),
        password : Yup.string()
            .min(6, "password must be at least 6 characters.")
            // .matches(/^[a-zA-Z0-9!@#$%^&*()]+$/,"password must contain at least 1 symbols and 1 capital letter")
            .matches(/^(?=.*[A-Z])(?=.*\W)(?=.*\w).{6,}$/,"password must contain at least 1 symbols and 1 capital letter")
            .required("password is required."),
        repassword : Yup.string()
            .oneOf([Yup.ref("password"),null],"password must match."),
        phonenumber : Yup.string()
            .required("phone number is required.")
            .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,"phone number must be valid.")
    }
)

export const loginValidationSchema = Yup.object(
    {
        username : Yup.string()
            .min(6, "username must be at least 6 characters.")
            .max(20,"username must be less than 20 characters.")
            .required("username is required."),
        password : Yup.string()
            .min(6, "password must be at least 6 characters.")
            .matches(/^(?=.*[A-Z])(?=.*\W)(?=.*\w).{6,}$/,"password must contain at least 1 symbols and 1 capital letter")
            .required("password is required."),
    }
)

export const changePasswordSchema = Yup.object(
    {
        currentpassword : Yup.string()
            .min(6, "password must be at least 6 characters.")
            .matches(/^(?=.*[A-Z])(?=.*\W)(?=.*\w).{6,}$/,"password must contain at least 1 symbols and 1 capital letter")
            .required("password is required."),
        newpassword : Yup.string()
            .min(6, "password must be at least 6 characters.")
            .matches(/^(?=.*[A-Z])(?=.*\W)(?=.*\w).{6,}$/,"password must contain at least 1 symbols and 1 capital letter")
            .required("password is required."),
        repassword : Yup.string()
            .oneOf([Yup.ref("newpassword"),null],"password must match."),
    }
)

export const changeUsernameSchema = Yup.object(
    {
        newUsername : Yup.string()
            .min(6, "username must be at least 6 characters.")
            .max(20,"username must be less than 20 characters.")
            .required("username is required."),
    }
)

export const changeEmailSchema = Yup.object(
    {
        newEmail : Yup.string()
            .email("email must be a valid email.")
            .required("email is required")
    }
)

export const changePhoneNumberSchema = Yup.object(
    {
        newPhone : Yup.string()
            .required("phone number is required.")
            .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,"phone number must be valid.")
    }
)

export const resetPasswordSchema = Yup.object(
    {
        password : Yup.string()
            .min(6, "password must be at least 6 characters.")
            .matches(/^(?=.*[A-Z])(?=.*\W)(?=.*\w).{6,}$/,"password must contain at least 1 symbols and 1 capital letter")
            .required("password is required."),
        repassword : Yup.string()
            .oneOf([Yup.ref("newpassword"),null],"password must match."),
    }
)

export const forgetPasswordSchema = Yup.object(
    {
        email : Yup.string()
            .email("email must be a valid email.")
            .required("email is required")
    }
)
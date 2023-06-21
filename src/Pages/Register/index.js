import { Formik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { RegisterValidationSchema } from "../../Store/slices/auth/validation";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Store/slices/auth/slices";

function RegisterPage(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {token, loading} = useSelector(state => {
        return {
            token : state.auth.token,
            loading : state.auth.loading
        }
    })

    if(token){
        return <Navigate to="/" replace/>
    }
    return(
        <div className="w-full h-screen bg-slate-600 flex flex-row justify-center items-center">
            <div className="w-1/3 h-auto bg-slate-300 shadow-sm rounded flex flex-col relative items-center gap-2">
            <h1 className="mb-4 w-full text-center text-4xl font-bold capitalize">Register</h1>
            <Formik
                initialValues={{username : "", password: "", email: "", repassword: "", phonenumber: ""}}
                validate={values => {
                    try{
                        RegisterValidationSchema.validateSync(values)
                        return{}
                    }catch(error){
                        console.log("error",error?.message)
                        return {message : error?.message}
                    }
                }}
                onSubmit={(values, {setSubmitting}) => {
                    dispatch(register(values))
                    setSubmitting(false)
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting})=>(
                <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label>Username : </label>
                        <input type="text" 
                        name="username"
                        className="input input-bordered w-full mb-10"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        ></input>
                    </div>
                    <div className="flex flex-col">
                        <label>Password : </label>
                        <input type="password" 
                        name="password"
                        className="input input-bordered w-full mb-10"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}></input>
                    </div>
                    <div className="flex flex-col">
                        <label>Confirm Password : </label>
                        <input type="password"
                        name="repassword"
                        className="input input-bordered w-full mb-10"
                        placeholder="Confirm Password"
                        value={values.repassword}
                        onChange={handleChange}
                        onBlur={handleBlur}></input>
                    </div>
                    <div className="flex flex-col">
                        <label>Phone Number : </label>
                        <input type="tel" 
                        className="input input-bordered w-full mb-10"
                        name="phonenumber"
                        placeholder="Phone Number"
                        value={values.phonenumber}
                        onChange={handleChange}
                        onBlur={handleBlur}></input>
                    </div>
                    <div className="flex flex-col">
                        <label>Email : </label>
                        <input type="email"
                        name="email" 
                        className="input input-bordered w-full mb-10"
                        placeholder="E-mail"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}></input>
                    </div>
                    {
                        errors.message && (
                            <div className="alert alert-error mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{errors.message}</span>
                            </div>
                        )
                    }
                    <button className="btn btn-primary w-full" type="submit" disabled={isSubmitting || loading}>
                        {isSubmitting || loading ? <span className="loading loading-spinner"></span> : null}Register!</button>
                </form>
                )}
            </Formik>
            </div>
        </div>
    )
}

export default RegisterPage
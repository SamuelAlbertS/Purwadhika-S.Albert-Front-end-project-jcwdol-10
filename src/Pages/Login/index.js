import { Formik, replace } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../Store/slices/auth/validation";
import { login } from "../../Store/slices/auth/slices";
import { useDispatch, useSelector } from "react-redux";


function LoginPage(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {token, loading, id} = useSelector(state=>{
        return {
            token : state.auth.token,
            loading : state.auth.loading,
        }
    })

    console.log(token)
    if(token){
        return <Navigate to="/" replace/>
    }

    return(
        <div className="w-full h-screen bg-slate-600 flex flex-row justify-center items-center">
            <div className=" w-1/3 h-2/3 bg-slate-300 shadow-sm rounded px-4 py-4 relative flex flex-col items-center">
                <h1 className="mb-10 w-full text-center text-4xl">Login</h1>
                <Formik
                    initialValues={{username : "", password: ""}}
                    validate={values => {
                        try{
                            loginValidationSchema.validateSync(values)
                            return{}
                        }catch(error){
                            console.log("error",error?.message)
                            return {message : error?.message}
                        }
                    }}
                    onSubmit={(values, {setSubmitting})=>{
                        dispatch(login(values))
                        setSubmitting(false)
                    }}>
                        {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting})=>(
                <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label>Username : </label>
                        <input type="text" 
                        className="input input-bordered w-full mb-10"
                        name="username"
                        placeholder="username/email/phone number"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}></input>
                    </div>
                    <div className="flex flex-col">
                        <label>Password : </label>
                        <input type="password" 
                        className="input input-bordered w-full mb-10"
                        name="password"
                        placeholder="password"
                        value={values.password}
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
                    <button type="submit" className="btn btn-primary w-1/2" disabled={isSubmitting||loading}>
                    {isSubmitting || loading ? <span className="loading loading-spinner"></span> : null}
                        Login
                    </button>
                    
                    <h1 className="mt-5">
                        <a className="text-blue-500 cursor-pointer" onClick={()=>navigate("/forgetPassword")}>ForgetPassword</a>
                    </h1>
                    <h1 className="mt-5">
                        <a className="text-blue-500 cursor-pointer" onClick={()=>navigate("/register")}>Register</a>
                    </h1>
                </form>)}
                </Formik>
            </div>

        </div>
    )
}

export default LoginPage
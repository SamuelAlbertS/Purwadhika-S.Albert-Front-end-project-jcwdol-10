import Header from "../../Header/header";
import Footer from "../../Footer/footer";
import { resetPasswordSchema } from "../../Store/slices/auth/validation";
import { Formik } from "formik";
import { resetPassword } from "../../Store/slices/auth/slices";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ResetPassword (){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useParams()
    const {loading} = useSelector(state=>{
        return{
            loading : state.auth?.loading
        }
    })

    return(
        <div className="w-full h-screen bg-slate-600 flex flex-row justify-center items-center">
            <div className=" w-1/3 h-1/2 bg-slate-300 shadow-sm rounded px-4 py-4 relative flex flex-col items-center">
                <h1 className="mb-10 w-full text-center text-4xl">Change Password</h1>
                <Formik
                    initialValues={{password : "", confirmPassword : ""}}
                    validate={values => {
                        try{
                            resetPasswordSchema.validateSync(values)
                            return{}
                        }catch(error){
                            console.log("error",error?.message)
                            return {message : error?.message}
                        }
                    }}
                    onSubmit={(values, {setSubmitting})=>{
                        
                        dispatch(resetPassword(values))
                        setSubmitting(false)
                    }}
                >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting})=>(
                <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="text-white">New Password : </label>
                        <input type="password" 
                        className="input input-bordered w-full mb-10"
                        name="password"
                        placeholder="new password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}></input>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white">Confirm Password : </label>
                        <input type="password" 
                        className="input input-bordered w-full mb-10"
                        name="repassword"
                        placeholder="confirm new password"
                        value={values.confirmPassword}
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
                        Confirm new password
                    </button>
                </form>)}
                </Formik>
            </div>
        </div>
    )
}

export default ResetPassword
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { changeEmailSchema } from "../../Store/slices/auth/validation";
import { changeEmail } from "../../Store/slices/auth/slices";

function UpdateEmail(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id, token, loading, email} = useSelector(state=>{
        return {
            id : state.auth.id,
            token : state.auth.token,
            loading : state.auth.loading,
            email : state.auth.email
        }
    })

    if(!token){
        return <Navigate to="/" replace></Navigate>
    }

    return(
        <div className="w-full h-screen bg-slate-600 flex flex-row justify-center items-center">
            <div className=" w-1/3 h-1/2 bg-slate-300 shadow-sm rounded px-4 py-4 relative flex flex-col items-center">
                <h1 className="mb-10 w-full text-center text-4xl">Change Email</h1>
                <Formik 
                    initialValues={{email : email, newEmail : ""}}
                    validate={values => {
                        try{
                            changeEmailSchema.validateSync(values)
                            return{}
                        }catch(error){
                            console.log("error",error?.message)
                            return {message : error?.message}
                        }
                    }}
                    onSubmit={(values, {setSubmitting})=>{
                        
                        dispatch(changeEmail(values))
                        setSubmitting(false)
                    }}
                >{({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting})=>(
                    <form onSubmit={handleSubmit}>
                        <div className="w-full flex flex-col items-center">
                            <div className="flex flex-row">
                                <label className="text-white">Email : </label>
                                <input type="email"
                                className="input input-bordered w-full mb-10"
                                name="email"
                                value={values.newEmail}
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
                        Save Email
                        </button>
                        </div>
                    </form>
                )}
                </Formik>                   
                </div>
            </div>
    );

}

export default UpdateEmail
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { changePhoneNumberSchema } from "../../Store/slices/auth/validation";
import { changePhoneNumber } from "../../Store/slices/auth/slices";

function UpdatePhoneNumber(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id, token, loading, phone} = useSelector(state=>{
        return {
            id : state.auth.id,
            token : state.auth.token,
            loading : state.auth.loading,
            phone : state.auth.phone
        }
    })

    if(!token){
        return <Navigate to="/" replace></Navigate>
    }

    return(
        <div className="w-full h-screen bg-slate-600 flex flex-row justify-center items-center">
            <div className=" w-1/3 h-1/2 bg-slate-300 shadow-sm rounded px-4 py-4 relative flex flex-col items-center">
                <h1 className="mb-10 w-full text-center text-4xl">Change Phone Number</h1>
                <Formik 
                    initialValues={{phone : phone, newPhone : ""}}
                    validate={values => {
                        try{
                            changePhoneNumberSchema.validateSync(values)
                            return{}
                        }catch(error){
                            console.log("error",error?.message)
                            return {message : error?.message}
                        }
                    }}
                    onSubmit={(values, {setSubmitting})=>{
                        
                        dispatch(changePhoneNumber(values))
                        setSubmitting(false)
                    }}
                >{({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting})=>(
                    <form onSubmit={handleSubmit}>
                        <div className="w-full flex flex-col items-center">
                            <div className="flex flex-col">
                                <label className="text-white">Phone : </label>
                                <input type="tel"
                                className="input input-bordered w-full mb-10"
                                name="phone"
                                value={values.newPhone}
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
                        Save Phone Number
                        </button>
                        </div>
                    </form>
                )}
                </Formik>                                      
                </div>
            </div>
    );

}

export default UpdatePhoneNumber
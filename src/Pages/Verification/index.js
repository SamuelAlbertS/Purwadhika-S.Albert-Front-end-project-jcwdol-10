import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../Store/slices/auth/slices";
import { useLocation, useParams,} from "react-router-dom";
import { Navigate } from "react-router-dom";


function VerificationPage({verificationToken}){

    const {token} = useParams()

    const dispatch = useDispatch()
    const location = useLocation()

    const {isVerified}=useSelector(state=>{
        return{
            isVerified : state.auth.isVerified
        }
    })

    if(isVerified){
        return <Navigate to="/" replace></Navigate>
    }

    const handleVerification = () => {
        dispatch(verifyEmail(token))

    }

    return(
        <div className="w-full h-screen bg-slate-600 flex flex-row justify-center items-center">
            <div className=" w-1/3 h-auto bg-slate-300 shadow-sm rounded px-4 py-4 relative flex flex-col items-center">
            <h2> Verification Page </h2>
            <button onClick={handleVerification} className="btn btn-primary"> Verify! </button>
            </div>
        </div>
    )
}

export default VerificationPage
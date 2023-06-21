import { useDropzone } from "react-dropzone";
import bgimage from "../../Assets/uploadimage.svg"
import { useState } from "react";
import Header from "../../Header/header";
import Footer from "../../Footer/footer";
import { updateProfilePicture } from "../../Store/slices/auth/slices";
import { useDispatch } from "react-redux";

function UpdateProfilePicture () {
  const dispatch = useDispatch()
  const [file, setFile] = useState(null);
  
    const onDrop = (acceptedFiles) => {
      console.log(acceptedFiles)
      setFile(acceptedFiles[0])
    }

    const onButtonSave = () => {
      const formData = new FormData();
      formData.append('file',file);
      dispatch(updateProfilePicture(formData));
    }

    const {getRootProps, getInputProps, open} = useDropzone({onDrop, maxFiles:1, accept:{'image/*':[".jpg",".png",".jpeg"]}, noClick:true, noKeyboard:true})

    return (
      <>
        <Header/>
        <div className=' w-screen h-[80vh] flex flex-col drop-shadow-lg p-40 justify-between bg-white md:w-2/6 sm:w-4/6 rounded-md'>
          <p className='text-center font-semibold text-lg md:text-xl mb-2'>Upload your image</p>
          <p className='text-center font-thin text-xs text-slate-400 mb-2'>File should be Jpeg , Png...</p>
          <div  {...getRootProps({className :'md:h-52 sm:h-44 h-auto bg-light-grey border-2 border-light-blue border-dashed rounded-md'})}>
             <input {...getInputProps({name : 'image'})}/>
             <img src={bgimage} className='max-w-1/3 mx-auto mt-4' />
             <p className='text-slate-400 md:text-md text-center mt-4 text-sm'>Drag & Drop your image here</p>
          </div>
          <p className='text-center font-normal text-slate-400 text-md mt-2 mb-2'>Or</p>
          <button onClick={open} className=' bg-sky-600 text-white font-normal p-1 rounded-lg w-auto mx-auto px-4 py-2 text-md'>Choose a file</button>
          <button className="btn btn-primary" onClick={onButtonSave}>Post the image!</button>
        </div>
        <Footer/>
        </>
      )
}

export default UpdateProfilePicture;
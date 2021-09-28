import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CustomToastify ={
  success: (msg)=>{
    toast.success(msg, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: msg,

      
      });
    },
    info: (msg)=>{
      toast.info(msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: msg,
        });
      },
      error: (msg)=>{
        toast.error(msg, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: msg,
          });
        },
      warn: (msg)=>{
        toast.warn(msg, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: msg,
          });
        },
    } 
export default CustomToastify;

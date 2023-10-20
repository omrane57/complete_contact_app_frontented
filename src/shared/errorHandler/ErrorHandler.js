import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import React from 'react'
  









const ErrorHandler = ({error}) => {
         console.log(error)
        enqueueSnackbar(error.message,{varient:"error"})
    
  return (
    <div>
      <SnackbarProvider autoHideDuration={3000}/>
    </div>
  )
}

export default ErrorHandler

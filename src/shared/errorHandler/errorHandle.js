import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React from "react";
function errorHandle(error){
    enqueueSnackbar(error.message,{variant:"error"})
    return(
        <SnackbarProvider autoHideDuration={3000}/>
    )
}
exports.module={errorHandle}
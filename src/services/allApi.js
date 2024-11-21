import CommonApi from "./commonApi"
import serverUrl from "./serverUrl"

// login
export const loginApi=async(reqBody)=>{
    return await CommonApi("POST",`${serverUrl}/login-admin`,reqBody)
}
// all grievances
export const getAllGrievanceApi=async()=>{
    return await CommonApi("GET",`${serverUrl}/all-grievance-hero`,'','')
}

export const getUpdatedGrievanceApi=async(gid,reqBody)=>{
    return await CommonApi("PUT", `${serverUrl}/${gid}/update-grievance`, reqBody);
}

export const getUpdatedStatusApi=async(gid,reqBody)=>{
    return await CommonApi("PUT", `${serverUrl}/${gid}/update-status`, reqBody);
}
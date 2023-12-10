import  {createContext, useState} from 'react'

export const AuthContext =createContext()

const AuthProvider=({children})=>{
    const [accesstoken,setAccestoken]=useState(null)
    const [loggeduser,setLoggeduser]=useState(null)
    
    return(
        <AuthContext.Provider value={{accesstoken,setAccestoken,loggeduser,setLoggeduser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
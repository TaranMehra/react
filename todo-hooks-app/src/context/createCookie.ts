export const createCookieFunc = (email:string)=>{

    try {
        document.cookie = `email=${encodeURIComponent(email)}; max-age=3600; path=/`; 
        return true;
    } catch (error) {
        throw Error("Cookie does not stored ");
    }
     
}

export const getCookieFunc =  (keyName:string)=>{
    const splittCookies = document.cookie.split('; ');

     const cookieValue =  splittCookies.find((cookie)=> cookie.startsWith(`${keyName}=`)); //returns only first matched element
                // why name on $`name`= 
        return cookieValue ? decodeURIComponent(cookieValue.split("=")[1]) : null ;    


}
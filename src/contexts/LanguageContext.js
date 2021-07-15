import {createContext} from "react"
import useLocalStorage from "../hooks/useLocalStorage"
export const langContext=createContext()
export const LangProvider=({children})=>{
    const [lang,setLang]=useLocalStorage("lang","en")
    const toggleLang=(l)=>{
        if(l === undefined){
            if(lang === "en"){
                setLang("fa")
            }
            else{
                setLang("en")
            }
        }
        else{
            setLang(l)
        }
    }
    const langdata={
        langbtn: lang==="fa"?"زبان":"Language",
        signbtn: lang==="fa"?"ثبت نام":"Signup",
        logbtn: lang==="fa"?"ورود":"Login",
        nlbl: lang==="fa"?"نام":"Name",
        nph: lang==="fa"?"نام شما":"your name",
        flbl: lang==="fa"?"نام خانوادگی":"Last name",
        fph: lang==="fa"?"نام خانوادگی شما":"your last name",
        fplbl: lang==="fa"?"شماره تلفن":"Phone number",
        fpph: lang==="fa"?"شماره تلفن شما":"your phone number",
        plbl: lang==="fa"?"رمز":"Password",
        pph: lang==="fa"?"رمز شما":"your password",
        ilbl: lang==="fa"?"ایدی":"Id",
        iph: lang==="fa"?"ایدی شما":"your id",
        pht: lang==="fa"?"رمز باید ۸ حروف داشته باشد":"password must contains 8 letters",
        iht:lang==="fa"?"ایدی باید ۶ حروف داشته باشد":"id must contains 6 letters",
        iplbl:lang==="fa"?"شماره تلفن یا ایدی":"Id or Phone number",
        ipph:lang==="fa"?"ایدی یا شماره شما":"your id or phone",
        head:lang==="fa"?"تلگرام":"Telegram",
        sph:lang==="fa"?"جست و جو":"search",
        cvm:lang==="fa"?"برای شروع چت ایدی سرچ کن":"Search id and start chat",
        dm:lang==="fa"?"حالت تاریک":"Dark mode",
        outbtn:lang==="fa"?"خروج":"Log out",
        chlbtn:lang==="fa"?"تغییر زبان":"Chang language",
        sbtn:lang==="fa"?"ارسال":"send",
        mph:lang==="fa"?"پیام":"message"

    }
    return(
        <langContext.Provider value={{lang,toggleLang,langdata}}>
            {children}
        </langContext.Provider>
    )
}
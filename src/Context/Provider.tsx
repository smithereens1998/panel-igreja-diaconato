import React, { useState , ReactNode } from "react";
import AppContext from "./AppContext";

interface ProviderProps {
  children: ReactNode;
}

export interface ItemScheduling {
  ID: number,
  NOME: string,
  TELEFONE: string,
  ORACAO: string,
  DATA: Date

}
export interface ItemNiver {
  ID: number,
  IMG1: string,
  NOME: string,
  TELEFONE: string,
  ANIVERSARIO: Date,
  

}


export interface ItemHoursCulto {
  ID: number,
  DIA: string,
  HORARIO: string,
  HORARIO2: string,
  CULTO: string

}
export interface ItemLeader {
  ID: number,
  IMG: string,
  NOME: string,
  CARGO: string,
  

}

export interface itemMsgMember {
  ID: number,
  NOME: string,
  EMAIL: string,
  TELEFONE: string,
  MENSAGEM: string,
  DATA: Date
}


export interface itemBarberias {
  ID: number;
  NAMEBARB: string;
}

export interface itemBarber{
  ID: number;
  NOME: string;
  IMG: string;
  MEDIA_AV: number;
  mondayRowCount: number;
  tuesdayRowCount: number;
  wednesdayRowCount: number;
  thursdayRowCount: number;
  fridayRowCount: number;
  saturdayRowCount: number;
}

export interface ImgsPropsCarousel {
  ID: number;
  LOGO: string;
  IMG1: string;
  IMG2: string;
  IMG3: string;
  IMG4: string;
}

export interface ServicesTableProps {
  ID: number;
  SERVICO: string;
  PRECO: number;
  TIME: string;
}
export interface PushId {
  ID: number;
  
}

export interface itemToken {
  TOKEN: string;
  
}

function Provider({ children }: ProviderProps) {

const [usuario , setUsuario] = useState("")
const [senha , setSenha] = useState("")
const [userRestrito , setUserRestrito] = useState("")
const [passRestrito , setPassRestrito] = useState("") 
const [allsToken , setAllsToken] = useState<itemToken[]>([]);

const [scheduling , setScheduling] = useState<ItemScheduling[]>([]);
const [hoursCulto , setHoursCulto] = useState<ItemHoursCulto[]>([]);
const [msgMember , setMsgMember] = useState<itemMsgMember[]>([]);
const [allLeaders , setAllLeaders] = useState<ItemLeader[]>([]);
const [allNiver , setAllNiver] = useState<ItemNiver[]>([]);
const [barbearias , setBarbearias] = useState<itemBarberias[]>([]);
const [getBarber, setGetBarber] = useState<itemBarber[]>([]);
const [pushIdService , setPushIdService] = useState<PushId[]>([]);
const [renderServices , setRenderServices] = useState<ServicesTableProps[]>([]);
const [getImgsCarouselRender, setGetImgsCarouselRender] = useState<ImgsPropsCarousel[]>([]);
const [searchText , setSearchText] = useState("");
const [searchTextNiver , setSearchTextNiver,] = useState("");
const [searchNameBarber , setSearchNameBarber] = useState("");
const [searchNameBarberNiver , setSearchNameBarberNiver] = useState("");
const [searchDate , setSearchDate] = useState("");
const [searchDateMsg , setSearchDateMsg] = useState("");
const [searchDateNiver , setSearchDateNiver] = useState("");
const [ImgNiver , setImgNiver] = useState("");

const [searchBarberLocate , setSearchBarbertLocated] = useState("")
const [image, setImage] = useState("");
const [imageLogo, setImageLogo] = useState(null);
const [img1, setImg1] = useState(null);
const [img2, setImg2] = useState(null);
const [img3, setImg3] = useState(null);
const [img4, setImg4] = useState(null);
const [nameService , setNameService] = useState("");
const [priceService , setPriceService] = useState("");
const [timeService , setTimeService] = useState("");
//valores do modal de cortes porem de update
const [nameServiceEdit , setNameServiceEdit] = useState("");
const [priceServiceEdit , setPriceServiceEdit] = useState("");
const [timeServiceEdit , setTimeServiceEdit] = useState("");
const [imageVideo3, setImageVideo3] = useState("");

const [imageNiver , setImageNiver] = useState("");
const [imageLeader, setImageLeader] = useState("");

const [dayCult, setDayCult] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [typeCult , setTypeCult] = useState("");
  const [idDeleteNiver , setIdDeleteNiver] = useState("");

//URLS get
const [URLGetPray , setURLGetPray] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/prayAll");
const [URLGetNiver , setURLGetNiver] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato//allNiver");
const [URLGetCulto , setURLGetCulto] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/allCulto");
const [URLGetLeader, setURLGetLeader] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/allLeader");
const [URLGetFaleConosco, setURLGetFaleConosco] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/allFaleConosco");

//URLS put

const [URLPutArtigo1, setURLPutArtigo1] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/upArtigo");
const [URLPutArtigo2, setURLPutArtigo2] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/upArtigo2");
const [URLPutArtigo3, setURLPutArtigo3] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/upArtigo3");


const [URLPutNotice, setURLPutNotice] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/noticia");
const [URLPutNotice2, setURLPutNotice2] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/noticia2");
const [URLPutNotice3, setURLPutNotice3] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/noticia3");


const [URLPutVideo, setURLPutVideo] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/video");
const [URLPutVideo2, setURLPutVideo2] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/video2");
const [URLPutVideo3, setURLPutVideo3] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/video3");


const [URLPutGallery, setURLPutGallery] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/galeria");
const [URLPutGallery2, setURLPutGallery2] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/galeria2");
const [URLPutGallery3, setURLPutGallery3] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/galeria3");

//URLS Delete

const [URLDeleteArtigo1, setURLDeleArtigo1] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteArtigo");
const [URLDeleteArtigo2, setURLDeleArtigo2] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteArtigo2");
const [URLDeleteArtigo3, setURLDeleArtigo3] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteArtigo3");


const [URLDeleteUniqueNiver, setURLDeleUniqueNiver] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteNiver");
const [URLDeleteUniquePray, setURLDeleUniquePray] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteAllPray");
const [URLDeleteUniqueLeader, setURLDeleUniqueLeader] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteLeader");
const [URLDeleteUniqueCulto, setURLDeleUniqueCulto] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteCult");


const [URLDeleteNotice, setURLDeleteNotice] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteNoticia");
const [URLDeleteNotice2, setURLDeleteNotice2] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteNoticia2");
const [URLDeleteNotice3, setURLDeleteNotice3] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteNoticia3");

const [URLDeleteVideo, setURLDeleteVideo] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteVideo");
const [URLDeleteVideo2, setURLDeleteVideo2] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteVideo2");
const [URLDeleteVideo3, setURLDeleteVideo3] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteVideo3");


const [URLDeleteGaleria, setURLDeleteGaleria] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteGaleria");
const [URLDeleteGaleria2, setURLDeleteGaleria2] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteGaleria2");
const [URLDeleteGaleria3, setURLDeleteGaleria3] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/deleteGaleria3");


//URLS POST

const [URLPostNiver, setURLPostNiver] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/createNiver");
const [URLPostHoursCulto, setURLPostHoursCulto] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/createCult");
const [URLPostLeader, setURLPostLeader] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/createLeader");

//URL Notification
const [URLNotification, setURLNotification] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/notify");
const [URLToken , setUrlToken] = useState("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/getToken");



const contextValue = {
//contexto valores 
usuario , setUsuario,
senha , setSenha,
scheduling , setScheduling,
barbearias , setBarbearias,
searchText , setSearchText,
searchTextNiver , setSearchTextNiver,
searchNameBarber , setSearchNameBarber,
searchNameBarberNiver , setSearchNameBarberNiver,
searchDateNiver , setSearchDateNiver,
searchDate , setSearchDate,
ImgNiver , setImgNiver,
searchBarberLocate , setSearchBarbertLocated,
userRestrito , setUserRestrito,
passRestrito , setPassRestrito,
getBarber, setGetBarber,
image, setImage,
imageLogo, setImageLogo,
//Imagens do carousel do aplicativo
img1, setImg1,
img2, setImg2,
img3, setImg3,
img4, setImg4,
getImgsCarouselRender, setGetImgsCarouselRender,
nameService , setNameService,
priceService , setPriceService,
timeService , setTimeService,
renderServices , setRenderServices,
pushIdService , setPushIdService,
nameServiceEdit , setNameServiceEdit,
priceServiceEdit , setPriceServiceEdit,
timeServiceEdit , setTimeServiceEdit,
allNiver , setAllNiver,
URLGetPray , setURLGetPray,
URLGetLeader, setURLGetLeader,
URLGetCulto , setURLGetCulto,
URLPutArtigo1, setURLPutArtigo1,
URLGetNiver , setURLGetNiver,
URLPutArtigo2, setURLPutArtigo2,
URLPutArtigo3, setURLPutArtigo3,
URLPutNotice, setURLPutNotice,
URLPutNotice2, setURLPutNotice2,
URLPutNotice3, setURLPutNotice3,
URLPutVideo, setURLPutVideo,
URLPutVideo2, setURLPutVideo2,
URLPutVideo3, setURLPutVideo3,
URLPutGallery, setURLPutGallery,
URLPutGallery2, setURLPutGallery2,
URLPutGallery3, setURLPutGallery3,
imageVideo3, setImageVideo3,
hoursCulto , setHoursCulto,
allLeaders , setAllLeaders,

imageNiver , setImageNiver,
dayCult, setDayCult,
timeStart, setTimeStart,
timeEnd, setTimeEnd,
typeCult , setTypeCult,
imageLeader, setImageLeader,
URLPostLeader, setURLPostLeader,

URLDeleteArtigo1, setURLDeleArtigo1,
URLDeleteArtigo2, setURLDeleArtigo2,
URLDeleteArtigo3, setURLDeleArtigo3,

URLDeleteNotice, setURLDeleteNotice,
URLDeleteNotice2, setURLDeleteNotice2,
URLDeleteNotice3, setURLDeleteNotice3,

URLDeleteVideo, setURLDeleteVideo,
URLDeleteVideo2, setURLDeleteVideo2,
URLDeleteVideo3, setURLDeleteVideo3,

URLDeleteGaleria, setURLDeleteGaleria,
URLDeleteGaleria2, setURLDeleteGaleria2,
URLDeleteGaleria3, setURLDeleteGaleria3,

URLPostNiver, setURLPostNiver,
URLPostHoursCulto, setURLPostHoursCulto,

URLDeleteUniqueNiver, setURLDeleUniqueNiver,
idDeleteNiver , setIdDeleteNiver,
URLDeleteUniquePray, setURLDeleUniquePray,
URLDeleteUniqueLeader, setURLDeleUniqueLeader,
URLDeleteUniqueCulto, setURLDeleUniqueCulto,
URLGetFaleConosco, setURLGetFaleConosco,
msgMember , setMsgMember,
searchDateMsg , setSearchDateMsg,
URLNotification, setURLNotification,
allsToken , setAllsToken,
URLToken , setUrlToken
}
  
  return (
    <AppContext.Provider value={contextValue} >
      {children}
    </AppContext.Provider>
  )
}


export default Provider;
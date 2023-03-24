//Interfaces
import { IPages, IScreens, IScreen } from "../interfaces";


// -----
// Global
// -----
declare global {
    interface Window { 
        getScreenDetails: () => IScreens,
    }
    interface Screen{
        availLeft: number,
        availTop: number
    }
}


// -----
// Type
// -----
type GetScreensInfoReturnType = IScreen[] | null ;

// -----
// Variable
// -----

let popups = [];
let popupMonitor = null;
let cachedScreens : IScreens | null = null;


// -----
// Functions
// -----

export const getScreensInfo = async () : Promise<GetScreensInfoReturnType> => {
    const isSupported = "getScreenDetails" in window ;

    const defaultObj = {
        availHeight: window.screen.availHeight,
        availLeft: window.screen.availLeft,
        availTop: window.screen.availTop,
        availWidth: window.screen.availWidth,
        label:  null,
    }

    if(isSupported){
        if (cachedScreens) {
            return cachedScreens.screens;
        } else {
            try{
            const cachedScreens = await window.getScreenDetails();
            if(!cachedScreens){
              return cachedScreens;
            }
            return cachedScreens.screens;
            }catch(e){
               return null;
            }
        }
    }else{
        return [defaultObj];
    }
}
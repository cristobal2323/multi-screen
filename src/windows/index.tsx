
import { FC, useRef, useEffect, useMemo } from 'react';
import NewWindow from 'react-new-window'
//import TestComponent from './test';

interface Props {
    title: string;
    isWindow?: boolean;
    onUnload: () => void,
    component: React.ReactElement,
    savePosition: boolean,
    features: {
        left: number,
        top: number,
        width: number,
        height: number
    }
}

type IWindow = {
    screenX: string;
    screenY: string;
    title: string;
};

const getNested = (obj: any, args: string[], defaultValue = null) : IWindow | null => {
    const val : IWindow | null = args.reduce((obj, level) => obj && obj[level], obj) || null;
    const result : IWindow | null = val == undefined ? defaultValue : val;
    return result;
}


const WindowComponent: FC<Props> = ({title, features, onUnload, component, isWindow = true, savePosition}) => {
    const refComponent = useRef(null);

    if(!isWindow){
        return <>{component}</>
    }

    useEffect(() => {
        const myWindow = getNested(refComponent,["current","window"]);
        if(myWindow && savePosition){
            let oldX = myWindow.screenX;
            let oldY = myWindow.screenY;
            const interval = setInterval(function () {
                if (oldX != myWindow.screenX || oldY != myWindow.screenY) {
                    const screens = localStorage.getItem("screens");
                    const data: IWindow[] | undefined = screens ? JSON.parse(screens) : [];
                    const newdata: IWindow[] = data === undefined ? [] : data

                    const index : number = newdata.findIndex((o)=> o.title === title);
                    
                    if(index > -1){
                        newdata.splice(index, 1);
                        const obj = { screenX: myWindow.screenX, screenY: myWindow.screenY, title: title };
                        newdata.push(obj)
                        localStorage.setItem("screens", JSON.stringify(newdata)); 
                    }else{
                        const obj = { screenX: myWindow.screenX, screenY: myWindow.screenY, title: title };
                        newdata.push(obj)
                        localStorage.setItem("screens", JSON.stringify(newdata)); 
                    }
                 
                } else {
                  console.log('not moved!', myWindow);
                }
          
                oldX = myWindow.screenX;
                oldY = myWindow.screenY;
              }, 3000);

            return () => {
                clearInterval(interval);
            };
        }
      }, [])
    
    const saveFeatures = useMemo(
        () => {
            const screens = localStorage.getItem("screens");
            const data: IWindow[] | undefined = screens ? JSON.parse(screens) : [];
            const newdata: IWindow[] = data === undefined ? [] : data
            const obj : IWindow | undefined = newdata.find((o)=> o.title === title);
            
            if(obj && savePosition){
                return {...features, left : obj.screenX, top: obj.screenY}
            }else{
                return {...features}
            }

        },
        [savePosition]
    );

    return (
        <NewWindow
            ref={refComponent} 
            title={title} 
            // @ts-expect-error
            center={false}
            onUnload={onUnload}
            features={saveFeatures}>
            <div onClick={()=> console.debug("kounde",getNested(refComponent,["current","window"]))}>
                {component}
            </div>
        </NewWindow>
    )
}

export default WindowComponent;
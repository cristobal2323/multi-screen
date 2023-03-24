
import { FC } from 'react';
import NewWindow from 'react-new-window'
//import TestComponent from './test';

interface Props {
    title: string;
    isWindow?: boolean;
    onUnload: () => void,
    component: React.ReactElement,
    features: {
        left: number,
        top: number,
        width: number,
        height: number
    }
}


const WindowComponent: FC<Props> = ({title, features, onUnload, component, isWindow = true}) => {
    if(!isWindow){
        return <>{component}</>
    }

    return (
        <NewWindow
            title={title} 
            center={false} 
            onUnload={onUnload}
            features={{ ...features }}>
            <div>
                {component}
            </div>
        </NewWindow>
    )
}

export default WindowComponent;
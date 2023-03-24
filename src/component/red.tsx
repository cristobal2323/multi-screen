
import { FC } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';

interface Props {
    state? : {
        isWindow: boolean;
        closeWindow?: () => void,
        message?: string;
    },
}


export const RedComponent: FC<Props> = ({state}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const stateFinal = location.state || state;
    return (
        <div id="container" className="bg-red-500 w-full h-screen">
            {
                stateFinal?.message &&
                <h1>{stateFinal.message}</h1>
            }
            {
                stateFinal?.isWindow === true &&
                <button  
                    className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={() => stateFinal.closeWindow && stateFinal.closeWindow()}>
                    Close window 
                </button>
            }
            {
                stateFinal?.isWindow === false &&
                <button  
                    className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={() => navigate(stateFinal.goBack)}>
                    Go back
                </button> 
            }
        </div>
    )
}


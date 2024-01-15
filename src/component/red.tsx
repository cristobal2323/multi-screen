
import { FC } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import { useMonitor } from '../context/monitorContext';

interface Props {
    state? : {
        isWindow: boolean;
        closeWindow?: () => void,
        message?: string;
        onchangeForm : (index: number, attr: string, value: string) => void,
        index: number
    },
}


export const RedComponent: FC<Props> = ({state}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {setTest, test} = useMonitor();
    const stateFinal = location.state || state;
    
    return (
        <div id="container" className="bg-red-500 w-full h-screen">
            {
                stateFinal?.message &&
                <>
                    <h1>{stateFinal.message}</h1>
                    <input type="text" id="default-input" onChange={(e) => setTest(e.target.value)} value={test} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </>
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


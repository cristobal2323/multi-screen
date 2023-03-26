
import { FC, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import WindowComponent from "../windows"


interface Props {
    state?: {
        isWindow: boolean;
        closeWindow?: () => void
        message?: string;
    },
}


export const YellowComponent: FC<Props> = ({ state }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const stateFinal = location.state || state;

    const [open, setOpen] = useState<boolean>(false)



    return (
        <div id="container" className="bg-yellow-500 w-full h-screen">
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
            <div>
                <button
                    className="bg-orange-500 mt-5 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setOpen(true === open ? false : true)}>
                    {!open ? "Open window" : "Close window"}
                </button>
            </div>
            {

                open &&
                <WindowComponent
                    onUnload={() => setOpen(false)}
                    isWindow={true}
                    savePosition={false}
                    component={<div><h1>New window</h1></div>}
                    features={{ left: 0, top: 0, width: 300, height: 300 }}
                    title={`window test`}
                />
            }
        </div>
    )
}


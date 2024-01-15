import { useState, useEffect } from 'react'
import { Navigate} from "react-router-dom";


// interfaces
import { IScreen } from "./interfaces"

// utilities
import { getScreensInfo } from "./utilities/handle-screen"

// component
import WindowComponent from "./windows"
import { RedComponent, GreenComponent, BlueComponent } from "./component"

import './App.css'
import { useMonitor } from './context/monitorContext';


type Form = {
  component: string;
  isWindow: string;
  size: string,
  message: string,
  savePosition: string
};

function App() {
  const [monitors, setMonitors] = useState<IScreen[] | null>([]);
  const [isOpen, setIsOpen] = useState<Boolean[]>([]);
  const [form, setForm] = useState<Form[]>([]);
  const { test, setTest} = useMonitor();



  useEffect(() => {
    const fetchData = async () => {
      const data = await getScreensInfo();
      if (Array.isArray(data)) {
        setMonitors(data);
        const values: Boolean[] = [];
        const valuesForm: Form[] = [];
        data.forEach(() => {
          values.push(false);
          valuesForm.push({ component: "red", isWindow: "yes", size: "small", message: "Hi :)", savePosition: "yes" })
        })
        setForm(valuesForm)
        setIsOpen(values)
      }else{
        setMonitors(null)
      }
    }

    if(Array.isArray(monitors)){
      if(monitors.length === 0){
        fetchData();
      }
    }

  }, [monitors])

  const openWindow = (index: number) => {
    const cloneIsOpen: Boolean[] = [...isOpen];
    cloneIsOpen[index] = true;
    setIsOpen(cloneIsOpen)
  }

  const closeWindow = (index: number) => {
    const cloneIsOpen: Boolean[] = [...isOpen];
    cloneIsOpen[index] = false;
    setIsOpen(cloneIsOpen)
  }

  const onchangeForm = (index: number, attr: string, value: string) => {
    const cloneForm: Form[] = [...form];
    if (attr === "component" || attr === "isWindow"  || attr === "size" || attr === "message"  || attr === "savePosition" ) {
      cloneForm[index][attr] = value;
    }
    setForm(cloneForm);
  }

  const selectComponent = (isWindow:boolean, component: string, index: number) : React.ReactElement => {
    if(isWindow){
      if(component === "red"){
        return <RedComponent state={{isWindow, closeWindow:()=>closeWindow(index), message: form[index].message, onchangeForm: onchangeForm, index: index}} />
      }else if(component === "blue"){
        return <BlueComponent state={{isWindow, closeWindow:()=>closeWindow(index), message: form[index].message}} />
      }else{
        return <GreenComponent state={{isWindow, closeWindow:()=>closeWindow(index), message: form[index].message}} />
      }
    }
    return <Navigate to={`/${component}`} replace={true} state={{ isWindow, goBack: "/", message: form[index].message }} />
  }

  const selectSize = (size:string, max: number) : number =>{
    if(size === "small"){
      return 400;
    } else if(size === "medium"){
      return 600;
    }

    return max;
  }

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline mb-10">My Monitors { test }</h1>
      <input type="text" id="default-input" onChange={(e) => setTest(e.target.value)} value={test} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      {
        monitors !== null ?
        <div className="flex justify-center gap-3">
          {
            monitors.map((element, i) => {
              return (
                <div key={i} className="flex flex-col p-5 min-w-[50%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Monitor {i + 1} - ({element.label || "N/A"})</h5>
                  <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      availHeight : {element.availHeight}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      availLeft : {element.availLeft}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      availTop : {element.availTop}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      availWidth : {element.availWidth}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      Primary : {element.isPrimary ? "Yes" : "No"}
                    </li>
                  </ul>

                  <div className="flex mt-5 items-center first-letter">
                    <label htmlFor="years" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white min-w-[110px]">Open</label>
                    <select id="years" onChange={(e) => onchangeForm(i, "isWindow", e.target.value)} value={form[i].isWindow} size={1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="yes">New window</option>
                      <option value="no">New route</option>
                    </select>
                  </div>

                  <div className="flex mt-5 items-center first-letter">
                    <label htmlFor="years" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white min-w-[110px]">Component</label>
                    <select id="years" onChange={(e) => onchangeForm(i, "component", e.target.value)} value={form[i].component} size={1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="red">Red component</option>
                      <option value="blue">Blue component</option>
                      <option value="green">Green component</option>
                    </select>
                  </div>
                  <div className="flex mt-5 items-center first-letter">
                    <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white min-w-[110px]">Write a message</label>
                    <input type="text" id="default-input" onChange={(e) => onchangeForm(i, "message", e.target.value)} value={form[i].message} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  {
                  form[i].isWindow === "yes" &&
                  <>
                    <div className="flex mt-5 items-center first-letter">
                      <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white min-w-[110px]">Size window</label>
                      <select id="size" onChange={(e) => onchangeForm(i, "size", e.target.value)} value={form[i].size} size={1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="small">400 x 400 small</option>
                        <option value="medium">600 x 600 medium</option>
                        <option value="large">Max x Max large</option>
                      </select>
                    </div>
                    <div className="flex mt-5 items-center first-letter">
                      <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white min-w-[110px]">Save position</label>
                      <select id="position" onChange={(e) => onchangeForm(i, "savePosition", e.target.value)} value={form[i].savePosition} size={1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </>
                  }

                  <button onClick={() => isOpen[i] ? closeWindow(i) : openWindow(i)} className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {isOpen[i] ? "Close window" : "Open window"}
                  </button>
                  {
                    isOpen[i] &&
                    <WindowComponent
                      onUnload={() => closeWindow(i)}
                      savePosition={form[i].savePosition === "yes"}
                      isWindow={form[i].isWindow === "yes"}
                      component={selectComponent(form[i].isWindow === "yes", form[i].component, i)}
                      features={{ left: element.availLeft, top: element.availTop, width: selectSize(form[i].size,element.availWidth), height:selectSize(form[i].size,element.availHeight)}}
                      title={`window ${i}`}
                    />
                  }
                </div>
              )
            })
          }
        </div> :        
        <div className="flex justify-center "> 
          <button onClick={()=>setMonitors([])} className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Allow windows management
          </button>
        </div>
      }
    </div>
  )
}

export default App

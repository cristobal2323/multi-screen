import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";

export interface MonitorProviderProps {
  test: string;
  setTest: (newValue: string) => void;
}

export const MonitorContext = createContext<MonitorProviderProps>({
  test: "",
  setTest: () => {},
});

interface MonitorProviderComponentProps {
  children: ReactNode;
}

export const MonitorProvider: FC<MonitorProviderComponentProps> = ({
  children,
}) => {
  const [test, setTest] = useState("");

  const updateTest = (newTest: string) => {
    setTest(newTest);
  };

  return (
    <MonitorContext.Provider
      value={{ test, setTest: updateTest }}
      data-e2e="template-repository-provider"
    >
      {children}
    </MonitorContext.Provider>
  );
};

export const useMonitor = () => useContext(MonitorContext);

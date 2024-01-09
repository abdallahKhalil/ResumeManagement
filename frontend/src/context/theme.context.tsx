import { createContext, useState } from "react";

//creating an interface
interface IThemeContextInterface {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

//creating an context object the takes the IThemeContextInterface as a param
export const ThemeContext = createContext<IThemeContextInterface>({
  darkMode: false,
  toggleDarkMode: () => {},
});

interface IThemeContextInterfaceProps{
    children: React.ReactNode;
  }


const ThemeContextProvider = ({ children } : IThemeContextInterfaceProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode: () => void = () => {
    setDarkMode((prevState) => !darkMode);
  };


  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

import React, { Dispatch, ReactNode, SetStateAction, createContext, useLayoutEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { useAppColorScheme } from 'twrnc';
import { themeHandler } from '../helpers/token';
import tw from '../lib/tailwind';

type RootContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  themeValue: 'light' | 'dark' | null | undefined;
  setTheme: (value: "light" | "dark") => Promise<void>;
}

export const C = createContext<RootContextType>({
  user: null,
  setUser: () => null,
  themeValue: null,
  setTheme: () => Promise.resolve()
});

export type User = {
  _id: string;
  username: string;
  name: string;
  email: string;
  image: string;
}

const RootContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // const [themeValue, setThemeValue] = useState('');
  const [themeValue, __, setColorScheme] = useAppColorScheme(tw);
  const userTheme = useColorScheme(); // user device theme


  useLayoutEffect(() => {
    (async () => {
      const theme = await themeHandler.getTheme("theme");

      if (!theme) {
        themeHandler.saveTheme("theme", userTheme || "dark");
        // setThemeValue(userTheme || "dark");
        setColorScheme(userTheme || "dark");
        return;
      }

      // setThemeValue(theme);
      setColorScheme(theme as "light" | "dark");
    })();
  }, [userTheme]);

  const setTheme = async (theme: "light" | "dark") => {
    // setThemeValue(theme);
    setColorScheme(theme);
    await themeHandler.saveTheme("theme", theme);
  }

  return (
    <C.Provider value={{ user, setUser, themeValue, setTheme }}>
      {children}
      <StatusBar
        barStyle={themeValue === "dark" ? 'light-content' : "dark-content"}
      />
    </C.Provider>
  )
}

export default RootContext
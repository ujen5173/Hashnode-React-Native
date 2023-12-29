import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

type RootContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>
}

export const C = createContext<RootContextType>({
  user: null,
  setUser: () => null
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

  return (
    <C.Provider value={{ user, setUser }}>
      {children}
    </C.Provider>
  )
}

export default RootContext
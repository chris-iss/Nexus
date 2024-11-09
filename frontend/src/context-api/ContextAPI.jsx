import { createContext, useState } from "react";
import axios from "axios";


export const NexusContext = createContext();

export const NexusProvider = ({children}) => {


    return (
        <NexusContext.Provider value={{ }}>
            {children}
        </NexusContext.Provider>
    )
}
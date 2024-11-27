/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { supabase } from "../supaClient";


export const NexusContext = createContext();

// eslint-disable-next-line react/prop-types
export const NexusProvider = ({children}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggle = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <NexusContext.Provider value={{isModalOpen, setIsModalOpen, handleToggle}}>
            {children}
        </NexusContext.Provider>
    )
}
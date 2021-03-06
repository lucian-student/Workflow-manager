import React, { useEffect, useState, useRef, useContext } from "react";
import { MenuContext } from '../context/menu';


export interface DropdownProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    open: boolean,
    menuRef: React.MutableRefObject<HTMLDivElement>
}

export function useStackingMenu(): DropdownProps {


    const [open, setOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const ctx = useContext(MenuContext);

    useEffect(() => {
        const hadleClickOutside = (event) => {
            if (event.target instanceof Element && !ctx.open) {
                if (!menuRef.current.contains(event.target)) {
                    //console.log('closing');
                    setOpen(false);
                }
            }
        };

        const handleEscape = (event) => {
            if (event.keyCode === 27 && !ctx.open) {
                setOpen(false);
                //  console.log('closing');
            }
        };

        document.addEventListener('keydown', handleEscape)
        document.addEventListener('mousedown', hadleClickOutside);
        return () => {
            document.removeEventListener('mousedown', hadleClickOutside);
            document.removeEventListener('keydown', handleEscape)
        }
    }, [ctx.open]);

    return { menuRef, open, setOpen };
}
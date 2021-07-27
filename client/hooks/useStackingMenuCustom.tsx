import React, { useEffect,useContext, useRef } from "react";
import { MenuContext } from '../context/menu';

export interface DropdownProps {
    menuRef: React.MutableRefObject<HTMLDivElement>
}

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function useStackingMenuCustom({ setOpen }: Props): DropdownProps {

    const menuRef = useRef<HTMLDivElement>(null);
    const ctx = useContext(MenuContext);

    useEffect(() => {
        const hadleClickOutside = (event) => {
            if (event.target instanceof Element) {
                if (!menuRef.current) return;
                if (!menuRef.current.contains(event.target)&& !ctx.open) {
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

    return { menuRef };
}
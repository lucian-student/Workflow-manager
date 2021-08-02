import React, { useEffect, useRef } from "react";

export interface DropdownProps {
    menuRef: React.MutableRefObject<HTMLDivElement>,
    toggleButtonRef: React.MutableRefObject<HTMLButtonElement>
}

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function useTwoPartMenuCustom({ setOpen }: Props): DropdownProps {

    const menuRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const hadleClickOutside = (event) => {
            if (event.target instanceof Element) {
                if (!menuRef.current) return;
                if (!toggleButtonRef.current) return;
                if (
                    !menuRef.current.contains(event.target) &&
                    !toggleButtonRef.current.contains(event.target
                    )) {
                    //console.log('closing');
                    setOpen(false);
                }
            }
        };

        const handleEscape = (event) => {
            if (event.keyCode === 27) {
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
    }, []);

    return { menuRef, toggleButtonRef };
}
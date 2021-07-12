import React, { useEffect, useState, useRef } from "react";


interface DropdownProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    open: boolean,
    menuRef: React.MutableRefObject<HTMLDivElement>
}

export function useDropDownMenu(): DropdownProps {

    const [open, setOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hadleClickOutside = (event) => {
            if (event.target instanceof Element) {
                if (!menuRef.current.contains(event.target)) {
                    console.log('closing');
                    setOpen(false);
                }
            }
        };

        const handleEscape = (event) => {
            if (event.keyCode === 27) {
                setOpen(false);
                console.log('closing');
            }
        };

        document.addEventListener('keydown', handleEscape)
        document.addEventListener('mousedown', hadleClickOutside);
        return () => {
            document.removeEventListener('mousedown', hadleClickOutside);
            document.removeEventListener('keydown', handleEscape)
        }
    }, []);

    return { menuRef, open, setOpen };
}
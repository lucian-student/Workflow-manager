import { useState, useEffect } from 'react';
/*
hak co vrati dimenze obrazovky
*/
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height, outerHeight } = window;
    return {
        width,
        height: height > outerHeight ? outerHeight : height
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
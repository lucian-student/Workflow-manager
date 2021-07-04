import React from "react";
import withAuth from '../components/hoc/withAuth';
import { useHelloLazyQuery } from '../generated/apolloComponents';

function Main() {
    const [helloQuery] = useHelloLazyQuery({
        onError(err) {
            console.log(err.message);
        },
        onCompleted(data) {
            console.log(data);
        }
    });

    function helloHandle() {
        helloQuery();
    }


    return (
        <div>
            <button style={{ color: "black" }} onClick={helloHandle}>hello</button>
        </div>
    )
}


export default withAuth(Main);
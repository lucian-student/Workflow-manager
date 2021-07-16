import React from "react";
import { List } from '../../generated/apolloComponents';

interface Props {
    lists: List[]
}

function ListDisplay({ lists }: Props): JSX.Element {

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <div style={{
                display: 'flex',
                minWidth: 'fit-content',
                height: '100%',
                alignItems: 'stretch',
                justifyContent: 'space-around',
                paddingLeft: '5px',
                paddingRight: '5px'
            }}>
                {lists.map(list => (
                    <div key={list.list_id} style={{
                        width: '400px',
                        height: 'calc(100% - 20px)',
                        backgroundColor: 'black',
                        marginTop: '10px',
                        marginBottom: '10px',
                        marginLeft: '5px',
                        marginRight: '5px'
                    }}>
                        dasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </div>
                ))}
            </div>
        </div>
    )
}


export default ListDisplay;
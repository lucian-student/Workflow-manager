import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../../components/hoc/withAuth';
import { useGetProjectQuery } from '../../../generated/apolloComponents';
import Background from '../../../components/Layout/Background';

interface Props {
    project_id?: string,
    team_id?: string
}

function ProjectPage(): JSX.Element {

    const [lists, setLists] = useState<any[]>([]);
    const router = useRouter();
    const { project_id, team_id }: Props = router.query;


    const { data, loading, error } = useGetProjectQuery({
        variables: {
            project_id: Number(project_id),
            team_id: Number(team_id)
        },
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        console.log(data);
        if (data) {
            setLists(data.getProject.lists);
        }

    }, [data])

    if (loading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if (error) {
        return (
            <div>
                {error.message}
            </div>
        )
    }

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <Background />
            <div style={{ width: '100%', height: '100%', overflow: 'auto', scrollSnapType: 'x mandatory'  }}>
                <div style={{ display: 'flex',height:'100%' ,alignItems: 'stretch' }}>
                    <div style={{ width: '400px',height:'calc(100% - 100px)', backgroundColor: 'black', margin: '50px' }}>
                        dasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </div>
                    <div style={{ width: '400px', backgroundColor: 'black', margin: '50px' }}>
                        dasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </div>
                    <div style={{ width: '400px', backgroundColor: 'black', margin: '50px' }}>
                        dasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </div>
                    <div style={{ width: '400px', backgroundColor: 'black', margin: '50px' }}>
                        dasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </div>
                    <div style={{ width: '400px', backgroundColor: 'black', margin: '50px' }}>
                        dasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </div>
                </div>
            </div>
        </div>
    )

}

export default withAuth(ProjectPage);
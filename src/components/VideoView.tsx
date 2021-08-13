import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {useUser} from "../user-context";

const fetchVideo = (token: string, id: number, isLogged: boolean) => {
    return fetch('https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            MediaId: id,
            StreamType: isLogged ? 'MAIN' : 'TRIAL'
        })
    })
}

export const VideoView: React.FC = () => {
    const { token, unsetUser } = useUser()
    const { id } = useParams<{ id:string }>()
    const [videoUrl, setVideoUrl] = useState<string>()

    useEffect(() => {
        if(!token) return

        (async () => {
            const response = await fetchVideo(token, parseInt(id, 10), false)
            if(response.ok) {
                const { Url } = await response.json()
                setVideoUrl(Url)
            } else {
                unsetUser()
                sessionStorage.removeItem('token')
            }
        })()
    }, [])

    return (
        <div>
            <video src={videoUrl} />
        </div>
    )
}

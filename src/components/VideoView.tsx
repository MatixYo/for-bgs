import React, {useEffect, useState} from 'react'
import {useParams, Link} from "react-router-dom";
import {useUser} from "../user-context";
import ReactHlsPlayer from 'react-hls-player'

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
    const [video, setVideo] = useState<any>()
    const playerRef = React.useRef(null);

    useEffect(() => {
        if(!token) return

        (async () => {
            const response = await fetchVideo(token, parseInt(id, 10), false)
            if(response.ok) {
                const video = await response.json()
                setVideo(video)
            } else {
                unsetUser()
                sessionStorage.removeItem('token')
            }
        })()
    }, [])

    return (
        <div className="min-h-screen flex justify-center items-center">
            {video && (
                <div className="mx-auto w-4/6">
                    <Link to="/" className="inline-block mb-4 mr-auto bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
                        &#5176; Powrót
                    </Link>
                    <div className="relative group">
                        <div className="absolute bg-black bg-opacity-50 text-white text-2xl w-full py-3 z-30 transition-all opacity-0 group-hover:opacity-100">{video.Title}</div>
                        <ReactHlsPlayer
                            src={video.ContentUrl}
                            autoPlay={true}
                            controls={true}
                            width="100%"
                            height="auto"
                            playerRef={playerRef}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

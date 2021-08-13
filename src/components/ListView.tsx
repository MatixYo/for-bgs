import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import {useUser} from "../user-context";

interface Image {
    Url: string,
    ImageTypeCode: string,
}

interface Entity {
    Id: string,
    Title: string,
    Images: Image[],
}

const fetchEntities = (token: string, listId: number = 2, pageNumber: number = 1, pageSize: number = 15) => {
    return fetch('https://thebetter.bsgroup.eu/Media/GetMediaList', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "MediaListId": 2,
            "IncludeCategories": false,
            "IncludeImages": true,
            "IncludeMedia": false,
            "PageNumber": 1,
            "PageSize": 15
        })
    });
}

export const ListView: React.FC = () => {
    const { token, unsetUser } = useUser()
    const [items, setItems] = useState<Entity[]>([])

    useEffect(() => {
        if(!token) return

        (async () => {
            const response = await fetchEntities(token)
            if(response.ok) {
                const { Entities } = await response.json()
                setItems(Entities)
            } else {
                unsetUser()
                sessionStorage.removeItem('user')
            }
        })()
    }, [token, unsetUser])

    return (
        <div className="pt-8 pb-48">
            {items?.length > 0 && items.map(item => (
                <Link to={`/video/${item.Id}`} key={item.Id} className="block relative w-2/4 mx-auto mt-8 cursor-pointer rounded-lg overflow-hidden transition-all transform hover:scale-105">
                    <div className="absolute bg-black bg-opacity-80 text-white text-2xl w-full py-3">{item.Title}</div>
                    <img
                        src={(item?.Images?.find(i => i!.ImageTypeCode === 'FRAME'))?.Url}
                        className="w-full"
                    />
                </Link>
            ))}
        </div>
    )
}

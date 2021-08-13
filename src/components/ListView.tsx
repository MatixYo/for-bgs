import React, {useEffect, useState} from "react";
import {useUser} from "../user-context";

interface Image {
    Url: string,
    ImageTypeCode: string,
}

interface Entity {
    Id: string,
    title: string,
    Images: Image[],
}

export const ListView: React.FC = () => {
    const { token } = useUser()
    const [items, setItems] = useState<Entity[]>([])

    useEffect(() => {
        if(!token) return

        fetch('https://thebetter.bsgroup.eu/Media/GetMediaList', {
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
        }).then(r => r.json()).then(response => {
            const { Entities } = response
            setItems(Entities)
        })
    }, [token])

    return (
        <div>
            {items.map(item => (
                <div key={item.Id}>
                    <span>{item.title}</span>
                    <img src={item.Images && (item!.Images!.find(i => i!.ImageTypeCode === 'FRAME')).Url} />
                </div>
            ))}
        </div>
    )
}

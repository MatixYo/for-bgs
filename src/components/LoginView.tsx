import React from 'react'
import {useUser} from "../user-context";

interface Credentials {
    username: string,
    password: string,
}

export const LoginView: React.FC = () => {
    const { setUser, token } = useUser()

    const login = async (user?: Credentials) => {
        const response = await fetch('https://thebetter.bsgroup.eu/Authorization/SignIn', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user ? user : {})
        }).then(r => r.json())

        const token = response.AuthorizationToken?.Token

        if(token) {
            sessionStorage.setItem('token', token);
            setUser(token);
        } else console.log('blad')
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { username, password } = e.target as any;

        return login({
            username: username.value,
            password: password.value,
        });
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-96" onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                        Login
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username"
                           type="text" placeholder="Username" />
                </div>
                <div className="mb-6">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                        Hasło
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                        id="password" type="password" placeholder="******************" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" type="button" onClick={() => login()}>
                        Anonimowe logowanie
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded" type="submit">
                        Zaloguj
                    </button>
                </div>
            </form>
        </div>
    )
}

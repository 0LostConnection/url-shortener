import React, { useState } from "react"

export default function Home() {
    const [originalLink, setOriginalLink] = useState("")
    const [shortenedLink, setShortenedLink] = useState("")
    const [apiKey, setApiKey] = useState("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const rawResponse = await fetch("/api/create-link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": apiKey
                },
                body: JSON.stringify({
                    link: originalLink as string
                }),
            })
            const response = await rawResponse.json()

            if (response.code === 401) return alert("A Chave da API entregue é inválida!")

            setShortenedLink(response.data?.shortUrl || "??")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="Container">
            <h1>Encurtador de <u>URL</u></h1>
            <form onSubmit={handleSubmit} className="Form">
                <label className="Title" htmlFor="originalLink">Link Original: </label>
                <input
                    type="text"
                    name="originalLink"
                    id="originalLink"
                    value={originalLink}
                    onChange={(event) => setOriginalLink(event.target.value)}
                />

                <label className="Title" htmlFor="apiKey">Api Key:</label>
                <input
                    type="text"
                    name="apiKey"
                    id="apiKey"
                    value={apiKey}
                    onChange={(event) => setApiKey(event.target.value)}
                />
                <button type="submit">ENCURTAR!</button>
            </form>

            <div className="LinkContainer">
                <p className="Title">Link Encurtado:</p> <p className="MoveUpDown"><a href={shortenedLink}>{shortenedLink}</a></p>
            </div>
        </div>
    )
}
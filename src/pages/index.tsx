import React, { useState } from "react"

export default function Home() {
    const [originalLink, setOriginalLink] = useState("")
    const [shortenedLink, setShortenedLink] = useState("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const rawResponse = await fetch("/api/create-link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": process.env.API_KEY as string
                },
                body: JSON.stringify({
                    link: originalLink as string
                }),
            })
            const response = await rawResponse.json()
            console.log(response.data)

            setShortenedLink(response.data.shortUrl)
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
                <button type="submit">ENCURTAR!</button>
            </form>

            <div className="LinkContainer">
                <p className="Title">Link Encurtado:</p> <p className="MoveUpDown"><a href={shortenedLink}>{shortenedLink}</a></p>
            </div>
        </div>
    )
}
import { useNavigate } from "react-router-dom"
import Arrow from "../assets/arrow.png"
import Send from "../assets/send.png"
import { useState, useRef, useEffect } from "react"


function Chat() {
    const messages = [
        {
            id: 1,
            side: "left",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 2,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 3,
            side: "left",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 4,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 5,
            side: "left",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 6,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 7,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 8,
            side: "left",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 9,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 10,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 11,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 12,
            side: "left",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 13,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 14,
            side: "left",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
    ];


    const [text, setText] = useState("")

    const [dataRender, setDataRender] = useState(messages)

    function handleSend() {
        const dumy = {
            id: dataRender.length + 1,
            side: "right",
            text: text
        }

        setDataRender([...dataRender, dumy])
        setText("")
    }



    const chatBodyRef = useRef(null)
    useEffect(() => {
        const chat = chatBodyRef.current;

        if (chat) {
            chat.scrollTop = chat.scrollHeight;
        }
    }, [messages, dataRender])


    const navigate = useNavigate()
    function back() {
        navigate("/")
    }




    return (
        <div className="chat-container">
            <header className="chat-header">
                <img className="icon" src={Arrow} alt="" onClick={back} />

                <div className="chat-profile">
                    <div className="chat-avatar"></div>
                    <h2 className="chat-name">B - Mart</h2>
                </div>
            </header>
            <main className="chat-body" ref={chatBodyRef}>
                {(dataRender.length > 0 ? dataRender : messages).map((msg) => (
                    <div
                        key={msg.id}
                        className={`chat-bubble ${msg.side === "left" ? "left" : "right"}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </main>
            <footer className="chat-footer">
                <button className="chat-add">＋</button>

                <input
                    type="text"
                    placeholder="Tulis Pesan..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSend();
                        }
                    }}
                    className="chat-input"
                />

                <button className="chat-send" onClick={handleSend}>
                    <img src={Send} alt="" />
                </button>
            </footer>

        </div>
    );
}

export default Chat
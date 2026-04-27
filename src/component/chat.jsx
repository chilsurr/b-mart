import { useNavigate } from "react-router-dom"
import Arrow from "../assets/arrow.png"

function Chat() {
    const navigate = useNavigate()
    function back() {
        navigate("/")
    }
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
    ];

    return (
        <div className="container">

            {/* Header */}
            <header className="chat-header">
                <button className="chat-back">←</button>

                <div className="chat-profile">
                    <div className="chat-avatar"></div>
                    <h2 className="chat-name">B - Mart</h2>
                </div>
            </header>

            {/* Body */}
            <main className="chat-body">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`chat-bubble ${msg.side === "left" ? "left" : "right"}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </main>

            {/* Footer */}
            <footer className="chat-footer">
                <button className="chat-add">＋</button>

                <input
                    type="text"
                    placeholder="Tulis Pesan..."
                    className="chat-input"
                />
            </footer>

        </div>
    );
}

export default Chat
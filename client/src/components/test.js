import express from "express";
import http from "http";  // Server ishingiye kuri HTTP
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.db_url, {}).then(() => {
    console.log("✅ Database connected");
}).catch((error) => {
    console.log("❌ Database error:", error.message);
});

// **Twongeramo server ya HTTP kugira ngo itware WebSocket**
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:3000", credentials: true }
});

// **Kubika abakoresha bari online**
const onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("🔵 Umukoresha yinjiye:", socket.id);

    socket.on("user-online", (userId) => {
        onlineUsers.set(userId, socket.id);
        io.emit("update-user-status", { userId, status: "online" });
    });

    socket.on("disconnect", () => {
        let disconnectedUser = null;
        for (let [key, value] of onlineUsers) {
            if (value === socket.id) {
                disconnectedUser = key;
                onlineUsers.delete(key);
                break;
            }
        }
        if (disconnectedUser) {
            io.emit("update-user-status", { userId: disconnectedUser, status: "offline" });
        }
        console.log("🔴 Umukoresha avuye kuri chat");
    });
});

server.listen(1001, () => {
    console.log("🚀 Server running on port 1001");
});











import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:1001");

function Messagecontent() {
    const [userStatus, setUserStatus] = useState("offline");
    const { authuser } = userauthstore();
    const { selecteduser } = userchartstore();

    // **Kwemeza ko umukoresha ari online**
    useEffect(() => {
        socket.emit("user-online", authuser._id);

        socket.on("update-user-status", ({ userId, status }) => {
            if (userId === selecteduser._id) {
                setUserStatus(status);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [selecteduser._id]);

    return (
        <div className="message-content-conatiner">
            <div className="message-content-header">
                <img src={selecteduser.profilepic || avatar} alt="" />
                <div className="message-header-detail">
                    <span>{selecteduser.fullname}</span>
                    <small>{userStatus}</small>
                </div>
            </div>
        </div>
    );
}

export default Messagecontent;
 



// .online-status {
//     color: green;
//     font-weight: bold;
// }

// .offline-status {
//     color: gray;
//     font-weight: bold;
// }

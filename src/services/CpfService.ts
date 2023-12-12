import * as net from "net";

const serverHost = '127.0.0.1';
const serverPort = 3001;

export const confirmCpf = async (cpf: String): Promise<Boolean> => {
    return new Promise((resolve, reject) => {
        const socket = new net.Socket();
        socket.setEncoding("utf8")

        try {
            socket.connect(serverPort, serverHost, () => {
                socket.write(cpf.toString());
                socket.end();
            })

            socket.on('data', (data) => {
                socket.end();
                resolve((data.toString().trim() == "true"));
            });
        } catch (e) {
            console.error(e);
        }
    })
}
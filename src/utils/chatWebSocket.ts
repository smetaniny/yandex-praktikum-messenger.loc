import { Dictionary } from '../core/block';

type WebSocketParams = {
  userId: number;
  chatId: number;
  token: string;
};

const API_URL = 'wss://ya-praktikum.tech/ws/';

export function createChatWebSocket(
  params: WebSocketParams,
  onMessageFunc?: (data: Dictionary) => void
) {
  const { userId, chatId, token } = params;
  const socket = new WebSocket(`${API_URL}chats/${userId}/${chatId}/${token}`);

  socket.addEventListener('open', () => {
    console.log('Соединение по WebSocket установлено');
  });

  socket.addEventListener('close', (event) => {
    const { wasClean, code } = event;
    let { reason } = event;

    console.log(
      wasClean
        ? 'Соединение по WebSocket закрыто'
        : 'Соединение по WebSocket прервано'
    );

    if (code === 1006) {
      reason = 'Соединение закрыто из-за отсутствия активности в WebSocket';
    }

    console.log(`Код: ${code} | Причина: ${reason}`);
  });

  socket.addEventListener('message', (event) => {
    const { data } = event;

    if (onMessageFunc && data) {
      onMessageFunc(JSON.parse(data));
    }
  });

  socket.addEventListener('error', (event: any) => {
    console.log('Ошибка', event.message);
  });

  return socket;
}

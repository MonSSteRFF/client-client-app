import Peer, { DataConnection } from 'peerjs';
import create from 'zustand';

const peerOptions = {
  host: '26.73.48.182',
  port: 9000,
  path: '/',
};

interface mutableState {
  count: number;
}

interface DataInterface {
  clientId: string;
  state: mutableState;
}

interface serverState {
  username: string;
  client: {
    server: DataConnection | undefined;
    connectToServer: (client: string, servername: string) => void;
  };
  server: {
    users: DataConnection[];
    createServer: (client: string, servername: string) => void;
  };
  state: mutableState;
  changeState: (newState: mutableState) => void;
}

const useServerState = create<serverState>((set, get) => ({
  username: '',
  client: {
    server: undefined,
    connectToServer: (client, servername) => {
      set({ username: client });
      const newPeer = new Peer(client, peerOptions);

      const connect = newPeer.connect(servername);
      connect.on('open', () => {
        connect.send({ clientId: client });
      });

      newPeer.on('connection', function (connect) {
        connect.on('data', (data) => {
          const Data: DataInterface = data as DataInterface;

          if (Data.state !== undefined) {
            set({ state: Data.state });
          }
        });

        set((state) => ({ client: { ...state.client, server: connect } }));
      });

      setTimeout(() => {
        if (get().client.server === undefined) {
          alert('название сервера неверное или username уже занят');
        }
      }, 1000);
    },
  },
  server: {
    users: [],
    createServer: (client, servername) => {
      set({ username: client });

      const newPeer = new Peer(servername, peerOptions);

      newPeer.on('connection', function (connect) {
        connect.on('data', (data) => {
          const Data: DataInterface = data as DataInterface;
          if (Data.clientId !== undefined) {
            const conn = newPeer.connect(Data.clientId);

            set((state) => ({
              server: { ...state.server, users: [...state.server.users, conn] },
            }));

            conn.on('open', () => {
              conn.send({ clientId: Data.clientId });
            });
            conn.on('data', (data) => {
              const Data: DataInterface = data as DataInterface;

              if (Data.state !== undefined) {
                get().changeState(Data.state);
              }
            });
          }
        });
      });
    },
  },
  state: {
    count: 0,
  },
  changeState: (newState) =>
    set((state) => {
      if (newState !== state.state) {
        const serverState = { state: { ...state.state, ...newState } };

        const client = get().client.server;
        if (client !== undefined) {
          client.send(serverState);
        }
        const users = get().server.users;
        if (users.length !== 0) {
          users.forEach((user) => {
            user.send(serverState);
          });
        }
        return serverState;
      }
      return state;
    }),
}));

export default useServerState;

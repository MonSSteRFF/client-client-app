import React, { useEffect, useState } from 'react';

import useServerState from '../server/useServerState';

const Client = () => {
  const [client, setClient] = useState<string>('');
  const [servername, setServername] = useState<string>('');

  const connectToServer = useServerState((state) => state.client.connectToServer);
  const server = useServerState((state) => state.client.server);

  const submitServerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    connectToServer(client, servername);
  };

  const count = useServerState((state) => state.state.count);
  const changeState = useServerState((state) => state.changeState);

  const changeCounter = (n: number) => {
    const newCount = count + n;
    changeState({ count: newCount });
  };

  return (
    <>
      <form>
        <h1>клиент</h1>

        <input
          type="text"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder={'Имя пользователя'}
        />

        <input
          type="text"
          value={servername}
          onChange={(e) => setServername(e.target.value)}
          placeholder={'Название сервера'}
        />

        <button onClick={(e) => submitServerHandler(e)}>подключится</button>
      </form>
      {server !== undefined ? (
        <div>
          <p>count: {count}</p>
          <button onClick={() => changeCounter(1)}>increment</button>
          <button onClick={() => changeCounter(-1)}>decrement</button>
        </div>
      ) : null}
    </>
  );
};

export default Client;

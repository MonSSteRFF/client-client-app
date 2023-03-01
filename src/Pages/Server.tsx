import React, { useState } from 'react';

import useServerState from '../server/useServerState';

const Server = () => {
  const [username, setUsername] = useState<string>('');
  const [servername, setServername] = useState<string>('');

  const users = useServerState((state) => state.server.users);
  const createServer = useServerState((state) => state.server.createServer);

  const submitServerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createServer(username, servername);
  };

  const count = useServerState((state) => state.state.count);
  const changeState = useServerState((state) => state.changeState);

  const changeCounter = (n: number) => {
    changeState({ count: count + n });
  };

  return (
    <>
      <form>
        <h1>сервер</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={'Имя пользователя'}
        />

        <input
          type="text"
          value={servername}
          onChange={(e) => setServername(e.target.value)}
          placeholder={'Название сервера'}
        />

        <button onClick={(e) => submitServerHandler(e)}>создать</button>
      </form>

      {users.length > 0 ? (
        <div>
          <p>count: {count}</p>
          <button onClick={() => changeCounter(1)}>increment</button>
          <button onClick={() => changeCounter(-1)}>decrement</button>
        </div>
      ) : null}
    </>
  );
};

export default Server;

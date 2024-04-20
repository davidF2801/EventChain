import React, { useState } from 'react';

const Auth = () => {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Clave pública:', publicKey);
    console.log('Clave privada:', privateKey);
  };

  return (
    <div>
      <h1>Autenticación</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="publicKey">Account:</label>
          <input
            type="text"
            id="publicKey"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="privateKey">private privada:</label>
          <input
            type="text"
            id="privateKey"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Auth;

import React from 'react';

export const ApiLocation = async () => {
    const header = new Headers({'Accept': 'application/json'}),
          response = await fetch('http://ipinfo.io/json', header);
    return await response.json();
};
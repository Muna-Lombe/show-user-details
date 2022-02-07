// Call the Random User Generator API from this file.

import React from 'react';



async function getUsers(url){
    let res;
    try {
        const response = await fetch(url);
        res = await response.json();
    } catch (error) {
        res = error
    }
    return res;
    
}

// export function retrieveUserInfo();
export {getUsers} ;





// {users[0].gender 
//     ? 
//       users.map((user, idx) => <RenderInfo user={user} uuId={idx} key={idx}/>) 
//     : <p>No users set, <span onClick={getUsers} style={{cursor: 'pointer'}}> reload? </span> </p>
//   }
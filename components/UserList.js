// // components/UserList.js
// import UserItem from './UserItem';

// const UserList = ({ users, onDelete }) => {
//   if (users.length === 0) {
//     return <p>No match found.</p>;
//   }

//   return (
//     <ul className='user-list'>
//       {users.map((user) => (
//         <UserItem key={user.id} user={user} onDelete={onDelete} />
//       ))}
//     </ul>
//   );
// };

// export default UserList;

// components/UserList.js
import UserItem from './UserItem';

const UserList = ({ users, onDelete }) => {
    console.log('Users:', users);

  if (users.length === 0) {
    return <div>No match found.</div>;
  }

//   if (users === null) {
//     return <p>Loading...</p>; // Or some other placeholder that matches the server render
//   }

  return (
    <ul className='user-list'>
      {users.length === 0 ? (
        <li>No match found.</li>
      ) : (
        users.map((user) => (
          <UserItem key={user.id} user={user} onDelete={onDelete} />
        ))
      )}
    </ul>
  );
};

export default UserList;
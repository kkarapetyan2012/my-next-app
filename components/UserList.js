// components/UserList.js
import UserItem from './UserItem';

const UserList = ({ users, onDelete }) => {
  if (users.length === 0) {
    return <p>No match found.</p>;
  }

  return (
    <ul className='user-list'>
      {users.map((user) => (
        <UserItem key={user.id} user={user} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default UserList;
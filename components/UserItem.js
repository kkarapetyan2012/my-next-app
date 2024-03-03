// components/UserItem.js
import Link from 'next/link';

const UserItem = ({ user, onDelete }) => {
  return (
    <li>
      {user.name} {user.lastName} - {user.email} - {user.phone} - {user.address}{' '}
      <button onClick={() => onDelete(user.id)}>Delete</button>{' '}
      <Link href={`/users/${user.id}`}>
        Edit
      </Link>
    </li>
  );
};

export default UserItem;

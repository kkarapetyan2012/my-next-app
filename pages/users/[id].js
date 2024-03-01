// pages/users/[id].js
import { useRouter } from 'next/router';
import UserForm from '../../components/UserForm';
import { useSelector } from 'react-redux';

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector((state) =>
    state.users.users.find(user => user.id === id)
  );

  return (
    <div>
      <h1>Edit User</h1>
      {user ? <UserForm existingUser={user} /> : <p>User not found.</p>}
    </div>
  );
}

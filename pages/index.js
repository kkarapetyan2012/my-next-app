// // pages/index.js
// import { useSelector, useDispatch } from 'react-redux';
// import { deleteUser } from '../store/usersSlice';
// import UserForm from '../components/UserForm';
// import Link from 'next/link';

// export default function Home() {
//   const users = useSelector((state) => state.users.users);
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <UserForm />
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>
//             {user.name} {user.lastName} - {user.email}
//             <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
//             <Link href={`/users/${user.id}`}>
//               Edit
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// pages/index.js
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from '../store/usersSlice';
import UserForm from '../components/UserForm';
import Link from 'next/link';

export default function Home({ initialUsers }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  // const { users, isLoading } = useSelector((state) => state.users.users);
  const users = useSelector((state) => state.users.users);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return users;

    // Convert search query to lowercase for case-insensitive comparison
    const lowercasedQuery = searchQuery.toLowerCase();

    // Filter items that match the query in any field
    return users.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [users, searchQuery]);

  // Hydrate the store with the initial server-side fetched users
  // useEffect(() => {
  //   if (initialUsers.length > 0) {
  //     initialUsers.forEach(user => {
  //       dispatch(addUser(user));
  //     });
  //   }
  // }, [dispatch, initialUsers]);

  useEffect(() => {
    if (initialUsers.length > 0) {
      initialUsers.forEach(user => {
        dispatch(addUser(user));
      });
    }
  }, []);

  return (
    <div>
      <UserForm />
      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {!searchQuery ? filteredItems.map(user => (
          <li key={user.id}>
            {user.name} {user.lastName} - {user.email} - {user.phone} - {user.address}
            <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
            <Link href={`/users/${user.id}`}>
              Edit
            </Link>
          </li>
        )): <li>not match</li>}
      </ul>
    </div>
  );
}

// This function runs on the server for each request
export async function getServerSideProps(context) {
  // Fetch data from an API or other data source

  const initialUsers = [];
  
  // Return the initialUsers as props
  return {
    props: { initialUsers }, // will be passed to the page component as props
  };
}
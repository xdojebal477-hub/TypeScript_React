type UserProfileProps = {
   userData: {
    username: string;
    email: string;
    avatar: string;
    role: 'admin' | 'user';
  };
};

const UserProfile = ({ userData }: UserProfileProps) => {
  const { username, email, avatar, role } = userData;

  return (
    <div className="profile-card">
      <img src={avatar} alt={username} className="avatar" />

      <h2 style={{ margin: '10px 0', fontSize: '1.2rem' }}>
        {username}
        {role === 'admin' && <span className="badge-admin">Admin</span>}
      </h2>

      <p style={{ color: '#95a5a6' }}>{email}</p>
    </div>
  );
};

export default UserProfile;
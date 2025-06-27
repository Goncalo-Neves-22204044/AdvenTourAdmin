function LogoutButton() {
  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed top-4 right-4 bg-red-600 text-black px-4 py-2 rounded shadow hover:bg-red-700 z-50"
    >
      Logout
    </button>
  );
}

export default LogoutButton;

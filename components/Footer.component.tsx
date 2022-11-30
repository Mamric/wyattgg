export const Footer = () => {
  return (
    <footer className="text-left text-gray-300 flex justify-center mb-4 mt-5 select-none">
      <div className="bg-gray-800 w-11/12 border-2 border-gray-800 rounded-lg p-3 shadow-md">
        &copy; {new Date().getFullYear()} Copyright
      </div>
    </footer>
  );
};

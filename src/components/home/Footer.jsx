const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div>
          <h3 className="font-bold text-lg">EzBook</h3>
          <p className="text-gray-400 text-sm mt-1">Making booking seamless for everyone.</p>
        </div>
        <div>
          <p>Contact: support@ezbook.com</p>
          <p>Phone: +233 123 456 789</p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} EzBook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

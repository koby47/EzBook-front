import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">EzBook</h3>
          <p className="text-gray-400 text-sm">
            Making booking seamless for everyone , from users to facility managers.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-2 text-lg">Contact Us</h4>
          <ul className="text-sm space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@ezbook.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +233 54 508 9202
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-2 text-lg">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-blue-500 transition">
              <Facebook />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <Twitter />
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              <Linkedin />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <Instagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} EzBook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="mt-2 text-sm text-gray-500">
              © {currentYear} Latte Security. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Privacy
            </Link>
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Terms
            </Link>
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-icons-round text-3xl text-[#93C572]">
                eco
              </span>
              <span className="font-display font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
                Cold<span className="text-[#93C572]">Fresh</span>
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Bringing you the healthiest and tastiest snacks from around the
              globe. Snack without guilt.
            </p>
            <div className="flex space-x-4">
              <a
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                href="#"
              >
                <span className="material-icons-round">facebook</span>
              </a>
              <a
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                href="#"
              >
                <span className="material-icons-round">camera_alt</span>
              </a>
              <a
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                href="#"
              >
                <span className="material-icons-round">alternate_email</span>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-6">
              Shop
            </h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm">
              <li>
                <Link
                  className="hover:text-[#93C572] transition-colors"
                  href="/products"
                >
                  All Snacks
                </Link>
              </li>
              <li>
                <a className="hover:text-[#93C572] transition-colors" href="#">
                  Chocolates
                </a>
              </li>
              <li>
                <a className="hover:text-[#93C572] transition-colors" href="#">
                  Chips &amp; Crackers
                </a>
              </li>
              <li>
                <a className="hover:text-[#93C572] transition-colors" href="#">
                  Nuts &amp; Seeds
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-6">
              Company
            </h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm">
              <li>
                <a className="hover:text-[#93C572] transition-colors" href="#">
                  Our Story
                </a>
              </li>
              <li>
                <a className="hover:text-[#93C572] transition-colors" href="#">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="hover:text-[#93C572] transition-colors" href="#">
                  Sustainability
                </a>
              </li>
              <li>
                <a className="hover:text-[#93C572] transition-colors" href="#">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-6">
              Newsletter
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Get 10% off your first order!
            </p>
            <div className="flex flex-col gap-3">
              <input
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#93C572] text-sm dark:text-white"
                placeholder="Your email address"
                type="email"
              />
              <button className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} ColdFresh Inc. All rights
            reserved.
          </p>
          <div className="flex space-x-6 text-gray-400 text-xs">
            <a
              className="hover:text-gray-900 dark:hover:text-white"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="hover:text-gray-900 dark:hover:text-white"
              href="#"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

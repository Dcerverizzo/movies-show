import Link from 'next/link';
import { useRouter } from 'next/router';

function Menu() {
  const router = useRouter();
  const menuItems = [
    // { url: '/', label: 'Home' },
    { url: '/movies', label: 'Movies' },
    { url: '/tv-show', label: 'TV Shows' },
    // { url: '/actors', label: 'Actors' },
    // { url: '/directors', label: 'Directors' },
    // { url: '/genres', label: 'Genres' },
    // { url: '/top-movies', label: 'Top Movies' },
  ];

  return (
    <div className="">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Movie Films</span>
          </a>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {menuItems.map((menuItem) => (
              <li key={menuItem.url}>
                <Link href={menuItem.url}
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${router.pathname === menuItem.url ? 'text-blue-700' : ''}`}
                  aria-current={router.pathname === menuItem.url ? 'page' : undefined}
                >
                  {menuItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Menu;

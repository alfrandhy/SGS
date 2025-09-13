import React from 'react';
import { Link } from '@inertiajs/react';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index === items.length - 1 ? (
                            <span className="text-gray-500 text-sm font-medium">
                                {item.label}
                            </span>
                        ) : (
                            <div className="flex items-center">
                                {index > 0 && (
                                    <svg
                                        className="w-3 h-3 text-gray-400 mx-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                )}
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600"
                                >
                                    {item.label}
                                </Link>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;

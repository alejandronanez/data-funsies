import React from 'react';

interface Props {
  datasetsSize: number;
}

export function PromotionalBanner({ datasetsSize }: Props) {
  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">
            Amazon&apos;s Top selling books from 2009 to 2019
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-100 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Understand what book to buy.
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-300">
            We&apos;ve analized over 500 books, so you don&apos;t have to!
          </p>
        </div>
      </div>
    </div>
  );
}

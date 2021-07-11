import React from 'react';

interface Props {
  datasetsSize: number;
}

export function PromotionalBanner({ datasetsSize }: Props) {
  return (
    <div className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Amazon Best Selling Books from the last decade
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            The definitive analysis
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We have analyzed a dataset of {datasetsSize} best selling books for
            you, so you don&#39;t have to!
          </p>
        </div>
      </div>
    </div>
  );
}

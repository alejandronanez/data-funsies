import { ReactNode } from 'react';

export function Text({ children }: { children: ReactNode }) {
  return (
    <p className="text-gray-600 font-normal tracking-tight text-lg my-2">
      {children}
    </p>
  );
}

export function Highlight({
  children,
  isLink,
}: {
  children: ReactNode;
  isLink?: boolean;
}) {
  return (
    <span
      className={`font-bold text-xl ${
        isLink
          ? 'underline text-indigo-600 cursor-pointer hover:text-indigo-500'
          : 'text-gray-700'
      }`}
    >
      {children}
    </span>
  );
}

function Subtitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-gray-800 tracking-tight font-bold text-3xl">
      {children}
    </h2>
  );
}

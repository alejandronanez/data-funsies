import { ReactNode } from 'react';

export function Text({ children }: { children: ReactNode }) {
  return (
    <p className="text-gray-600 font-normal tracking-tight text-normal my-4">
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
      className={`font-bold text-normal ${
        isLink
          ? 'underline text-indigo-600 cursor-pointer hover:text-indigo-500'
          : 'text-gray-700'
      }`}
    >
      {children}
    </span>
  );
}

"use client";

interface AccountAdminToggleProps {
  name?: string | null;
  email?: string | null;
}

export const AccountAdminToggle = ({ name, email }: AccountAdminToggleProps) => {
  return (
    <>
      <div className="flex items-center p-2 text-gray-900 rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <span className="text-sm font-bold block">
          {name || "Usuario"}
        </span>
      </div>
      <div className="flex items-center p-2 text-gray-900 rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <span className="text-xs block py-1">
          {email || ""}
        </span>
      </div>
    </>
  );
}
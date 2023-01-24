import type { FC } from "react";
import { NavLink } from "src/component/Button";

const items = [
  { href: "/", label: "記事一覧" },
  { href: "/about", label: "About" },
];

/**
 * @package
 */
export const Header: FC = () => {
  return (
    <div>
      <h1 className="p-4 text-3xl font-bold">ITブログ</h1>
      <nav>
        {items.map(({ href, label }) => {
          return (
            <NavLink key={href} href={href} activeClassName="text-blue-500">
              <a className="inline-block p-4">{label}</a>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

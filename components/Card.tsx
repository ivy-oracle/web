import Link from "next/link";
import Button, { buttonClassNames } from "./Button";

const Card = ({
  title,
  children,
  actionLabel,
  actionType,
  href,
}: {
  title: string;
  children: React.ReactNode;
  actionLabel: string;
  actionType: "button" | "link";
  href?: string;
}) => (
  <div className="flex justify-center">
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
        {title}
      </h5>
      <div className="text-gray-700 text-base mb-4">{children}</div>
      {actionType === "button" ? (
        <Button>{actionLabel}</Button>
      ) : (
        <span className={buttonClassNames}>
          <Link href={href as string}>{actionLabel}</Link>
        </span>
      )}
    </div>
  </div>
);

export default Card;

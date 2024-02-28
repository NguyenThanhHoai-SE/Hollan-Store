interface modelParse {
  id: number;
  name: string;
  isSold: boolean;
}

interface Props {
  title: string;
  list: modelParse[];
  value: string;
  setValue: (value: string) => void;
}
export default function SizeAndColor(props: Props) {
  const { title, list, value, setValue } = props;
  const classSold =
    "ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700";
  const classUnSold =
    "ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600";
  return (
    <dl className="mb-8">
      <dt className="mb-4 text-sm uppercase tracking-wide">{title}</dt>
      <dd className="flex flex-wrap gap-3">
        {list.map((e) => (
          <button
            key={e.id}
            onClick={() => setValue(e.name)}
            className={`flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900 ${
              value.trim() === e.name.trim()
                ? "cursor-default ring-2 ring-blue-600"
                : `ring-1 ${!e.isSold && classUnSold}`
            } capitalize ${e.isSold && classSold}`}
          >
            {e.name}
          </button>
        ))}
      </dd>
    </dl>
  );
}

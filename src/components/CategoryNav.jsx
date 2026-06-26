const CategoryNav = ({ activeSection, sections }) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4">
      {sections.map((sec) => (
        <button
          key={sec.id}
          onClick={() => {
            const el = document.getElementById(sec.id);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="group relative flex items-center justify-end gap-3 cursor-pointer outline-none bg-transparent border-0"
          aria-label={`Scroll to ${sec.label}`}
        >
          <span
            className={`text-xs font-medium tracking-wide transition-all duration-150 ${
              activeSection === sec.id
                ? "text-lime opacity-100 translate-x-0"
                : "text-text-subtle opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
            }`}
          >
            {sec.label}
          </span>
          <span
            className={`block rounded-full transition-all duration-150 ${
              activeSection === sec.id
                ? "h-3 w-3 bg-lime shadow-lg shadow-lime/30"
                : "h-2 w-2 bg-text-subtle/40 group-hover:bg-text-subtle"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default CategoryNav;

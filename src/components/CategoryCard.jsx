
function CategoryCard({
    title,
    description,
    icon,
    gradient
}) {
    return (
        <button className="group relative overflow-hidden rounded-3xl bg-white p-6 text-left shadow-sm ring-1 ring-slate-200 transition duration-500 hover:-translate-y-2 hover:shadow-2xl">

            <div
                className={`mb-12 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-2xl font-bold text-white shadow-lg`}
            >
                {icon}
            </div>

            <h3 className="text-xl font-bold text-slate-900">
                {title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
                {description}
            </p>

            <div className="mt-5 text-sm font-semibold text-violet-600 transition group-hover:translate-x-1">
                Explore →
            </div>

            <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-violet-100 transition duration-500 group-hover:scale-150" />

        </button>
    );
}

export default CategoryCard;




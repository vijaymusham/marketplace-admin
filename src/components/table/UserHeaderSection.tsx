export default function UserHeaderSection({ title }: { title: string }) {
    return (
        <div className="relative h-[150px] bg-primary md:h-[220px] lg:h-[280px]">
            <h2 className="absolute right-0 bottom-5 left-0 text-center text-3xl font-semibold tracking-wide text-white capitalize md:bottom-8 md:text-4xl lg:bottom-10 lg:text-5xl">
                {title}
            </h2>
        </div>
    );
}

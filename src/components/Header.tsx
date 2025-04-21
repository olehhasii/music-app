import Search from './Actions/Search';

export default function Header() {
  return (
    <header className="glass flex items-center justify-center rounded-lg px-4 py-2 max-md:px-2 max-md:py-1">
      <h1 data-testid="tracks-header" className="text-center text-3xl font-bold max-md:text-xl">
        LoFiStation.fm
      </h1>
      <div className="ml-auto">
        <Search />
      </div>
    </header>
  );
}

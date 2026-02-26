import BottomBar from "./home_comp/bottomBar/bottomBar";
import HeaderBar from "./home_comp/headerBar/headerBar";

export default function HomePage() {
  return (
    <>
      <div className="grid grid-col-6">
        <HeaderBar />
        <div>
          <p>Home page</p>
        </div>
        <BottomBar />
      </div>
    </>
  );
}

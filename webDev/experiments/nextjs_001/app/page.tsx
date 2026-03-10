import Image from "next/image";
import MainHomePage from "./mainHomepage";
import LoginPageExample from "./LoginPageExample";

export default function Home() {
  return (
    <div>
      <LoginPageExample>
        <MainHomePage>
          <div>
            <h1>THIS IS THE HOME PAGE</h1>
          </div>
        </MainHomePage>
        <div></div>
      </LoginPageExample>
    </div>
  );
}

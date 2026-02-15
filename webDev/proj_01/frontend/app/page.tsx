// app/page.tsx
import { Heart, PanelsTopLeft } from 'lucide-react';
import { HeartIcon } from '@heroicons/react/24/solid';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import { IconHeart } from 'tabler-icons-react';
import { FaHeart } from 'react-icons/fa';
import DashboardDisplayExample, { ButtonComponent1 } from './components/examples/clientComponentExamples';
import ForwardRefExamples from './components/examples/HooksAndExamples/forwardRef';
import UseEffectExamples from './components/examples/HooksAndExamples/useEffect';
import UseIdExamples from './components/examples/HooksAndExamples/useId';
import UseCallbackExamples from './components/examples/HooksAndExamples/useCallback';
import ReactMemoExamples from './components/examples/HooksAndExamples/reactMemo';
import UseMemoExamples from './components/examples/HooksAndExamples/useMemo';
import UseActionStateExamples from './components/examples/HooksAndExamples/useActionState';
import UseInsertionEffectExamples from './components/examples/HooksAndExamples/useInsertionEffect';
import UseOptimisticExamples from './components/examples/HooksAndExamples/useOptimistic';
import UserDataChangingComponent from './components/examples/UserDataChanging/userDataChanging';
import DataChangingComponent from './components/examples/UserDataChanging/dataChanging';
import getData from './components/serverComponentExample/serverComponent1';
import ClientComponent1 from './components/clientComponentExample/clientComponent1';
import sendData from './components/serverComponentExample/serverComponent2';
import ClientComponent2 from './components/clientComponentExample/clientComponent2';


/**
 * ================= ICON LIBRARIES CHEAT SHEET =================
 * 
 * 1️⃣ Lucide React
 *    - Official preview & search: https://lucide.dev/
 *    - React Icons version: https://www.react-icons.com/icons/lu
 *    - Package: "lucide-react"
 *    - Example usage:
 *        import { Heart, Home } from "lucide-react";
 * 
 * 2️⃣ Heroicons
 *    - Official website: https://heroicons.com/
 *    - React package: "@heroicons/react"
 *    - Solid / Outline icons available
 *    - Example usage:
 *        import { HeartIcon } from "@heroicons/react/24/solid";
 *        import { HeartIcon } from "@heroicons/react/24/outline";
 * 
 * 3️⃣ Font Awesome
 *    - Official icons page: https://fontawesome.com/icons
 *    - React package: "@fortawesome/react-fontawesome"
 *    - Free icons: solid / regular / brands
 *    - Example usage:
 *        import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 *        import { faHeart } from "@fortawesome/free-solid-svg-icons";
 * 
 * 4️⃣ Tabler Icons
 *    - Official website: https://tablericons.com/
 *    - React package: "tabler-icons-react"
 *    - Example usage:
 *        import { IconHeart } from "tabler-icons-react";
 * 
 * 5️⃣ React Icons (multi-library wrapper)
 *    - Official browse & docs: https://react-icons.github.io/react-icons/
 *    - Includes: Font Awesome, Material Design, Ant Design, BoxIcons, Bootstrap Icons, Remix Icons, and more
 *    - Example usage:
 *        import { FaHeart } from "react-icons/fa";
 *        import { MdFavorite } from "react-icons/md";
 * 
 * ==============================================================
 * Notes:
 * - You can import icons individually to keep bundle size small.
 * - Use the official sites to preview icons, get exact names, and copy JSX usage.
 * - For Lucide, Heroicons, Tabler: copy names in PascalCase (Heart, Home, Trash)
 * - For React Icons wrapper: each library prefix differs (Fa = FontAwesome, Md = Material, Ai = AntDesign, etc.)
 */

async function DataServerSample() {
  const data = await getData();

  return (
    <p style={{color: "red"}}>
      {data.message}
    </p>
  );
};

async function DataServerSample2 () {
    const data = await getData();
    const res = await fetch("http://localhost:3000/api/hello");
    const jsonRes = await res.json();
    return (
      <>
        <ClientComponent1 title={`${data.message} ${jsonRes.message}`} />
      </>
    );
}

async function DataServerSample3 () {
  const data = await sendData();

  return (
    <>
      <ClientComponent2 status={data.status} message={data.message} />
    </>
  )
}

export default function Home() {
  const button: ButtonComponent1 = {
    text: "Click this shit",
    classNames: undefined,
    onClick: undefined
  };

  return (
    <div>
      {/* <h2>Welcome to the Home Page!</h2> */}
      {/* <p>This is your first Next.js page.</p> */}

      {/* <h3>Icon Examples:</h3> */}
      {/* <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}> */}
      {/* <Heart size={24} color="red" />
        <HeartIcon className="h-6 w-6 text-red-500" />
        <FontAwesomeIcon icon={faHeart} size="lg" color="red" />
        {/* <IconHeart size={24} color="red" /> */}
      {/* <FaHeart size={24} color="red" /> */}
      {/* </div> */}
      {/* <PanelsTopLeft /> */}

      {/* <DashboardDisplayExample title='List of Users' classStyle='text-center p-3  text-white border-2' button={button} /> */}

      {/* <ForwardRefExamples /> */}
      {/* <UseEffectExamples /> */}
      {/* <UseIdExamples /> */}
      {/* <UseCallbackExamples /> */}
      {/* <ReactMemoExamples /> */}
      {/* <UseMemoExamples /> */}
      {/* <UseActionStateExamples /> */}
      {/* <UseInsertionEffectExamples /> */}
      {/* <UseOptimisticExamples /> */}
      {/* <UserDataChangingComponent /> */}
      {/* <DataChangingComponent /> */}
      {/* <DataServerSample /> */}
      <DataServerSample2 />
      <DataServerSample3 />
    </div>
  );
}

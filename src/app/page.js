"use client";

import { useState } from "react";
import DashboardLayout from "./dashboard/layout";

import LoginPage from "@/components/login/mtlLoging";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (

    // todo with login page ============>>
//     <>
//       {!isLoggedIn ? (
//         <LoginPage onLogin={() => setIsLoggedIn(true)} />
//       ) : (
//         <DashboardLayout>
        
//         </DashboardLayout>
//       )}
//     </>
//   );
// }


//todo         without login page =================>>

<div>
          <DashboardLayout>
        
        </DashboardLayout>

</div>
);
};
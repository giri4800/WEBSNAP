'use client';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';
import { Download, Moon, Rocket, Sun } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import { ActionContext } from '@/context/ActionContext';
import { useTheme } from 'next-themes';

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onActionBtn = (actn) => {
    setAction({
      actionType: actn,
      timeStamp: Date.now()
    })
  }

  if (!mounted) {
    return (
      <div className="p-4 flex justify-between items-center">
        <Link href={'/'}>
          <Image src={'/logo.png'} alt="logo" width={90} height={90} />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 flex justify-between items-center">
      <Link href={'/'}>
        <Image 
          src={theme === 'dark' ? '/logo-white.png' : '/logo.png'} 
          alt="logo" 
          width={90} 
          height={90} 
        />
      </Link>
      {!userDetail?.name ? (
        <div className="flex gap-5 items-center">
          <Button 
            variant="ghost" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost">Sign In</Button>
          <Button
            className="text-white"
            style={{
              backgroundColor: Colors.BLUE,
            }}
          >
            Get Started
          </Button>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          <Button 
            variant="ghost" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          {pathname.includes('/workspace/') && (
            <>
              <Button variant="ghost" onClick={() => onActionBtn('export')}>
                <Download /> Export
              </Button>
              <Button
                onClick={() => onActionBtn('deploy')}
                className="text-white"
                style={{
                  backgroundColor: Colors.BLUE,
                }}
              >
                <Rocket /> Deploy
              </Button>
            </>
          )}
          {userDetail && (
            <Image
              onClick={toggleSidebar}
              src={userDetail?.picture}
              alt="userImage"
              width={40}
              height={40}
              className="rounded-full cursor-pointer object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Header;

import React, { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { Button } from '../ui/button';
import { MessageCircleCodeIcon } from 'lucide-react';
import WorkspaceHistory from './WorkspaceHistory';
import SideBarFooter from './SideBarFooter';
import { useTheme } from 'next-themes';

function AppSideBar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Sidebar>
        <SidebarHeader className="p-5">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <Button className="mt-5"><MessageCircleCodeIcon /> Start New Chat</Button>
        </SidebarHeader>
      </Sidebar>
    );
  }
  
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
          <Image 
            src={theme === 'dark' ? '/logo-white.png' : '/logo.png'} 
            alt="logo" 
            width={50} 
            height={50} 
          />
          <Button className="mt-5"><MessageCircleCodeIcon /> Start New Chat</Button>
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SideBarFooter></SideBarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;

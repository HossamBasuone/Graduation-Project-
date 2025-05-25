import React, { ReactNode } from 'react';
import Pfooter from '../../_Components/pfooter/pfooter';
import Unavbar from '../../_Components/unavbar/page';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Unavbar />
      <div>
        <div className="min-h-lvh">
          {children}
        </div>
      </div>
      <Pfooter />
    </>
  );
}

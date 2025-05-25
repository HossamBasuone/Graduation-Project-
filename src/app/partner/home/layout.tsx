import React, { ReactNode } from 'react';
import Pnavbar from '../../_Components/pnavbar/page';
import Pfooter from '../../_Components/pfooter/pfooter';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Pnavbar />
      <div>
        <div className="min-h-lvh">
          {children}
        </div>
      </div>
      <Pfooter />
    </>
  );
}

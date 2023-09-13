import React from "react";
import AppBar from "@/app/AppBar";

export default function OauthLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppBar />
      {children}
    </>
  )
}
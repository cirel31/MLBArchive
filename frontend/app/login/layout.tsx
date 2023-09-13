import React from "react";
import AppBar from "@/app/AppBar";

export default function LoginLayout({
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
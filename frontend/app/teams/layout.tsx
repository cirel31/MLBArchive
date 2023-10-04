import React from "react";
import AppBar from "@/app/AppBar";
import LoginCheck from "@/app/loginCheck";

export default function TeamsLayout({
                                      children,
                                    }: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppBar />
      <LoginCheck />
      {children}
    </>
  )
}
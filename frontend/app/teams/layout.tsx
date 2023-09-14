import React from "react";
import AppBar from "@/app/AppBar";

export default function TeamsLayout({
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
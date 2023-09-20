import React from "react";
import AppBar from "@/app/AppBar";

export default function SearchLayout({
                                      children,
                                    }: {
  children: React.ReactNode
}) {
  return (
    <>
      {/*<AppBar />*/}
      {children}
    </>
  )
}
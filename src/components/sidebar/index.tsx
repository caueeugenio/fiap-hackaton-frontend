"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Settings, Home, PanelBottom, Package, LogOut } from "lucide-react";
import {
  TooltipProvider,
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserContext } from "@/context/userContext";

export function Sidebar() {
  const { user, resetUser } = useUserContext();

  if (!user.email) {
    return null;
  }

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 bg-orange-600 sm:flex flex-col">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Link
              href={user.role === "student" ? "/home" : "/teacher"}
              className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground rounded-full"
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={
                    user.role === "student"
                      ? "/my-quizzes"
                      : "/new-questionnaire"
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Package className="h-5 w-5  text-white" />
                  <span className="sr-only">Quiz</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Quiz</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/login"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                  onClick={resetUser}
                >
                  <LogOut className="h-5 w-5 text-white" />
                  <span className="sr-only">Sair</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14 ">
        <header
          className="sticky top-0 z-30 flex h-14 items-center px-4 bg-orange-600 
        gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
        >
          <Sheet>
            <SheetTitle />
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="sm:hidden bg-white"
              >
                <PanelBottom className="w-5 h-5" />
                <span className="sr-only">Abrir / fechar menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="sm:max-w-x bg-slate-100"
              aria-describedby="Conteúdo da navbar"
            >
              <SheetDescription />
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                   href={user.role === "student" ? "/home" : "/teacher"}
                  className="flex h-10 w-10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2"
                >
                  <Package className="h-5 w-5">
                    <span className="sr-only">Logo do projeto</span>
                  </Package>
                </Link>

                <Link
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href={user.role === "student" ? "/home" : "/teacher"}
                >
                  <Home className="h-5 w-5" />
                  Início
                </Link>
                <Link
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href={
                    user.role === "student"
                      ? "/my-quizzes"
                      : "/new-questionnaire"
                  }
                >
                  <Package className="h-5 w-5" />
                  Quizz
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <h2 className="text-white">Menu</h2>
        </header>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth-store";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, switchRole, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace("/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 md:px-6 lg:px-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Profil Saya</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-teal-100 text-teal-700 text-xl">
                {user.fullName.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.fullName}</CardTitle>
              <Badge className={user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-teal-100 text-teal-800"}>
                {user.role}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Mail className="h-4 w-4" />
            {user.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone className="h-4 w-4" />
            {user.phone}
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-slate-700">Aksi Cepat (Simulasi)</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => switchRole(user.role === "admin" ? "customer" : "admin")}
          >
            Beralih ke {user.role === "admin" ? "Pelanggan" : "Admin"}
          </Button>
          <Button variant="destructive" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-1" />
            Keluar
          </Button>
        </div>
      </div>
    </main>
  );
}

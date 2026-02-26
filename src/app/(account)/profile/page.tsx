"use client";

import { User, Mail, Phone, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth-store";

export default function ProfilePage() {
  const { user, isAuthenticated, login, logout, switchRole } = useAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <User className="h-16 w-16 mx-auto text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h1>
        <p className="text-slate-500 mb-6">Choose a mock account to sign in with:</p>
        <div className="space-y-3">
          <Button
            className="w-full bg-teal-600 hover:bg-teal-700"
            onClick={() => login("customer@example.com")}
          >
            <User className="h-4 w-4 mr-2" />
            Sign in as Customer
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => login("admin@frozenfresh.com")}
          >
            <Shield className="h-4 w-4 mr-2" />
            Sign in as Admin
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 md:px-6 lg:px-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

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
        <h2 className="text-sm font-medium text-slate-700">Quick Actions (Mock)</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => switchRole(user.role === "admin" ? "customer" : "admin")}
          >
            Switch to {user.role === "admin" ? "Customer" : "Admin"}
          </Button>
          <Button variant="destructive" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-1" />
            Sign Out
          </Button>
        </div>
      </div>
    </main>
  );
}

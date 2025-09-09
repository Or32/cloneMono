import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

interface LoginSuccessProps {
  token: string;
}

export const LoginSuccess: React.FC<LoginSuccessProps> = ({ token }) => {
  return (
    <div className="space-y-4">
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Login successful! Redirecting to dashboard...
        </AlertDescription>
      </Alert>
    </div>
  );
};
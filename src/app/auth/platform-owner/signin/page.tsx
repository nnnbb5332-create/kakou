import { LoginForm } from "@/components/login-form";

export default function PlatformOwnerLoginPage() {
  return <main className="container"><LoginForm role="SUPER_ADMIN" redirectPath="/platform" /></main>;
}

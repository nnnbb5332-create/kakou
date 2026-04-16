import { LoginForm } from "@/components/login-form";

export default function DriverLoginPage() {
  return <main className="container"><LoginForm role="DRIVER" redirectPath="/driver" /></main>;
}

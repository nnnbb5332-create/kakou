import { LoginForm } from "@/components/login-form";

export default function CashierLoginPage() {
  return <main className="container"><LoginForm role="CASHIER" redirectPath="/pos" /></main>;
}

import { LoginForm } from "@/components/login-form";

export default function RestaurantOwnerLoginPage() {
  return <main className="container"><LoginForm role="RESTAURANT_OWNER" redirectPath="/owner" /></main>;
}

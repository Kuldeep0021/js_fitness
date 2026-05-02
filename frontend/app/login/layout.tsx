import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — JS Fitness Member & Admin Portal",
  description:
    "Login to your JS Fitness Sohna member account. Track your progress, access workout plans, and manage your gym membership. Admin portal also available.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

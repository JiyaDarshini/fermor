import { Eye, Lock, KeyRound, ShieldOff } from "lucide-react";

export const securityPoints = [
  {
    icon: Eye,
    title: "Read-only connections",
    text: "Fermor can see balances and transactions. It cannot move, withdraw or invest money on its own.",
  },
  {
    icon: Lock,
    title: "Encrypted end to end",
    text: "Your data is encrypted in transit and at rest with 256-bit encryption.",
  },
  {
    icon: KeyRound,
    title: "Two-step sign-in",
    text: "Add a second check at login so a stolen password alone is not enough.",
  },
  {
    icon: ShieldOff,
    title: "We don't sell your data",
    text: "Your information is used to run your account and nothing else. Disconnect or delete it any time.",
  },
];

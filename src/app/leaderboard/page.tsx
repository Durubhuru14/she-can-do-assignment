import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupees } from "@/lib/formatRupees";
import { User } from "@/types/user";
import { getUserFromCookie } from "@/lib/getUserFromCookie";

async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/users`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function LeaderboardPage() {
  const users = await getAllUsers();
  const cookieUser = await getUserFromCookie();

  const sortedUsers = [...users].sort(
    (a, b) =>
      (b.dashboardStats?.totalDonations ?? 0) -
      (a.dashboardStats?.totalDonations ?? 0)
  );

  return (
    <section className="px-4 py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Top Fundraisers Leaderboard 🎯
      </h1>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 min-w-[2rem]">#</TableHead>
              <TableHead className="min-w-[10rem]">User</TableHead>
              <TableHead className="min-w-[14rem]">Email</TableHead>
              <TableHead className="min-w-[8rem] text-right">
                Total Donations
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user, index) => (
              <TableRow
                key={user.id}
                className={`${
                  user.username === cookieUser.username ? "bg-accent/50" : ""
                }`}
              >
                <TableCell className="min-w-[2rem]">{index + 1}</TableCell>
                <TableCell className="min-w-[10rem] flex items-center gap-2">
                  <Image
                    src={user.pfp}
                    alt="Profile"
                    unoptimized
                    height={32}
                    width={32}
                    className="rounded-full object-cover border-2 border-accent shadow"
                  />
                  <span>{user.username}</span>
                </TableCell>
                <TableCell className="min-w-[14rem] break-words">
                  {user.email}
                </TableCell>
                <TableCell className="min-w-[8rem] text-right font-medium">
                  {formatRupees(user.dashboardStats?.totalDonations ?? 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

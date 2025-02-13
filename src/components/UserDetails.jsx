import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserDetails() {
  // In a real application, you'd fetch this data from your backend
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-muted-foreground">{user.email}</p>
      </CardContent>
    </Card>
  );
}
